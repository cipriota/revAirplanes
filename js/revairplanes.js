// global variables
var map;
var layer;
var aircraft;
var selectedId;
var airIcon;

var airIcon = {
	on: $("<img>").attr('src', 'img/airplane_on.svg'), 
	off: $("<img>").attr('src', 'img/airplane.svg')
};

$(document).ready(function() {
	var mapDraw;

	MapDraw();

	aircraft = {};

	window.setInterval(function(){
		$.getJSON('getdata.php', function(data) {		
			ProcessAircraftData(data);
			
		});
	},2000);

});

function ProcessAircraftData(data) {
	for (i in data) {
		var obj;
		var modeS;

		obj = data[i];

		modeS = obj.hex;

		if (aircraft[modeS]==null) {
			aircraft[modeS] = {};		
		}

		aircraft[modeS].active = true;
		aircraft[modeS].altitude = obj.altitude;
		aircraft[modeS].speed = obj.speed;
		aircraft[modeS].lat = obj.lat;
		aircraft[modeS].lon = obj.lon;
		aircraft[modeS].fligt = obj.flight;
		aircraft[modeS].track = obj.track;

		MapDrawAircraft(aircraft[modeS]);

	}
	
	for (i in aircraft) {
		if (!aircraft[i].active) {
			aircraft[i] = null;

			delete aircraft[i];

		} else {

			aircraft[i].active = false;

		}
	}
}

//
// Map related functions
//
function MapDrawAircraft(aircraftObj) {
	var marker;
	var icon;

	marker = aircraftObj.marker;

	if (!marker) {
		marker = {}
		marker = new L.marker([aircraftObj.lat, aircraftObj.lon]);
		marker.addTo(map);
	}

	icon = $(airIcon.off).clone();

	marker.setLatLng(new L.LatLng(aircraftObj.lat, aircraftObj.lon));
	marker.setIcon(new L.divIcon({html: icon.css('-webkit-transform', 'rotate(' + aircraftObj.track + 'deg)')[0].outerHTML}));
	
	aircraftObj.marker = marker;
	
}

function MapDraw() {
	var zoomControl;
	var layerOptions;

	zoomControl = new L.Control.Zoom({position: 'topright'});

	layerOptions = {
		maxZoom: 11,
		minZoom: 1,
		reuseTiles: true
	};

	map = L.map('map', {zoomControl: false}).setView([38.76,-9.12], 8);

	layer = L.tileLayer('../tiles/cloudmate/{z}/{x}/{y}.png', layerOptions).addTo(map);
	zoomControl.addTo(map);

}
