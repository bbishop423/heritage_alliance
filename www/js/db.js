// http://brian.io/lawnchair/api/

//defining the db with the db name and description of records stored here
var db = new Lawnchair({name: 'test_db', record: 'test_record'}, function(){

	//saving a json document to the db with callback for action
	this.save({key: 'test_key', col1: 'val1', col2: 'val2'}, function(obj){
		console.log(obj)
	})
	
	//saving a json document to the db with string param defining action
	this.save({key: 'test2', col1: 'val234', col2: 'valww22'}, 'console.log(test_record)')
	
	//retrieving document from db
	this.get('test_key',function(x){
		console.log(x)
	})

	//retrieving all data from db with string param defining action
	this.all('console.log(test_db)')
	
	//x is true if object exists in the db
	this.exists('test_key', function(x){
		console.log(x)
	})
	
	//removing an item from the db with callback defining post-deletion action
	this.remove('test_key', function(){
		this.all('console.log(test_db.length)') //verifying the deletion occurred
	})
	
	//x is false if object does not exist in db
	this.exists('test_key', function(x){
		console.log(x)
	})
	
	//destroys db and all data
	this.nuke()
	
	//just a test to verify everything is gone
	this.all('console.log(test_db)')
	
});

//just printing out what the db looks like in console out of curiosity
console.log(db);

/*
Lawnchair API Quick Reference Guide Begin
-----------------------------------------------------------------------------------

// returns all the keys in the store
keys(callback)

// save an object
save(obj, callback)

// batch save array of objs
batch(array, callback)

// retrieve obj (or array of objs) and apply callback to each
get(key|array, callback)

// check if exists in the collection passing boolean to callback
exists(key, callback)

// iterate collection passing: obj, index to callback
each(callback)

// returns all the objs to the callback as an array
all(callback)

// remove a doc or collection of em
remove(key|array, callback)

// destroy everything
nuke(callback)

-----------------------------------------------------------------------------------
Lawnchair API Quick Reference Guide End
*/