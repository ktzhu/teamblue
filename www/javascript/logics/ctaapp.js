var cta = cta || {};

cta.BusStop = function (stpid, stpnm, lat, lon) {
	this.stpid = stpid;
	this.stpnm = stpnm;
	this.lat = lat;
	this.lon = lon;
} 

cta.Utilities = function () {};


cta.Utilities.prototype.dFindClosestBusStops = function (lat, lon, busStops, num) {
	this.lat = lat;
	this.lon = lon;
	if(!(busStops instanceof Array)){
		throw new Error("busStops is not an array.");
	}
	else if (isNaN(num) || num < 1){
		throw new Error("num should be a number, and it should be positive integer")
	}
	else{
		busStops.sort(this.compareBusStops);
		var a = [];
		for(var i=0; i<num; i=i+1){
			a[i] = busStops[i];
		}
		return a;
	}
  	
};

cta.Utilities.prototype.compareBusStops = function (b1, b2) {
  var lat = this.lat || 0;
  var lon = this.lat || 0;
  var geo = new Geo();
  var d1 = geo.distance(lat, lon, b1.lat, b1.lon);
  var d2 = geo.distance(lat, lon, b2.lat, b2.lon);
  return (d1 - d2);
}

