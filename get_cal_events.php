<?php

header('Access-Control-Allow-Origin: *');

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
		while (count($itemized_events[$i]) > 6){
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
 	for($i=0;$i<count($events_array);$i++){
		$assoc_array = (array)null;
		for($j=0;$j<count($events_array[$i]);$j++){
			$colon = strpos($events_array[$i][$j], ": ");
			$key = substr($events_array[$i][$j], 0, $colon);
			if ($j === 3){
				$value = substr($events_array[$i][$j], $colon + 2);
				if ($value === "false"){
					$value = false;
				}else{
					$value = true;
				}
			}else{
				$value = substr($events_array[$i][$j], $colon + 3, -1);	
			}
			$assoc_array[$key] = $value;
		}
		$events_array[$i] = $assoc_array;
	}

	return $events_array;
}

function get_json_cal_events($events_array){
	$json_cal = json_encode($events_array);
	echo $json_cal;
}

function get_calendar_events($cal_url){
	$events1 = curl_download($cal_url);
	$events2 = parse_output($events1);
	$events3 = parse_events($events2);
	$events4 = remove_colors($events3);
	$events5 = remove_whitespace($events4);
	$events6 = get_key_values($events5);
	get_json_cal_events($events6);
}

get_calendar_events($ha_url);

?>

