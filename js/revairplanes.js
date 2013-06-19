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
	
	$('#info').click(function() {
		$('#info').removeClass('visible');
		$('#info').addClass('hidden');
	});

});

function ProcessAircraftData(data) {
	for (i in data) {
		var obj;
		var modeS;

		obj = data[i];

		modeS = obj.hex;

		if (aircraft[modeS]==null) {
			aircraft[modeS] = {};
			aircraft[modeS].modeS = modeS;
			aircraft[modeS].flightInfo = {};
			aircraft[modeS].flightInfo.destination = {};
			aircraft[modeS].flightInfo.origin = {};
			aircraft[modeS].flightInfo.destination.name = "-";
			aircraft[modeS].flightInfo.destination.iata = "-";
			aircraft[modeS].flightInfo.origin.name = "-";
			aircraft[modeS].flightInfo.origin.iata = "-";
			
			$.getJSON('getinfo.php?modeS='+modeS).done(function (data){
			
				if (!data.registration || data.registration == '') 
					aircraft[data.modeS].registration = "-";
				else 
					aircraft[data.modeS].registration = data.registration;
				
				aircraft[data.modeS].airline = data.airline;
					
			});
		}

		aircraft[modeS].active = true;
		aircraft[modeS].altitude = obj.altitude;
		aircraft[modeS].speed = obj.speed;
		aircraft[modeS].lat = obj.lat;
		aircraft[modeS].lon = obj.lon;
		aircraft[modeS].track = obj.track;
				
		if (obj.flight == '')
			aircraft[modeS].flight = "no callsign";
			
		else if (obj.flight != "no callsign") {
			aircraft[modeS].flight = obj.flight;
			
			$.getJSON('getflight.php?modeS=' + modeS + "&flight=" + aircraft[modeS].flight).done(function (data){
				
				if (data.destName != "") {
					aircraft[data.modeS].flightInfo.destination.name = data.destName;
					aircraft[data.modeS].flightInfo.destination.iata = data.destIATA;
					aircraft[data.modeS].flightInfo.origin.name = data.originName;
					aircraft[data.modeS].flightInfo.origin.iata = data.originIATA;

					MapDrawAircraft(aircraft[modeS]);
			
					if (selectedId==modeS)
						MapRefreshInfo(aircraft[modeS]);
	
				}

			});
		}
		
		MapDrawAircraft(aircraft[modeS]);
		
		if (selectedId==modeS)
			MapRefreshInfo(aircraft[modeS]);

	}
	
	for (i in aircraft) {
		if (!aircraft[i].active) {
		
			map.removeLayer(aircraft[i].marker);
			
			aircraft[i] = null;
			delete aircraft[i];

		}
	}
	
	for (i in aircraft) {
		aircraft[i].active = false;
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
		marker = {};
		marker = new L.marker([aircraftObj.lat, aircraftObj.lon], {icon: new L.Icon({iconUrl: 'img/airplane.png', iconSize: [25,25] })});
		marker.bindLabel(aircraft.flight, { noHide: true, className: 'label' });
		marker.addTo(map);
		marker.showLabel();
		
		$(marker).click({hex: aircraftObj.modeS}, function(e){
			var hex = e.data.hex;
			
			map.setView(new L.LatLng(aircraft[hex].lat, aircraft[hex].lon), map.getZoom());
			
			MapRefreshInfo(aircraft[hex]);
			
			selectedId = hex;
			
			$('#info').removeClass('hidden');
			$('#info').addClass('visible');
					
		});
	}

	icon = $(airIcon.off).clone();

	marker.setLatLng(new L.LatLng(aircraftObj.lat, aircraftObj.lon));
	marker.setIcon(new L.divIcon({html: icon.css('-webkit-transform', 'rotate(' + aircraftObj.track + 'deg)')[0].outerHTML}));
	marker.updateLabelContent(aircraftObj.flight);
	
	aircraftObj.marker = marker;
	
}

function MapRefreshInfo(aircraftObj) {
	if ($('#info .registration').html()!=aircraftObj.registration && aircraftObj.flight) {
		var image = $('<img>');
		var url;
		
		$('#info .picture').empty();
					
		url = '../airplanes/'+aircraftObj.airline+'/'+aircraftObj.registration+'.jpg';
		

		$.ajax({
			type: 'HEAD',
			url: url,
			success: function() {
				image.attr('src', '../airplanes/'+aircraftObj.airline+'/'+aircraftObj.registration+'.jpg');
				$('#info .picture').append(image);
			}
		});
	}
	
	if ($('#info').hasClass('visible')) {
		$('#info .flight').html(aircraftObj.flight);
		$('#info .registration').html(aircraftObj.registration);
		$('#info .speed .value').html(aircraftObj.speed);
		$('#info .altitude .value').html(aircraftObj.altitude);
		$('#info .heading .value').html(aircraftObj.track);
		$('#info .from .value').html(aircraftObj.flightInfo.origin.iata);
		$('#info .to .value').html(aircraftObj.flightInfo.destination.iata);
	}
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

	layer = L.tileLayer.grayscale('../tiles/cloudmate/{z}/{x}/{y}.png', layerOptions).addTo(map);
	zoomControl.addTo(map);

}
