<?php

	class HADB extends SQLite3{
		function __construct(){
			$this->open('sqlite/heritage_alliance.db');
		}
	}

	$db = new HADB();
	if(!$db){
		echo $db->lastErrorMsg();
	}else{
		echo "Opened database successfully\n";
	}

	$sql =<<<EOF
		SELECT * from about;
EOF;

	$ret = $db->query($sql);
	while($row = $ret->fetchArray(SQLITE3_ASSOC) ){
		echo "id = ". $row['id'] . "\n";
		echo "mission = ". $row['mission'] ."\n";
		echo "history = ". $row['history'] ."\n";
		echo "philosophy =  ".$row['philosophy'] ."\n\n";
	}
	echo "Operation done successfully\n";
	$db->close();

?>