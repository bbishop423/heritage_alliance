//we need to get the php scripts onto their server so this stuff can still work after i graduate in a couple weeks

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

var about_text = "<b>Mission</b><br />" +
"The Heritage Alliance is dedicated to the preservation of the architectural, historical, and cultural heritage of our region and to providing educational experiences related to history and heritage for a wide range of audiences.<br /><br />" +
"<b>Organizational History</b><br />" +
"Though the Heritage Alliance only began in 2001, it actually has a much longer history. The present organization resulted from a merger of three previously existing organizations, each of which was dedicated to different aspects of historic preservation and heritage education. These organizations were the Jonesborough Civic Trust, the Jonesborough/Washington County History Museum, and the Historic Jonesborough Foundation. Each of these organizations dates back to the 1970s. The present Heritage Alliance, with headquarters in the historic Duncan House in Jonesborough, maintains important aspects of each of these prior organizations while increasing efficiency and avoiding duplication of effort. Our expanded mission now recognizes the role we play, not only in Jonesborough and Washington County, but also in the wider region.<br /><br />" +
"<b>Our Philosophy of Preservation</b><br />" +
"The mission of the Heritage Alliance combines historic preservation with history education. We believe that blending these dimensions enables us to provide uniquely effective services to a wide range of public audiences, including adults and children, local citizens and tourists.<br />" +
"The Heritage Alliance is dedicated to advocating and providing technical support for the preservation of our region’s architecture, developing innovative museum experiences that bring history onto our public streets, and providing unique history education opportunities for both the people who live in our region and the people who visit it.<br />" +
"Our goal is to influence and encourage individuals, businesses, and local governments to actively participate in the nationwide movement to preserve, revitalize and appreciate the past that is part of the fabric of our everyday life.<br />";


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
var date_to_query;

//putting this here for now for testing purposes
var museums_button_div = $('#museums-buttons');
var chester_museum = $('#chester-btn');
var washington_museum = $('#washington-btn');
var museums_body = $('#museums-body');
var calendar_buttons_div = $("#calendar-buttons");
var next_day_button = $('#next-day-btn');
var prev_day_button = $('#prev-day-btn');


window.onload = function(){
	//document.addEventListener('deviceready', init, false); //when device is ready then run init()
	init(); //faking it for now since i'm testing in a browser
}

var QueryBuilder = function(){ //i know dr. barrett loves comments so this one's for him
	this.build_calender_query = function(){
		var query_url = heritage_alliance_url + 'get_cal_events.php';
		return query_url;
	};
}

var HeritageAllianceDatabase = function(){
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
	
	next_day_button.on("click", next_date_events);
	prev_day_button.on("click", previous_date_events);
	
	get_calendar_events(); //fixing double click bug for this event
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
	about_body.append(about_text);
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

function previous_date_events(){
	var previous_day = new Date(date_to_query.getTime() - 86400000);
	date_to_query = previous_day;
	display_event_info();
}

function next_date_events(){
	var next_day = new Date(date_to_query.getTime() + 86400000);
	date_to_query = next_day;
	display_event_info();
}

function get_todays_events(){
	var date = new Date();
	return date;
}

function calender_click(){
	date_to_query = get_todays_events();
	display_event_info();
}

function display_event_info(){
	calender_body.empty();
	
	var month = (date_to_query.getMonth() + 1);
	var day = date_to_query.getDate();
	var year = date_to_query.getFullYear();
	var day_of_the_week = find_day_of_week(date_to_query.getDay());
	
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