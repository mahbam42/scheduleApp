// Gloabal Variables 
var $shiftLength = 4*50; // (hours X width) initial value is set to 4 hours and size is 50px per hour

// Various Global Functions 

// Stretch shifts to the desired length
function stretch(e) {
    $(e).resizable({
        maxHeight: 50,
        maxWidth: 1200, // 24 (hours) x 50px
        minHeight: 25,
        minWidth: 44, // 4 hour minimum for shift length (hard coded atm)
        grid: 25, // Snap to the 1/2 hour 
        ghost: true // because it looks cool 
    });
}
// Drag shifts around to change start time 
function drag(e) {
    $(e).draggable({
		snap: true,
        grid: [25, 50], //Snaps to the half hour 
        containment: "parent", // keeps each shift in their row
        axis: "x" // pretty clear 
    });
}
// Deletes a shift 
function closer(e) {
    $(e).find('.close').click(function () {
        $(this).parent().remove();
    });
}

//Call to add a new Shift 
function addNew(e) {
    // Set Up an Empty Shift 
    shift = '<div class="shift" style="width: ' + $shiftLength + ';"><span class="close">X</span><p>Regular Shift</p></div>';
    var $newshift = $(shift); // Jackie Treehorn treats ojects like women man
    $(e).siblings(".row").append($newshift);
    // Calls all of the interactive goodies on the new shift 
    stretch($newshift);
    drag($newshift);
    closer($newshift);

}

// Set-up default shift length 
function setShiftLength(e) {
	if ($(e).val() !== ""){
		$shiftLength = $(e).val() * 50;
		// passes the new value to the Volunteer's tab
		$(shiftLength).val($(e).val());
	}
}

// Holds all of the page events 
$(document).ready(function () {
	// Set Up the Menu 
	$("#tabs").tabs();

	// click event to change the label on a clicked shift
	$('#eventContainer').delegate('.shift', 'click', function(event){
		// $(this) is '.shift'
		$(this).find('p').hide(); // Hide the current label p 
		$(this).append('<input type="text" name="txtLabel" id="txtLabel" />'); // replace it with an input
		$(this).find("#txtLabel").focus(); // and set focus to avoid the nasty stacking click event 

		// change the input back into a label
		$(this).delegate('#txtLabel', 'change', function(){
			// $(this) is '#txtLabel' 
			// console.log('#txtLabel delegation worked, now on to firing the blur event')
			$(this).siblings('p').text($('#txtLabel').val()); // change the label to the new value 
			$(this).siblings('p').show(); // bring it back 
			$(this).remove(); // and remove the input 
		}); // end textbox event // end 2nd level delegate
		return false;
	}); // End Delegate

    // Add a new shift when you click on name 
    shift = '<div class="shift"><span class="close">X</span><p>Regular Shift</p></div>';

    // If it's already there 
    $('.name').click(function (event) {
        var $newshift = $(shift);
            $(this).siblings(".row").append($newshift);
            stretch($newshift);
            drag($newshift);
            closer($newshift);
    });
    // Otherwise this catches '.name' when added
    // Set-up a watch for when '.name' is added to the page 
	$('#eventContainer').delegate('.name', 'click', function(){
		//console.log("Clicked on Name, and that means delegate worked");
		addNew($(this));
	});

    // Set-up a new event schedule 
	$('#btnNewEvent').click( function() {
		// Add Event Name 
		if ($('#txtEventName').val() !== ""){
			$('#eventName').text($('#txtEventName').val());
		}
		// Get Event Lenght
		function parseDate(str) {
			var mdy = str.split('-');
			return new Date(mdy[0], mdy[1] - 1, mdy[2]);
		}
		// Subtracts start date from the end date to get the number of days 
		function daydiff(first, second) {
			return ((second - first)/(1000*60*60*24));
		}
		eventLength = daydiff(parseDate($('#startDate').val()), parseDate($('#endDate').val()));

		// Set up what to add for each day 
		for(var i = 0; i <= eventLength; i++){
			// Set-up for adding the date to each 'day' 
			mdy = $('#startDate').val().split('-');
			var dayN = new Date(mdy[0], mdy[1]-1, mdy[2]+++i);
			var eventDay = (i+1); // Not strictly necessary but useful for the lazy 
			// This will be made cleaner... 
			// Sets a row of hours to the top of each day
			var hours = '<div class="schedule"><div class="column">1am</div><div class="column">2am</div><div class="column">3am</div><div class="column">4am</div><div class="column">5am</div><div class="column">6am</div><div class="column">7am</div><div class="column">8am</div><div class="column">9am</div><div class="column">10am</div><div class="column">11am</div><div class="column">12pm</div><div class="column">1pm</div><div class="column">2pm</div><div class="column">3pm</div><div class="column">4pm</div><div class="column">5pm</div><div class="column">6pm</div><div class="column">7pm</div><div class="column">8pm</div><div class="column">9pm</div><div class="column">10pm</div><div class="column">11pm</div><div class="column" style="border: 0;">12am</div></div>';
			var day = '<div class="day"><h3>' + dayN.toDateString() + ' - Day ' + eventDay + '</h3>' + hours;
			// stick it in there! 
			$('#eventContainer').append($(day));
		}

		// set the shift length
		setShiftLength($(defaultShiftLength));

		// Move to the volunteer tab 
		$( "#tabs" ).tabs({
			active: 1
		});
		// Add shift length global variable 
	}); // End btnNewEvent click event

	// Add volunteer panel logic -all 
	$('#btnAddVolunteer').click( function(){
		// Set up the variables 
		// Volunteer Name
		var $name = $('#txtVolunteer').val();
		// Number of Shifts to Add 
		var $shifts = $('#txtShifts').val();
		var $shiftContainer = '<div class="rowContainer"><div class="name"><p>' + $name + '</p></div><div class="row"></div></div>';
		setShiftLength($(shiftLength));

		// For Each Container add the name of the volunteer and the shift holder 
		$('.day').each( function() {
			$(this).append($shiftContainer); // pulled ".children('.rowContainer')" from this line to hopefully solve a problem... 
		});
		// In each row... 
		$('.rowContainer').each( function() {
			// ... first check to see if div.name = $name then do the rest of the magic...
			if ($name == $(this).children('.name').text()){
				// ...then loop through the number of shifts indicated for the Volunteer and add them to each row 
				var $nameInRow = $(this).children('.name');
				for (var i = 0; i < $shifts; i++){
					addNew($nameInRow);
				}
			}
		});
		fixShifts(); // checks and fixes everything
	}); // End btnAddVolunteer click event

	// Hacks 
	// to fix '.shift' positioning changes 
	function fixShifts() {
		// Loop through each .shift and fix all of them 
		$('.shift').each( function() {
			$(this).css('position', 'relative'); // If a shift is stretched at all it is given 'position: absolute;' for some reason 
			$(this).css('top', 0); // since it becomes 'position: absolute;' top is calulated from the top of the window
			console.log('.shift position changed'); // log it to find out what's going on 
		}); // End .shift fix 
	}
	// end hacks 
}); // End Document Ready Block 

