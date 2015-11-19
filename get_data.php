<?php
	header('Access-Control-Allow-Origin: *');

	require_once "heritage_alliance_db.php";
	
	//variables for non-calender data
	$info_type = $_GET['info_type'];
	$info_item = $_GET['info_item'];
	
	$db = new HADB();
	$select_string = $db->create_select_string(array($info_item), $info_type, '', '');
	$results = $db->query_db($select_string);
	while($row = $results->fetchArray(SQLITE3_ASSOC)){
		echo $row[$info_item] . "<br />";
	}
	
	$db->disconnect();
?>