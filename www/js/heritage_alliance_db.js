var chester_text = "<b>Chester Inn State Historic Site – Chester Inn Museum</b>" +
"<br />A State Owned Historic Site Operated by the Heritage Alliance of Northeast Tennessee and Southwest Virginia.  The operation of the Chester Inn is partially funded under an agreement with the Tennessee Department of Environment and Conservation – Tennessee Historical Commission." +
"<br /><br />116 West Main Street" +
"<br />(423) 753-4580" +
"<br /><br />Located in the heart of downtown Jonesborough, the Chester Inn Museum chronicles the history of Jonesborough from its inception in 1779 to the present. The museum is located on the street level of the oldest commercial building in town. Exhibits include information on the State of Franklin, a diorama of Jonesborough in the 1850s, the history of the Chester Inn, the 1873 cholera epidemic, and much more. Many of the exhibits feature Jonesborough’s extensive collection of photographs. The upstairs parlor and dining room of the Chester Inn, restored to the Victorian era style of the late 1800s, are also open for viewing. Kids’ activities include a museum scavenger hunt, a coloring book that features some of Jonesborough’s historic buildings, and a primary source activity with the cholera epidemic of 1873. This project is funded under an agreement with the State of Tennessee." +
"<br /><br />Hours of Operation" +
"<br />January-February by appointment only" +
"<br />March – April 11-6 Mon, Fri, Sat and 1-5 Sun" +
"<br />May – October 11-6 Mon, Wed-Sat and 1-5 Sun" +
"<br />November – December 11-6 Mon, Fri, Sat and 1-5 Sun" +
"<br /><br />No admission fees but donations are welcomed!<br />";

var washington_text = "<b>Jonesborough/Washington County History Museum & Archives</b>"+
"<br />Founded in 1982, the Jonesborough/Washington County History Museum and Archives collects artifacts, documents, and photographs to help tell the stories of the land and people who constituted the \"mother of Tennessee.\"" +
"<br /><br />Our collection of artifacts, newspapers and other ephemera focuses on the social, cultural, and economic history of Jonesborough and Washington County – creating a fascinating historical record of our region. Our extensive photographic collection spans the period from 1850 through the 1980s, and features a number of photographs from early Jonesborough photographers L.M. Keen and O.L. Hensley." +
"<br /><br />We invite you to visit our gallery space located in the Historic Jonesborough Visitors Center at 117 Boone Street. Exhibits include information on frontier life in Tennessee, local educational history, a rotating exhibit that honors local veterans, and much more. Come and see Jonesborough’s very first fire fighting equipment, purchased in the late 1800s, and view the clock that used to keep time in the 1847 Washington County Courthouse." +
"<br /><br />Hours of Operation:" +
"<br />Monday – Friday: 9:00am – 5:00pm" +
"<br />Saturday & Sunday: 10:00am – 5:00 pm<br />";


//main screen buttons
var menu_btn = $('#menu-btn');
var home_btn = $('#home-btn');
var aboutus_btn = $('#aboutus-btn');
var museums_btn = $('#museums-btn');
var exhibits_btn = $('#exhibits-btn');
var calender_btn = $('#calendar-btn');
var contact_btn = $('#contact-btn');

//swipe menu buttons
//i think these will get deleted
var menu_close = $('#closemenu-btn');
var menu_aboutus = $('#menu-aboutus');
var menu_museums = $('#menu-museums');
var menu_exhibits = $('#menu-exhibits');
var menu_calender = $('#menu-calendar');
var menu_contact = $('#menu-contact');

//global variables
var hadb; //database object
var qb; //query builder
var heritage_alliance_url = 'http://einstein.etsu.edu/~bishopbj/'; //using this url for testing
//var heritage_alliance_url = 'http://www.heritageall.org/'; //this is the real url but we cant use it for now
var response_data = '';
var calendar_data = '';
var events_for_date = '';
var calender_body = $('#calender-body');

//putting this here for now for testing purposes
var museums_button_div = $('#museums-buttons');
var chester_museum = $('#chester-btn');
var washington_museum = $('#washington-btn');
var museums_body = $('#museums-body');


window.onload = function(){
	//document.addEventListener('deviceready', init, false); //when device is ready then run init()
	init(); //faking it for now since i'm testing in a browser
}

var fake_data = { //this is fake data if you couldn't tell from the variable name
	name: 'Heritage Alliance',
	info: 'Here is some info about us.  This is very informative info.  Wow, what an information overload',
	date: 'today',
	random: 'here is some more random info'
}

var QueryBuilder = function(){ //i know dr. barrett loves comments so this one's for him
	this.build_query = function(info_type, info_item){
		var query_url = heritage_alliance_url + 'get_data.php?info_type=' + info_type + '&info_item=' + info_item;
		return query_url;
	};
	this.build_calender_query = function(){
		var query_url = heritage_alliance_url + 'get_cal_events.php';
		return query_url;
	};
}

var HeritageAllianceDatabase = function(){
	this.get_data = function(query_url){
		$.get(query_url, function(query_data){
			response_data = query_data;
		});
	};
	this.get_calendar_data = function(query_url){
		$.getJSON(query_url, function(query_data){
			calendar_data = query_data;
		});
	};
}

function init(){
	hadb = new HeritageAllianceDatabase();
	qb = new QueryBuilder();
	
	aboutus_btn.on("click", about_click);
	menu_aboutus.on("click", about_click);
	museums_btn.on("click", museums_click);
	menu_museums.on("click", museums_click);
	calender_btn.on("click", calender_click);
	menu_calender.on("click", calender_click);
	
	home_btn.on("click", home_click);
	chester_museum.on("click", chester_click);
	washington_museum.on("click", washington_click);
	
	about_click(); //calling the function in init fixes the double click bug
	get_calendar_events(); //fixing double click bug for this event also
}

function get_calendar_events(){
	var query_url = qb.build_calender_query();
	hadb.get_calendar_data(query_url);
}

function find_events_by_date(month, day, year){
	month = String(month);
	day = String(day);
	year = String(year);
	var date_to_find = year + "-" + month + "-" + day;
	var list_of_events = [];
	
	for(i=0;i<calendar_data.length;i++){
		var event_date = calendar_data[i]["start"].substring(0, 10);
		if(date_to_find === event_date){
			list_of_events.push(calendar_data[i]);
		}
	}
	
	return list_of_events;
}

function home_click(){
	museums_button_div.empty();
	museums_button_div.append(chester_museum);
	museums_button_div.append(washington_museum);
	chester_museum.on("click", chester_click);
	washington_museum.on("click", washington_click);
}

function about_click(){
	var about_body = $('#about-body');
	about_body.empty();
	var query_url = qb.build_query("about", "mission");
	hadb.get_data(query_url);
	about_body.append(response_data);
	response_data = '';
}

function chester_click(){
	museums_button_div.empty();
	museums_body.empty();
	museums_body.append(chester_text);
}

function washington_click(){
	museums_button_div.empty();
	museums_body.empty();
	museums_body.append(washington_text);
}

function museums_click(){
	museums_body.empty();
	//faking the ajax call here to get about text from db
	//var query_url = qb.build_query("museum_info", "main_text");
	//var museum_data = hadb.get_data(query_url);
}

function json_event_to_text(event){
	var text_event = '<b>';
	text_event += event["title"] + "</b><br />";
	text_event += "Event start: " + event["start"] + "<br />";
	text_event += "Event end: " + event["end"] + "<br />";
	text_event += "URL: " + event["url"] + "<br /><br />";
	return text_event;
}

function find_day_of_week(numeric_day){
	var text_day = '';
	switch (numeric_day){
		case 0:
			text_day = "Monday";
			break;
		case 1:
			text_day = "Tuesday";
			break;
		case 2:
			text_day = "Wednesday";
			break;
		case 3:
			text_day = "Thursday";
			break;
		case 4:
			text_day = "Friday";
			break;
		case 5:
			text_day = "Saturday";
			break;
		case 6:
			text_day = "Sunday";
			break;
	}
	return text_day;
}

//not sure about these functions
/*
var current = new Date(); //'Mar 11 2015' current.getTime() = 1426060964567
var followingDay = new Date(current.getTime() + 86400000); // + 1 day in ms
followingDay.toLocaleDateString();
*/
function get_next_date_events(relative_date){ //delete later
	calender_body.empty();
	
	var tomorrow = (relative_date.getDate() + 1);
}

function get_previous_date_events(relative_date){ //delete later
	calender_body.empty();
	
	var yesterday = (relative_date.getDate() - 1);
}

function get_event_date_object(date_increment){ //delete later
	var date = new Date();
	date = (date.getDate() + date_increment);
	return date;
}
//not sure about these functions

//i think there is a way to scroll through dates all in this 1 function
//just call it recursively and depending on the parameter is whether +1 or -1 or today
function calender_click(date_to_search){
	date_to_search = date_to_search || 0;
	calender_body.empty();
	
	var date = new Date();
	var month = (date.getMonth() + 1);
	var day = date.getDate();
	var year = date.getFullYear();
	var day_of_the_week = find_day_of_week(date.getDay());
	
	calender_body.append("<b>" + month + " / " + day + " / " + year + "  " + day_of_the_week + "</b><br />");
	
	get_calendar_events();
	var events = find_events_by_date(month, day, year);
	
	for(i=0;i<events.length;i++){
		calender_body.append(json_event_to_text(events[i]));
	}
	if(events.length === 0){
		calender_body.append("No events scheduled for this date.");
	}
}