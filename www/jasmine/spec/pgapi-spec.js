describe("PhoneGap API Tests", function() {
         
         var pgAPI;
         
         beforeEach(function() {
                    pgAPI= new PGAPI();
                    });
         
         describe("When accessing PhoneGap API", function () {
                  if(window.navigator.onLine) {
                  it("Should be able to detect network", function(){
                     var connection = pgAPI.checkConnection();
                     expect(connection).not.toEqual("No Network");
                     //expect(connection).toEqual("No Network");
                     });
                  }
                  else{
                  var connection = pgAPI.checkConnection();
                  it("Should not be able to detect network",function(){
                     var connection = pgAPI.checkConnection();
                     expect(connection).toEqual("No Network");
                     });
                  }
                  
                  it("Should be able to get coordinate", function () {
                     pgAPI.getGeoLocation();
      				  waitsFor(function() {
                         return pgAPI.defaultCallback();
                         }, "get location never completed", 10000);
                     runs(function () {expect(pgAPI.asyncResult).not.toEqual(null)});
                  });
                  
                });
         });