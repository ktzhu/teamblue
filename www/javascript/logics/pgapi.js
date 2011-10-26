/*
 *
 */

PGAPI = function() { };

PGAPI.prototype.checkConnection = function() {
    var networkState = navigator.network.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI]     = 'WiFi';
    states[Connection.CELL_2G]  = '2G';
    states[Connection.CELL_3G]  = '3G';
    states[Connection.CELL_4G]  = '4G';
    states[Connection.NONE]     = 'No network';
    
    return states[networkState];
};
 
PGAPI.prototype.getGeoLocation = function (callback) {
	this.asyncResult = null;
	var self = this;
	callback = callback || this.defaultCallback;
    navigator.geolocation.getCurrentPosition(
    	function (position){
     		self.isLocationServiceAvailable = true;
     		callback(position, self);
        },
        function (error){
        	self.isLocationServiceAvailable = false;
        	callback(false, self);
        }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true});
};

PGAPI.prototype.watchCompassHeading = function (callback) {
	this.asyncResult = null;
	callback = callback || this.defaultCallback;
	var heading;
	var self = this;
	var options = { frequency: 1000 };  // Update every 3 seconds
	if(typeof navigator.compass === 'undefined' || navigator.platform == 'iPhone Simulator') {
		callback(false, self);
	}
	return navigator.compass.watchHeading(
		function (heading) {
			self.isCompassAvailable = true;
			callback(heading, self);
		}, 
		function () {
			self.isCompassAvailable = false;
			callback(false, self);
		}, 
		options);
};


PGAPI.prototype.defaultCallback = function(result, self){
	if (typeof result === 'undefined'){
        if(typeof this.asyncResult === 'undefined' || this.asyncResult == null){
            return false;
        }
        else {
            return true;
        }
    }
    else {
    	
        self.asyncResult = result;
        return true;  
    }
};
