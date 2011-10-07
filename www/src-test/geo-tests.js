GeoTest = TestCase("GeoTest");

GeoTest.prototype.testSameCoords = function () {
	var geo = new Geo();
	assertEquals("Same coordinates should be zero.", 0, geo.distance(1, 1, 1, 1));
};

GeoTest.prototype.testSameCoords2 = function () {
	var geo = new Geo();
	assertEquals("Same coordinates should be zero.", 0, geo.distance(0, 0, 0, 0));
};

GeoTest.prototype.testDistance = function () {
	var geo = new Geo();
	assertEquals(5, geo.distance(1, 2, 4, 6));
}

GeoTest.prototype.testDistance2 = function () {
	var geo = new Geo();
	assertEquals(5.39, geo.distance(-4, -3, 1, -1));
}

GeoTest.prototype.testDistance3 = function () {
	var geo = new Geo();
	assertEquals(1, geo.distance(1, 2, 2, 2));
}

GeoTest.prototype.testWalkingTimeGivenMiles = function () {
    var geo = new Geo();
    assertEquals("Given 1 mile, average walking time should be 1200 seconds", 1200, geo.walkingTime(1, "mile"));
    assertEquals("Given 0.0005 miles, average walking time should be 0.6 seconds", 0.6, geo.walkingTime(0.0005, "miles"));
    assertEquals("Given 100 miles, average walking time should be 120000 seconds", 120000, geo.walkingTime(100, "m"));
}

GeoTest.prototype.testWalkingTime = function () {
    var geo = new Geo();
    assertEquals("Default distance unit should be km", 720, geo.walkingTime(1));
    assertEquals("Given 0.005 km, average walking time should be 720 seconds", 3.6, geo.walkingTime(0.005, "km"));
}

GeoTest.prototype.testWalkingTimeNegativeCase = function() {
    var geo = new Geo();
    assertEquals("No one can walk back in time", 2400, geo.walkingTime(-2, "m"));
    assertEquals("non-supported unit, should be zero", 0, geo.walkingTime(5, "feets"));
    assertEquals("non-number distance, should be zero", 0, geo.walkingTime("five"));
}
