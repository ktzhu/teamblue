/*The purpose of this file is solely for testing the PhoneGap API
 *It may or may not related to the project.
 */


PGAPITest = TestCase("PGAPITest");

PGAPITest.prototype.testCheckConnection = function() {
    var pgapi = new PGAPI();
    var connection = pgapi.checkConnection();
    if(window.navigator.onLine) {
        assertNotSame("Should be able to detect the network", "No network", connection);
    }
    else{
        assertSame("Should not be able to detect the network", "No network", connection);
    }
}