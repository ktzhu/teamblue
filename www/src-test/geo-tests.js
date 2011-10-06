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