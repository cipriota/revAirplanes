<?php
	// Aircraft type;
	//
	$hex = $_GET['modeS'];
	$flight = $_GET['flight'];

	if ($hex==null)
		die;
		
	try {
		$dbh = new PDO('sqlite:../db/basestation.sqb');
	

  		$st = $dbh->query('SELECT registration, OperatorFlagCode FROM aircraft where modeS like \''.$hex.'\'');
  		
  		$st->setFetchMode(PDO::FETCH_OBJ);
  		
  		$result = $st->fetch();
  		
		$registration = $result->Registration;
		$airline = $result->OperatorFlagCode;
		

		print "{\"modeS\": \"" . $hex . "\",\"registration\": \"" . $result->Registration . "\",\"airline\": \"".$result->OperatorFlagCode."\" }";

		$dbh = null;
	} catch (PDOException $e) {
		print "Error!: " . $e->getMessage() . "<br/>";
  		die();
	
	}

?>
