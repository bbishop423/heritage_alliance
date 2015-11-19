//main screen buttons
var menu_btn = $('#menu-btn');
var home_btn = $('#home-btn');
var aboutus_btn = $('#aboutus-btn');
var museums_btn = $('#museums-btn');
var exhibits_btn = $('#exhibits-btn');
var calender_btn = $('#calendar-btn');
var contact_btn = $('#contact-btn');

//swipe menu buttons
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
	
	about_click(); //calling the function in init fixes the double click bug
	get_calendar_events();
}

function get_calendar_events(){
	var query_url = qb.build_calender_query();
	hadb.get_calendar_data(query_url);
	
	console.log(calendar_data);
	calendar_data = '';
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
	var button_div = $('#museums-buttons');
	button_div.empty();
}

function washington_click(){
	var button_div = $('#museums-buttons');
	button_div.empty();
}

function museums_click(){
	var museums_body = $('#museums-body');
	var chester_museum = $('#chester-btn');
	var washington_museum = $('#washington-btn');
	chester_museum.on("click", chester_click);
	washington_museum.on("click", washington_click);
	museums_body.empty();
	//faking the ajax call here to get about text from db
	//var query_url = qb.build_query("museum_info", "main_text");
	//var museum_data = hadb.get_data(query_url);
	museums_body.append(fake_data.info);
}

function calender_click(){
	var calender_body = $('#calender-body');
	calender_body.empty();
	
	//going to append links to check the calender for tomorrows date recursively
	//also going to append a link to go back to today's calender date
	var date = new Date();
	var month = date.getMonth();
	var day = date.getDate();
	var year = date.getFullYear();
	var day_of_the_week = date.getDay();
	
	calender_body.append(date);
	
	get_calendar_events();
}