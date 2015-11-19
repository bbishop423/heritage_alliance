<?php

	class HADB extends SQLite3{
		
		function __construct(){
			try{
				$this->open('sqlite/heritage_alliance.db');
			}catch (Exception $e){
				echo 'Failed to connect to database.';
			}
		}
		
		public function disconnect(){
			$this->close();
		}
		
		public function create_select_string($columns, $table, $attribute, $specification){
			$sql = 'select ';
			$i = 1;
			foreach($columns as $column){
				$sql .= $column;
				if(count($columns) > 1 && $i < count($columns)){
					$sql .= ', ';
				}
				$i++;
			}
			$sql .= ' from ' . $table;
			if (strlen($specification) > 0 && strlen($attribute) > 0){
				$sql .= ' where ' . $attribute . ' = ' . $specification;
			}
			$sql .= ';';
			return $sql;
		}
		
		public function query_db($sql){
			$response = $this->query($sql);
			return $response;
		}
		
	}
?>