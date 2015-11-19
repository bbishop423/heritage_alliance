<?php

$ha_url = "http://www.heritageall.org/calendar/";

function curl_download($url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$output = curl_exec($ch);
	curl_close($ch);

	$start = strpos($output, 'events: [');
	$end = strpos($output, '],', $start);
	$length = $end - $start;
	$output = substr($output, $start, $length);
	$output = substr($output, 24, -12);

	return $output;
}

function parse_output($scraped_text){
	$results = explode('},', $scraped_text);
	for($i=1;$i<count($results);$i++){
		$results[$i] = substr($results[$i], 14);
	}	
	return $results;
}

function parse_events($all_events){
	$itemized_events = (array)null;
	foreach ($all_events as $event){
		$split_event = explode(',', $event);
		array_push($itemized_events, $split_event);
	}

	for($i=0;$i<count($itemized_events);$i++){
		if (count($itemized_events[$i]) > 6){
			$itemized_events[$i][0] .= "," . $itemized_events[$i][1];
			unset($itemized_events[$i][1]);
			$itemized_events[$i] = array_values($itemized_events[$i]);
		}
	}
	
	return $itemized_events;
}

function remove_colors($events_array){
	for($i=0;$i<count($events_array);$i++){
		unset($events_array[$i][4]);
		$events_array[$i] = array_values($events_array[$i]);
	}

	return $events_array;
}

function remove_whitespace($events_array){
	for($i=0;$i<count($events_array);$i++){
		for($j=0;$j<count($events_array[$i]);$j++){
			$events_array[$i][$j] = trim($events_array[$i][$j]);
		}
	}
	
	return $events_array;
}

function get_key_values($events_array){
	$assoc_array = (array)null; 
	for($i=0;$i<count($events_array);$i++){
		for($j=0;$j<count($events_array[$i]);$j++){
			$colon = strpos($events_array[$i][$j], ": ");
			//echo $colon . " " .$events_array[$i][$j]. " <br />";
			$key = substr($events_array[$i][$j], 0, $colon);
			if ($j === 3){
				$value = substr($events_array[$i][$j], $colon + 2);
			}else{
				$value = substr($events_array[$i][$j], $colon + 3, -1);	
			}
			echo $key . " : " . $value . "<br />";
		}
	}
}

$events1 = curl_download($ha_url);
$events2 = parse_output($events1);
$events3 = parse_events($events2);
$events4 = remove_colors($events3);
$events5 = remove_whitespace($events4);
get_key_values($events5);
//print_r($events4);

?>

