(function(){
var app;
app = angular.module('roadTrip',['ui.bootstrap']);
app.controller('TabController', function(){
	this.tab = 1;
	this.setTab = function(setTab){
		this.tab = setTab;
	};
	this.isSet = function(tab){
		return this.tab === tab;
	};
});
})();

function doPost(){

  //   var form = document.createElement("form");
  // form.target = "uniqueString";
  // form.action = "http://roadtrippr.me/api/rest/trips/";
  // form.method = "POST";

  // // repeat for each parameter
  // var input = document.createElement("input");
  // input.type = "hidden";
  // input.name = "start_location";
  // input.value = "poop";
  // form.appendChild(input);
  // input.name = "end_location"
  // input.value = "dickbutt"
  // form.appendChild(input);
  // input.name = "start_datetime"
  // input.value = "2002-05-30T09:00:00"
  // form.appendChild(input);
    	$.ajax({
            type: "POST",
            url: "http://roadtrippr.me/api/rest/trips/",
            crossDomain:true,
            data: {"start_location": document.forms["trip"]["start_location"].value, "end_location": document.forms["trip"]["end_location"].value, "start_datetime": document.forms["trip"]["start_datetime"].value, "max_drive_time":document.forms["trip"]["drive_time"].value, "day_start_time":document.forms["trip"]["start_day_time"].value, "lunch_time":document.forms["trip"]["lunch_time"].value,"dinner_time":document.forms["trip"]["dinner_time"].value},
            success: function(data) {
                 alert('Data send');
            }
        });
}

// $(document).ready(function() {
//     $('#trip_submit').click(function(){
//     	var datastring = JSON.stringify(trip);
//     	alert(datastring)
//         $.ajax({
//             type: "POST",
//             url: "http://roadtrippr.me/api/rest/trips/",
//             data: datastring,
//             success: function(data) {
//                  alert('Data send');
//             }
//         });
    	
//     })
// });
