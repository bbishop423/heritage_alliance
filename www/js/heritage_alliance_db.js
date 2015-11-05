//main screen buttons
var menu_btn = $('#menu-btn');
var home_btn = $('#home-btn');
var aboutus_btn = $('#aboutus-btn');
var museums_btn = $('#museums-btn');
var exhibits_btn = $('#exhibits-btn');
var calender_btn = $('#calender-btn');
var contact_btn = $('#contact-btn');

//swipe menu buttons
var close_menu = $('#closemenu-btn');
var menu_aboutus = $('#menu-aboutus');
var menu_museums = $('#menu-museums');
var menu_exhibits = $('#menu-exhibits');
var menu_calender = $('#menu-calender');
var menu_contact = $('#menu-contact');

//global variables
var hadb; //database object
var qb; //query builder
var heritage_alliance_url = 'http://www.heritage-alliance.com/'; //yeah i know this isn't the right url
var xmlhttp; //ajax object


window.onload = function(){
	init();
}

var fake_data = { //this is fake data if you couldn't tell from the variable name
	name: 'Heritage Alliance',
	info: 'Here is some info about us.  This is very informative info.  Wow, what an information overload',
	date: 'today',
	random: 'here is some more random info'
}

var QueryBuilder = function(info_type, info_item){ //i know dr. barrett loves comments so this one's for him
	this.info_type = info_type;
	this.info_item = info_item;
	this.build_query = function(){
		var query_url = heritage_alliance_url + 'get_data.php?info_type=' + this.info_type + '&info_item=' + this.info_item;
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
	
	aboutus_btn.on("click", function(){console.log(fake_data);});
}
