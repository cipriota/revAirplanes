<?php
	$airline = $_GET['airline'];
	$registration = $_GET['registration'];
	$aircraftType = $_GET['aircraftType'];

	$path = "../airplanes/" . $airline . "/" . $registration . ".jpg";
	$genericType = "../airplanes/generic/" . $aircraftType . ".jpg";
	$generic = "../airplanes/generic/generic.jpg";

	if (file_exists($path)) {
		print $path;

	} elseif (file_exists($genericType)) {
		print $genericType;

	} else {
		print $generic;
	}

?>
