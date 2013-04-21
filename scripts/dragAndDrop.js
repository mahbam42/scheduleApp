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
    shift = '<div class="shift"><span class="close">X</span><p>Regular Shift</p></div>';
    var $newshift = $(shift); // Jackie Treehorn treats ojects like women man
    $(e).siblings(".row").append($newshift);
    // Calls all of the interactive goodies on the new shift 
    stretch($newshift);
    drag($newshift);
    closer($newshift);
}

// Holds all of the page events 
$(document).ready(function () {
	// Set Up the Menu 
	$("#tabs").tabs();

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
			var day = '<div class="day"><h3>' + dayN.toDateString() + ' - Day ' + eventDay + '</h3>';
			// stick it in there! 
			$('#eventContainer').append($(day));
		}

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

		// For Each Container add the name of the volunteer and the shift holder 
		$('.day').each( function() {
			$(this).append($shiftContainer); // pulled ".children('.rowContainer')" from this line to hopefully solve a problem... 
		});
		// In each row... 
		$('.rowContainer').each( function() {
			// ... first check to see if div.name = $name then do the rest of the magic...
			if ($name == $(this).children('.name').text()){
				// ...then loop through the number of shifts indicated for the Volunteer and add them to each row 
				for (var i = 0; i < $shifts; i++){
					var shiftHTML = '<div class="shift"><span class="close">X</span><p>Regular Shift</p></div>';
					var $newshift = $(shiftHTML);
					$(this).children(".row").append($newshift);
					stretch($newshift);
					drag($newshift);
					closer($newshift);
				}
			}
		});
	}); // End btnAddVolunteer click event
}); // End Document Ready Block 

