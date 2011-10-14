TimerTest = TestCase("TimerTest");

TimerTest.prototype.testCountdown = function() {
  var timer = new myapp.Timer();
  var start = new Date().getTime();
  timer.startTimer(10);
  var end = new Date().getTime();
  var functiontime = end - start;
	assertTrue(functiontime < 10);
};