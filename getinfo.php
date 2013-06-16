<?php
	// Aircraft type;
	//
	$hex = $_GET['modeS'];

	if ($hex==null)
		die;
		
	try {
		$dbh = new PDO('sqlite:/db/basestation.sqb');
	
		/*foreach ($dbh->query('SELECT registration FROM aircraft where modeS like \'4950F5\'') as $row) {
    		print_r($row['Registration']);
  		}
  		*/
  		$st = $dbh->query('SELECT registration, OperatorFlagCode FROM aircraft where modeS like \''.$hex.'\'');
  		
  		$st->setFetchMode(PDO::FETCH_OBJ);
  		
  		$result = $st->fetch();
  		
  		print "{\"modeS\": \"" . $hex . "\",\"registration\": \"" . $result->Registration . "\",\"airline\": \"".$result->OperatorFlagCode."\" }";
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