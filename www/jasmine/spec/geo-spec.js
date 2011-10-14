describe("Geo Tests", function() {
         
         var geo;
         
         beforeEach(function() {
                    geo= new Geo()
                    });
         
         describe("When estimate walking time", function () {
                  it("should get an average walikg time in km by default", function() {
                     expect(geo.walkingTime(1)).toEqual(720);
                     expect(geo.walkingTime(0.005, "km")).toEqual(3.6);
                     });
                  
                  it("should get an average walikg time in miles by specified with m, miles, or mile", function() {
                     expect(geo.walkingTime(1,"m")).toEqual(1200);
                     expect(geo.walkingTime(0.005, "miles")).toEqual(6);
                     expect(geo.walkingTime(100, "mile")).toEqual(120000);
                     });
                  
                  it("should be roburst enough to process nigative distance as positive distance, unsuppoted unit and nonnumber as zero", function() {
                     expect(geo.walkingTime(-1)).toEqual(720);
                     expect(geo.walkingTime(1, "light year")).toEqual(0);
                     expect(geo.walkingTime("ten")).toEqual(0);
                     });
                  });
         });