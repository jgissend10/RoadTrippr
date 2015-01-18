$(document).ready(function() {
var datastring = $("#trip").serialize();
        $.ajax({
            type: "POST",
            url: "http://roadtrippr.me/api/rest/trips/",
            data: datastring,
            success: function(data) {
                 alert('Data send');
            }
        });
});