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


$(document).ready(function () {
    // Set Up an Empty Shift 
    shift = '<div class="shift"><span class="close">X</span><p>Regular Shift</p></div>';

    // Add a new shift when you click on name 
    $('.name').click(function (event) {
        var $newshift = $(shift);
            $(this).siblings(".row").append($newshift);
            stretch($newshift);
            drag($newshift);
            closer($newshift);
    });


});