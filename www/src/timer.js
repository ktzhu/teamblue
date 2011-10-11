myapp = {};

myapp.Timer = function() { };
    
myapp.Timer.prototype.startTimer = function(interval) {
	var delay = interval*1000;
	setTimeout('alert("You just wasted " + interval + " seconds of your life")', interval);
};
