//myapp = {};

var Geo = function() { };
/*
Geo.prototype.distance = function(x1, y1, x2, y2) {
	return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) * 10000) / 10000;
};
*/

Geo.prototype.distance = function(lat1, lon1, lat2, lon2, unit) {
    //console.log(lat1 +" "+ lon1);
    //console.log(lat2 +" "+ lon2);
    
    try{
    var R = 6371; // Radius of the earth in km
    if(unit == "m" || unit == "miles" || unit == "mile"){
        R = 3958.7558657440545;
    }
        var dLat = this.toRad(lat2-lat1);
        var dLon = this.toRad(lon2-lon1); 
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }
    catch(e)
    {
        console.log(e.message);
    }
    return d;
}

Geo.prototype.toRad = function (value){
    return value * Math.PI / 180;
}

//caculate walking time of a person given distance
//average person walks 3 miles per hour or 5 km per hour
Geo.prototype.walkingTime = function(d) {
    var unit = arguments[1] || "km";
    if(isNaN(d)){
       return 0;
    }
    if(unit == "m" || unit == "miles" || unit == "mile"){
       return Math.abs(d)*1200;
    }
    else if (unit == "km" || unit == "kilometers" || unit == "kilometer"){
       return Math.abs(d)*720;
    }
    else {
        return 0;
    }
};