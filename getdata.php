<?php
	//$json = file_get_contents("http://andresavva.dyndns.org:8080/data.json");
	$json = file_get_contents("http://www.flightradar24.com/PlaneFeed.json");
	//echo $json;


	$obj = json_decode($json, true);

	foreach ($obj as $airplane => $value) {
		
		/*
		foreach($value as $var => $varvalue) {
			echo "$varvalue ";
		}
		echo "\n";
		*/
		
		getFlightInfoFromDB($value[13]);
	}

function getFlightInfoFromDB($flight) {
	if ($flight==null) {
		return;
	}

	$dbconn = pg_connect("host=localhost dbname=personal user=postgres password=!Merap2012")
    or die('Could not connect: ' . pg_last_error());

	$query = 'SELECT * FROM authors';
	$result = pg_query($query) or die('Query failed: ' . pg_last_error());

	pg_close($dbconn);
}
?>
