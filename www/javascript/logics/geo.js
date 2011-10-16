//myapp = {};

var Geo = function() { };

Geo.prototype.distance = function(x1, y1, x2, y2) {
	return Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) * 100) / 100;
};

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