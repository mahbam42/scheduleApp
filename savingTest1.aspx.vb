Imports System.Xml
Imports System.Xml.XPath
Imports System.Diagnostics
Imports System.IO
Imports System.Configuration
Imports System.Data

Partial Class savingTest1
    Inherits System.Web.UI.Page

    Public pathToXML As String = ""
    Dim dt As New DataTable
    Dim dv As DataView
    Dim ds As DataSet

    Protected Sub Page_Init(sender As Object, e As System.EventArgs) Handles Me.Init
        ds = getSessionDS()

    End Sub

    ''' <summary>
    ''' Function to check (or update) dataset from a session 
    ''' </summary>
    ''' <returns>dataset from xml given xml file </returns>
    ''' <remarks></remarks>
    Private Function getSessionDS() As Data.DataSet
        ''Dim pathToXML As String = "invoices.xml" 'maybe don't need...
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
