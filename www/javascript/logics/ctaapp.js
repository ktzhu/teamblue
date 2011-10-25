var cta = cta || {};


/*
 * CTA Bus Stop
 */
cta.BusStop = function (stpid, stpnm, lat, lon, routes) {
	this.stpid = stpid;
	this.stpnm = stpnm;
	this.lat = lat;
	this.lon = lon;
	this.distance = 0;
	this.predictTime = 0;
	this.routes = new Array();
	for (i in routes) {
		this.routes.push(parseInt(routes[i]));
	}
};

cta.Route = function(id, name) {
	this.id = id;
	this.name = name;
	
	this.renderListItem = function() {
		var html = "<li class=\"ui-btn ui-btn-icn-right ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-down-c ui-btn-up-c\" data-theme=\"c\">";
		html += "<div class=\"ui-btn-inner ui-li\">";
		html += "<div class=\"ui-btn-text\">";
		html += "<a onClick=\"loadStops('" + this.name + "', " + this.id + ");\" href=\"#routeView\" class=\"ui-link-inherit\">";
		html += "<h3 class=\"ui-li-heading\">" + this.id + " " + this.name + "</h3>";
		html += "</a></div><span class=\"ui-icon ui-icon-arrow-r ui-icon-shadow\"></span></div></li>";
		return html;
	}
};

cta.Bus = function (tmstmp, prdtm, rt, rtdir) {
	this.tmstmp = tmstmp;
	this.prdtm = prdtm;
	this.rt = rt;
	this.rtdir = rtdir;
};

/*
 * CTA DOM
 * contains all functions for rendering html interface from data
 */
cta.DOM = function() {};

cta.DOM.prototype.renderRoutes = function(routes) {
	var html = '';
	for (i in routes) {
		html += routes[i].renderListItem();
	}
	return html;
};


cta.DOM.prototype.renderBusStops = function(busStops){
	var html = '<ul data-role="listview" class="ui-listview">';
	for(var i=0; i<busStops.length; i++){
		html+= this.renderBusStopListItem(busStops[i]);
	}
	html = html + '</ui>';
	return html;
};

cta.DOM.prototype.renderBusStopListItem = function(busStop){
	var html = '<li data-theme="c" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-down-c ui-btn-up-c">';
	html += '<div class="ui-btn-inner ui-li" aria-hidden="true">';
	html += '<div class="ui-btn-text">';
	html += '<a onClick="initStopView(\'' + busStop.stpnm + '\');" href="#stopView" class="ui-link-inherit">';
	html += '<h3 class="ui-li-heading">' + busStop.stpnm + '</h3>';
	html += '<p class="ui-li-desc">' + Math.round(busStop.distance * 100) / 100 + ' mi</p>';
	html += '</a></div>';
	html += '<span class="ui-icon ui-icon-arrow-r ui-icon-shadow"></span>';
	html += '</div></li>';
	return html;
};

/*
 * CTA Utilities Function
 * contains all of the function that is not belong to any other specific object
 */
cta.Utilities = function () {};


cta.Utilities.prototype.dFindClosestBusStops = function (lat, lon, busStops, num) {
	//console.log('calculate distance');
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
                     // console.log(a.lat+" "+ a.lon);
			var d1 = geo.distance(lat, lon, a.lat, a.lon, "mile");
			var d2 = geo.distance(lat, lon, b.lat, b.lon, "mile");				  
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

cta.Utilities.prototype.getPredictions = function (stopIds) {
	
	url = 'http://www.ctabustracker.com/bustime/api/v1/getpredictions?key=XGSGa2wZ2ybnqmjXPJ55AA4DX&stpid=' + stopIds.join(',');
	
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", url, false);
	xmlhttp.send();
	xmlDoc = xmlhttp.responseXML;
	
	var prdElements = xmlDoc.getElementsByTagName('prd');
	var tmstmpElements = xmlDoc.getElementsByTagName('tmstmp');
	var prdtmElements = xmlDoc.getElementsByTagName('prdtm');
	var rtdirElements = xmlDoc.getElementsByTagName('rtdir');
	var rtElements = xmlDoc.getElementsByTagName('rt');
	
	var buses = new Array();
	for (var i = 0; i < prdElements.length; i++) {
		buses.push(new cta.Bus(tmstmpElements[i].childNodes[0].nodeValue, prdtmElements[i].childNodes[0].nodeValue, rtdirElements[i].childNodes[0].nodeValue, rtElements[i].childNodes[0].nodeValue));
	}
	
	return buses;
}

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


cta.DataAccess.prototype.populateDB = function () {

	 try {
         this.populateDBRoutes();
         this.populateDBStops();
         console.log('populated');
         this.isPopulated = true;
 
      } catch(e) {
        console.log(e.message);
        return;
      }
};


cta.DataAccess.prototype.loadRoutes = function(callback) {
        this.ctadb.transaction(
		function(transaction) {
			transaction.executeSql('SELECT * FROM route;', [], function(transaction, results) {
												  
				var routes = new Array();
				for(var i = 0; i < results.rows.length; i++) {
					routes.push(new cta.Route(results.rows.item(i)['id'], results.rows.item(i)['name']));
				}
				callback(routes);
					
			},
			this.errorHandler);
		},
		this.errorHandler);
};

cta.DataAccess.prototype.loadBusStops = function(route, callback){
    callback = callback || this.dbTransactionComplete;
    var self = this;
	this.ctadb.transaction(
		function(transaction){
			//console.log('exec');
			//transaction.executeSql('SELECT * FROM busstop',[],this.busStopDataHandler,this.errorHandler);
			transaction.executeSql('SELECT * FROM busstop;',[],
			function(transaction, results){
				//console.log('get data');
				var busStops = [];
				for(var i=0; i<results.rows.length; i++){
					var row = results.rows.item(i);
					newStop = new cta.BusStop(row['stpid'],row['stpnm'],row['lat'],row['lon'],row['routes'].split('|'));
					if ($.inArray(route, newStop.routes) != -1) {
					   busStops.push(newStop);
					}
                }
                                   console.log(busStops);
                callback(busStops, self);
            },
            function (error) {
                callback([], self);
            });
		}, this.errorHandler);
};

//Default call back, do nothing but return true
cta.DataAccess.prototype.dbTransactionComplete = function (trResults, self) {
    //console.log(trResults);
    
    if (typeof trResults === 'undefined'){
        if(typeof this.transactionResults === 'undefined'){
            return false;
        }
        else {
            return true;
        }
    }
    else {
        self.transactionResults = trResults;
        return true;  
    }
};

// db error handler - prevents the rest of the transaction going ahead on failure
cta.DataAccess.prototype.errorHandler = function (error) { 
      // returns true to rollback the transaction
	console.log(error.message);
	return true;  
}; 
 
    // null db data handlers
cta.DataAccess.prototype.nullDataHandler = function (transaction, results) { console.log('null'); };
 