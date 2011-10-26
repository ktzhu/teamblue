/*The purpose of this file is solely for testing the PhoneGap API
 *It may or may not related to the project.
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
	var pos;
	var self = this;
	callback = callback || this.defaultCallback;
    navigator.geolocation.getCurrentPosition(
    	function (position){
    		//console.log(position);
     		pos = position;
     		self.isLocationServiceAvailable = false;
     		callback(pos, self);
        },
        function (error){
        	callback(false, self);
        }, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true});
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
