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
var heritage_alliance_url = 'http://www.heritageall.org/'; //i know we still dont have server side ajax on here
var xmlhttp; //ajax object


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
	this.build_calender_query = function(month, date, year, day_of_the_week){
		var query_url = heritage_alliance_url + 'get_calender_event.php?month=' + month + '&date=' + date +
		'&year=' + year + '&day=' + day_of_the_week;
		return query_url;
	};
}

var HeritageAllianceDatabase = function(){
	this.get_data = function(query_url){
		$.getJSON(query_url, function(query_data){
			return query_data;
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
}

function about_click(){
	var about_body = $('#about-body');
	about_body.empty();
	//faking the ajax call here to get about text from db
	//var query_url = qb.build_query("about_info", "main_text");
	//var about_data = hadb.get_data(query_url);
	about_body.append(fake_data.info);
}

function museums_click(){
	var museums_body = $('#museums-body');
	museums_body.empty();
	//faking the ajax call here to get about text from db
	//var query_url = qb.build_query("museum_info", "main_text");
	//var museum_data = hadb.get_data(query_url);
	museums_body.append(fake_data.info);
}

function calender_click(){
	var calender_body = $('#calender-body');
	calender_body.empty();
	
	var date = new Date();
	var month = date.getMonth();
	var day = date.getDate();
	var year = date.getFullYear();
	var day_of_the_week = date.getDay();
	
	//faking the ajax call here to get about text from db
	//var query_url = qb.build_calender_query(month, day, year, day_of_the_week);
	//var calender_data = hadb.get_data(query_url);
	calender_body.append(date);
}