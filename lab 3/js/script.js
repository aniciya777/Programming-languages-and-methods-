$(function () {
    $.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );
    $("#dateInput").datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: 0,
    });
});