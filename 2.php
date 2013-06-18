<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<link rel="stylesheet" href="leaflet/leaflet.css" />
	<link rel="stylesheet" href="leaflet/leaflet.label.css" />
	<link rel="stylesheet" href="css/revairplanes.css" />
	<script src="leaflet/leaflet.js"></script>
	<script src="leaflet/leaflet.label.js"></script>
	<script src="js/jquery-1.10.0.min.js"></script>
	<script src="js/revairplanes.js"></script>
</head>
<body>
	<div id="map" class="leaflet-container leaflet-fade-anim" style="position: relative;" tabindex="0"></div>
	<div id="info">
		<div class="picture"></div>
		<div class="flight"></div>
		<div class="registration"></div>
		<div class="airports">
			<div class="from">
				<div class="title">From</title>
			</div>
			<div class="to">
				<div class="title">To</title>
			</div>		
		</div>
		<div class="speed">160 knot</div>
		<div class="altitude"></div>
		<div class="heading"></div>
	</div>
</body>
</html>
