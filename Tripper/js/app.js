(function(){
var app;
app = angular.module('roadTrip',['ui.bootstrap']);

app.controller('TripController', function(){
	this.Trip = {
		StartLocation:'',
		EndLocation:'',
		dailyDriveTime:8,
		numPeople :1,
		dayStartTime : new Date(),
		lunchTime : new Date(),
		dinnerTime : new Date(),
		waypoint : []
	};
});

app.controller('TabController', function(){
	this.tab = 1;
	this.setTab = function(setTab){
		this.tab = setTab;
	};
	this.isSet = function(tab){
		return this.tab === tab;
	};
});

app.controller('TripInfoController', function(){
	this.StartLocation = '';
	this.EndLocation = '';
	this.open = false;
	this.dailyDriveTime = 8;
	this.numPeople = 1;
	this.dayStartTime = new Date();
	this.lunchTime = new Date();
	this.dinnerTime = new Date();
	this.disabled = function(date,mode){
		return ( mode === 'day' && ( date.getDay() === -1 || date.getDay() === 7 ) );
         };
	this.date = new Date();

	this.addInfo = function(trip){
		trip.StartLocation = this.StartLocation;
		trip.EndLocation = this.EndLocation;
		trip.StartDateTime = this.date;
		trip.dailyDriveTime = this.dailyDriveTime;
		trip.numPeople = this.numPeople;
		trip.dayStartTime = this.dayStartTime 
		trip.lunchTime = this.lunchTime 
		trip.dinnerTime = this.dinnerTime 
		$.post( "http://roadtrippr.me/api/rest/trips/", trip, function( data ) {
		});
		alert(JSON.stringify(trip));
	};

});

app.controller('WayPointController', function(){
	this.waypoint = {};
	this.addWaypoint = function(trip){
		trip.waypoints.push(this.waypoint);
		this.waypoint = {};
	}
});

app.controller('OtherInfoController',function(){
	this.dailyDriveTime = 8;
	this.numPeople = 1;
	this.dayStartTime = new Date()
	this.lunchTime = new Date()
	this.dinnerTime = new Date()
	this.addOtherInfo = function(trip){
		trip.dailyDriveTime = this.dailyDriveTime;
		trip.numPeople = this.numPeople;
		trip.dayStartTime = this.dayStartTime ? this.dayStartTime : new Date().setHour(8);
		trip.lunchTime = this.lunchTime ? this.lunchTime : new Date().setHour(12);
		trip.dinnerTime = this.dinnerTime ? this.dinnerTime : new Date().setHour(18);
	}
});


// var trip = 
// {
// 	StartLocation:'this is a test',
// 	EndLocation:'',
// 	StartDateTime:new Date(),
// 	waypoints: [{
// 	}],
// 	dailyDriveTime:8,
// 	numPeople:1,
// 	dayStartTime:new Date(),
// 	lunchTime:new Date(),
// 	dinnerTime:new Date()
// };

})();

