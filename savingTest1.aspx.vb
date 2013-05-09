Imports System.Xml
Imports System.Xml.XPath
Imports System.Diagnostics
Imports System.IO
Imports System.Configuration
Imports System.Data

Partial Class savingTest1
    Inherits System.Web.UI.Page

    Dim dt As New DataTable
    Dim dv As DataView
    Dim ds As DataSet

    Protected Sub Page_Init(sender As Object, e As System.EventArgs) Handles Me.Init
        ds = getSessionDS()

        'for debugging
        Session.Item("MyDS") = Nothing
    End Sub

    Protected Sub Page_Load(sender As Object, e As System.EventArgs) Handles Me.Load
        If IsPostBack = False Then
            ' Populate the ddl 
            ddlLoadEvents.DataSource = ds.Tables(0)
            ddlLoadEvents.DataTextField = "name"
            ddlLoadEvents.DataBind()
        End If
    End Sub

    Protected Sub ddlLoadEvents_SelectedIndexChanged(sender As Object, e As System.EventArgs) Handles ddlLoadEvents.SelectedIndexChanged
        ' Populate the created/modified labels based on selection

        'Set the index 
        Dim index As String = ddlLoadEvents.SelectedIndex

        lblCreated.Text = ds.Tables(0).Rows(index).Item(2)
        lblModified.Text = ds.Tables(0).Rows(index).Item(3)
    End Sub

    ''' <summary>
    ''' Loads the selected event 
    ''' </summary>
    ''' <param name="sender"></param>
    ''' <param name="e"></param>
    ''' <remarks></remarks>
    Protected Sub btnLoad_Click(sender As Object, e As System.EventArgs) Handles btnLoad.Click
        'Set the index 
        Dim index As Integer = ddlLoadEvents.SelectedIndex

        eventName.InnerHtml = "test - " + Date.Now() 'ds.Tables(0).Rows(index).Item(0)
        eventContainer.InnerHtml = ds.Tables(0).Rows(index).Item(1)
    End Sub

    Protected Sub btnSave_Click(sender As Object, e As System.EventArgs) Handles btnSave.Click
        writeData()
    End Sub

    Private Function writeData()
        Dim newRow As DataRow = ds.Tables(0).NewRow()
        newRow("name") = eventName.InnerHtml.ToString
        newRow("schedule") = hfEventData.Value 'eventContainer.InnerHtml
        newRow("created") = ""
        newRow("modified") = Date.Now()

        'Save it
        ds.Tables(0).Rows.Add(newRow)
        ds.WriteXml(Server.MapPath("events.xml"))
    End Function

    ''' <summary>
    ''' Function to check (or update) dataset from a session 
    ''' </summary>
    ''' <returns>dataset from xml given xml file </returns>
    ''' <remarks></remarks>
    Private Function getSessionDS() As Data.DataSet
        Dim pathToXML As String = "events.xml" 'reestablish each time 
        'check to see if we have read the xml file already, if not then we read it and save the result to asession variable.
        If Session.Item("MyDS") Is Nothing Then
            ' Reads invoices.xml and stores it to a dataTable accessable as a session variable
            pathToXML = Server.MapPath(pathToXML)
            Dim ds As New DataSet
            ds.ReadXml(pathToXML)

            'save the dataset to the session
            Session.Item("MyDS") = ds
            Return ds
        Else
            'return the dataset that is currently saved in the session state
            Return Session.Item("MyDS")
        End If
    End Function

End Class
