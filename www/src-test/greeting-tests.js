GreeterTest = TestCase("GreeterTest");

GreeterTest.prototype.testGreet = function() {
  var greeter = new myapp.Greeter();
  assertEquals("Hello World!", greeter.greet("World"));
};

GreeterTest.prototype.testCheckConnection = function() {
    var greeter = new myapp.Greeter();
    assertEquals("Wi-Fi", greeter.checkConnection());
};
