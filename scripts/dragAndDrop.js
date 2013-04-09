
$(document).ready(function () {
    function stretch(e) {
        $(e).resizable({
            maxHeight: 50,
            maxWidth: 1200,
            minHeight: 25,
            minWidth: 44,
            grid: 25,
            ghost: true
        });
    }
    function drag(e) {
        $(e).draggable({
            snap: true,
            grid: [25, 50],
            containment: "parent",
            axis: "x"
        });
    }
    function closer(e) {
        $(e).find('.close').click(function () {
            $(this).parent().remove();
        });
    }
    // Set Up an Empty Shift 
    shift = '<div class="shift"><span class="close">X</span><p>Regular Shift</p></div>';

    $('.name').click(function (event) {
        var $newshift = $(shift);
            $(this).siblings(".row").append($newshift);
            stretch($newshift);
            drag($newshift);
            closer($newshift);
    });
});