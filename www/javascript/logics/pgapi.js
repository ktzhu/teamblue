/*The purpose of this file is solely for testing the PhoneGap API
 *It may or may not related to the project.
 */

PGAPI = function() { };

PGAPI.prototype.checkConnection = function() {
    var networkState = navigator.network.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown';
    states[Connection.ETHERNET] = 'Ethernet';
    states[Connection.WIFI]     = 'WiFi';
    states[Connection.CELL_2G]  = '2G';
    states[Connection.CELL_3G]  = '3G';
    states[Connection.CELL_4G]  = '4G';
    states[Connection.NONE]     = 'No network';
    
    return states[networkState];
};
