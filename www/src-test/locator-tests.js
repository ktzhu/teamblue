LocationTest = TestCase("LocationTest");

LocationTest.prototype.testChicago = function () {
	var loc = new myapp.Locator();
	// Coordinates for Chicago:
	var latitude = 41.881944;
	var longitude = -87.627778;
	assertEquals("Found you! " + latitude + ", " + longitude, loc.locate(latitude, longitude));
};