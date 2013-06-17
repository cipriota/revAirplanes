<?php
	$hex = $_GET['modeS'];
	$flight = $_GET['flight'];

	if ($flight==null || $hex==null)
		die;
		
	try {

		$dbh = new PDO('sqlite:../db/StandingData.sqb');
		
		$st = $dbh->query('select a1.name as originName, a1.iata as originIATA, a2.name as destName, a2.iata as destIATA from route r, airport a1, airport a2 where r.callsign like \''.$flight.'\' and a1.airportid = r.fromairportid and a2.airportid = r.toairportid');
  		
  		$st->setFetchMode(PDO::FETCH_OBJ);
  		
  		$result = $st->fetch();

		$originName = $result->originName;
		$originIATA = $result->originIATA;
		$destName = $result->destName;
		$destIATA = $result->destIATA;

		print "{ \"modeS\": \"" . $hex . "\", \"originName\": \"".$originName."\", \"originIATA\": \"".$originIATA."\", \"destName\": \"".$destName."\", \"destIATA\": \"".$destIATA."\" }";

		$dbh = null;
	} catch (PDOException $e) {
		print "Error!: " . $e->getMessage() . "<br/>";
  		die();
	
	}
?>
