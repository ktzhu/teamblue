var cta = cta || {};


/*
 * CTA Bus Stop
 */
cta.BusStop = function (stpid, stpnm, lat, lon) {
	this.stpid = stpid;
	this.stpnm = stpnm;
	this.lat = lat;
	this.lon = lon;
	this.distance = 0;
	this.predictTime = 0;
};

/*
 * CTA DOM
 * contains all functions for rendering html interface from data
 */
cta.DOM = function() {};

cta.DOM.prototype.renderBusStops = function(busStops){
	var html = '<ul data-role="listview" class="ui-listview">';
	for(var i=0; i<busStops.length; i++){
		html+= this.renderBusStopListItem(busStops[i]);
	}
	html = html + '</ui>';
	return html;
};

cta.DOM.prototype.renderBusStopListItem = function(busStop){
	var html = '<li data-theme="c" class="ui-btn ui-li ui-btn-up-c"><div class="ui-btn-inner ui-li"><div class="ui-btn-text">';
	html = html + '<a href="#" class="ui-link-inherit">';
	html = html + busStop.stpnm;
	html = html + " -&gt; " + busStop.distance + " mi";
	html = html +'</a></div></div></li>';
	return html;
};

/*
 * CTA Utilities Function
 * contains all of the function that is not belong to any other specific object
 */
cta.Utilities = function () {};


cta.Utilities.prototype.dFindClosestBusStops = function (lat, lon, busStops, num) {
	console.log('calculate distance');
	this.lat = lat;
	this.lon = lon;

	if(!(busStops instanceof Array)){
		throw new Error("busStops is not an array.");
	}
	else if (isNaN(num) || num < 1){
		throw new Error("num should be a number, and it should be positive integer")
	}
	else{
			
		var geo = new Geo();
		busStops.sort(function(a, b) {
			var d1 = geo.distance(lat, lon, a.lat, a.lon);
			var d2 = geo.distance(lat, lon, b.lat, b.lon);				  
			a.distance = d1;
			b.distance = d2;
			return (d1 - d2);
		});
		
		var a = [];
		for(var i=0; i<num; i=i+1){
			a[i] = busStops[i];
		}
		return a;
	}
  	
};

/*
cta.Utilities.prototype.compareBusStops = function (b1, b2) {
  var lat = this.lat || 0;
  var lon = this.lat || 0;
  var geo = new Geo();
  var d1 = geo.distance(lat, lon, b1.lat, b1.lon);
  var d2 = geo.distance(lat, lon, b2.lat, b2.lon);
  b1.distance = d1;
  b2.distance = d2;
  return (d1 - d2);
}
*/

/*
 * CTA Data Access
 * This class specifies the options for accessing data in databases or files
 */

cta.DataAccess = function () {
	this.isDBSupported = (window.openDatabase) ? true : false;
	this.dbVersion = '1.0';
	this.ctadb = this.initDB();
	storedDBVersion = window.localStorage.getItem("CTADatabaseVersion");
	//console.log('db: '+storedDBVersion);
	if(typeof storedDBVersion === 'undefined' || storedDBVersion == null){
		this.populateDB();
		window.localStorage.setItem("CTADatabaseVersion", this.dbVersion);
	}
	//this.populateDB();
};

cta.DataAccess.prototype.initDB = function () {
      try { 
        if (!window.openDatabase) { 
          console.log('DB is not supported'); 
        } else { 
          var shortName = 'ctadb'; 
          var version = this.dbVersion; 
          var displayName = 'CTA Bus Tracker Database'; 
          var maxSize = 65536; // in bytes 
          return window.openDatabase(shortName, version, displayName, maxSize); 
         }
      } catch(e) { 
        console.log(e);
        return; 
      } 
    };

/*
cta.DataAccess.prototype.populateDB = function () {

	 try {
 		console.log('populate');
        this.ctadb.transaction(
          function(transaction) {
          	transaction.executeSql('DROP TABLE IF EXISTS busstop', [], this.nullDataHandler, this.errorHandler);
            transaction.executeSql('CREATE TABLE IF NOT EXISTS busstop(stpid INTEGER NOT NULL PRIMARY KEY, stpnm TEXT NOT NULL DEFAULT "", lon REAL NOT NULL, lat REAL NOT NULL);', [], this.nullDataHandler, this.errorHandler); 
            
            transaction.executeSql('insert into busstop (stpid,stpnm,lon,lat) VALUES (1,"Diversey & Lavergne",41.9315617, -87.7513614);', [], this.nullDataHandler, this.errorHandler); 
            transaction.executeSql('insert into busstop (stpid,stpnm,lon,lat) VALUES (2,"Diversey & Mobile",41.930968, -87.783355);', [], this.nullDataHandler, this.errorHandler); 
            transaction.executeSql('insert into busstop (stpid,stpnm,lon,lat) VALUES (3,"Diversey & Lawndale",41.931917, -87.7193907);', [], this.nullDataHandler, this.errorHandler); 
            transaction.executeSql('insert into busstop (stpid,stpnm,lon,lat) VALUES (4,"Diversey & Lakewood",41.9325963, -87.6609542);', [], this.nullDataHandler, this.errorHandler); 
            transaction.executeSql('insert into busstop (stpid,stpnm,lon,lat) VALUES (5,"Diversey & Pine Grove",41.9328225, -87.6410552);', [], this.nullDataHandler, this.errorHandler); 
            transaction.executeSql('insert into busstop (stpid,stpnm,lon,lat) VALUES (6,"Diversey & Wolcott",41.9322599, -87.6758637);', [], this.nullDataHandler, this.errorHandler); 
            transaction.executeSql('insert into busstop (stpid,stpnm,lon,lat) VALUES (7,"Diversey & Newland",41.930869, -87.799051);', [], this.nullDataHandler, this.errorHandler); 
            transaction.executeSql('insert into busstop (stpid,stpnm,lon,lat) VALUES (8,"Diversey & Marmora",41.9312442, -87.773358);', [], this.nullDataHandler, this.errorHandler); 
            transaction.executeSql('insert into busstop (stpid,stpnm,lon,lat) VALUES (9,"Diversey & Natchez",41.930904, -87.788227);', [], this.nullDataHandler, this.errorHandler); 
            transaction.executeSql('insert into busstop (stpid,stpnm,lon,lat) VALUES (10,"Diversey & Neva Terminal",41.9310177, -87.8055732);', [], this.nullDataHandler, this.errorHandler); 
					   
          }, this.errorHandler);
         this.isPopulated = true;
 
      } catch(e) {
        console.log(e.message);
        return;
      }
};
*/

cta.DataAccess.prototype.loadBusStops = function(callback){
	console.log('start load');
	
	this.ctadb.transaction(
		function(transaction){
			console.log('exec');
			//transaction.executeSql('SELECT * FROM busstop',[],this.busStopDataHandler,this.errorHandler);
			transaction.executeSql('SELECT * FROM busstop;',[],
			function(transaction, results){
				console.log('get data');
				var busStops = [];
				for(var i=0; i<results.rows.length; i++){
					var row = results.rows.item(i);
					busStops[i] = new cta.BusStop(row['stpid'],row['stpnm'],row['lat'],row['lon']);
				}
				callback(busStops);
			},
			this.errorHandler);
		}, this.errorHandler);
};

cta.DataAccess.prototype.busStopDataHandler = function(transaction,results){
	console.log('get data');
	var busStops = [];
	for(var i=0; i<results.rows.length; i++){
		var row = results.rows.item(i);
		busStops[i] = new cta.BusStop(row['stpid'],row['stpnm'],row['lat'],row['lon']);
	}
	this.loadBusStopsCallback(busStops);
	this.loadBusStopsCallback = null;
};

// db error handler - prevents the rest of the transaction going ahead on failure
cta.DataAccess.prototype.errorHandler = function (error) { 
      // returns true to rollback the transaction
      console.log(error.message);
	return true;  
}; 
 
    // null db data handlers
cta.DataAccess.prototype.nullDataHandler = function (transaction, results) { console.log('null'); };
 