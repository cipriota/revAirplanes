<?php
	try {
		$dbh = new PDO('sqlite:StandingData.sqb');
	
		foreach ($dbh->query('SELECT * FROM AircraftType') as $row) {
    		print_r($row);
  		}
  		$dbh = null;
	} catch (PDOException $e) {
		print "Error!: " . $e->getMessage() . "<br/>";
  		die();
	
	}
	/*$query = $db->query('SELECT * FROM model');
	
	$result = $query->fetchAll(SQLITE_ASSOC);
	
	foreach ($result as $entry) {
		echo $entry['name'];
	}*/
?>