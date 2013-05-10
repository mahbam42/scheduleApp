<%@ Page Language="VB" AutoEventWireup="false" CodeFile="savingTest1.aspx.vb" Inherits="savingTest1" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.2/themes/smoothness/jquery-ui.css" />
	<link rel="stylesheet" href="style/main.css" />

	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
    <script src="scripts/dragAndDrop.js"></script>

    <script type="text/javascript">
        $(document).ready(function () {
            $('#btnSave').click(function () {
                alert("Save Button Clicked! #eventContainer contains: " + $('#eventContainer').text);
                $('#hfEventData').val($('#eventContainer').text);
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <h1>Schedule App</h1>
	<p>RGX Consulting Services &copy; 2013</p>

	<div id="tabs">
		<ol>
            <li><a href="#tab-4">Load Event</a></li>
			<li><a href="#tab-1">Create Event</a></li>
			<li><a href="#tab-2">Volunteers</a></li>
			<li><a href="#tab-3">Info</a></li>
		</ol>
        <div id="tab-4">
            <table>
                <tr>
                    <td>
                        Load Event Schedule</td>
                    <td>
                        <asp:Button ID="btnLoad" runat="server" Text="Load" /></td>
                    <td>
                        <asp:Button ID="btnSave" runat="server" Text="Save" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <asp:DropDownList ID="ddlLoadEvents" AutoPostBack="true" runat="server">
                        </asp:DropDownList> <br />
                        Created: 
                        <asp:Label ID="lblCreated" runat="server" Text="Label"></asp:Label>
                        &nbsp;Last Modified: 
                        <asp:Label ID="lblModified" runat="server" Text="Label"></asp:Label>
                    </td>
                </tr>
            </table>
        </div>
		<div id="tab-1"><!-- Event Set-up -->
			<table>
				<tr>
					<td></td>
					<td>Start Date</td>
					<td>End Date</td>
					<td>Default Shift Length (in Hours)</td>
					<td rowspan="2">
						<input type="button" id="btnNewEvent" value="Create Schedule">
					</td>
				</tr>
				<tr>
					<td><input type="text" name="eventName" id="txtEventName" placeholder="Event Name"></td>
					<td><input type="date" name="startDate" id="startDate"></td>
					<td><input type="date" name="endDate" id="endDate"></td>
					<td><input type="number" name="defaultShiftLength" id="defaultShiftLength"></td>
				</tr>
			</table>
		</div>
		<div id="tab-2"><!-- Volunteer Info -->
			<table>
				<tr>
					<td>Name</td>
					<td># of Shifts</td>
					<td>Length of Shifts (in Hours)</td>
					<td rowspan="2">
						<input type="button" id="btnAddVolunteer" value="Add Volunteer">
					</td>
				</tr>
				<tr>
					<td><input type="text" name="volunteer" id="txtVolunteer"></td>
					<td><input type="number" name="shifts" id="txtShifts"></td>
					<td><input type="number" name="shiftLenght" id="shiftLength"></td>
				</tr>
			</table>
		</div>
		<div id="tab-3"><!-- Application Info -->
			<ul>
				<li>Use the "Event Set-up" Tab to enter the Event name and dates</li>
				<li>Use the "Volunteers" Tab to quickly add a volunteer to the schedule</li>
				<li>
					Using the Schedule Grid:
					<ul>
						<li>Click on a Volunteer's name to add a shift for a given day</li>
						<li>Shifts can be moved by clicking anywhere in a shift and dragging it (Shifts snap to 1/2 hour intervals)</li>
						<li>Shifts can be deleted by clicking on the "X" in the top right corner</li>
					</ul>
				</li>
				<p>This application is developed and maintained by <a href="http://maxbrother.com">Max Brother Technologies</a> to report an issue or request features please <a href="https://github.com/mahbam42/scheduleApp/issues/new">Contact Us</a></p>				
			</ul>
		</div>
	</div><!-- End Control Panel -->
    <h2 id="eventName" runat="server"></h2>
	<div id="eventContainer" runat="server">
		
	</div><!-- End #eventContainer -->
    <asp:HiddenField ID="hfEventData" runat="server" />
    </form>
</body>
</html>
