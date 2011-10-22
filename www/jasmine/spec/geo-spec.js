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
                  
                  it("should be roburst enough to process negative distance as positive distance, unsuppoted unit and nonnumber as zero", function() {
                     expect(geo.walkingTime(-1)).toEqual(720);
                     expect(geo.walkingTime(1, "light year")).toEqual(0);
                     expect(geo.walkingTime("ten")).toEqual(0);
                     });
                  });
         describe("When calculating distance, using Google Map as reference for distance and allowed to have some small error", function () {
                  it("should get zero distance on the same coordinate", function () {
                     expect(geo.distance(41.93263, -87.656629,41.93263, -87.656629)).toEqual(0);
                     });
                  it("should return distance in km by default or specified with km", function () {
                     expect(Math.round(geo.distance(42.0426, -87.6749, 42.0412, -87.6822)*100)/100).toEqual(0.62);
                     expect(Math.round(geo.distance(42.0426, -87.6749, 42.0412, -87.6822, "km")*100)/100).toEqual(0.62);
                     expect(Math.round(geo.distance(42.0426, -87.6749, 42.0412, -87.6822, "kilometer")*100)/100).toEqual(0.62);
                     expect(Math.round(geo.distance(42.0426, -87.6749, 42.0412, -87.6822, "kilometers")*100)/100).toEqual(0.62);
                     });
                  it("should return distance in miles when specified with various format", function () {
                     expect(Math.round(geo.distance(42.0426, -87.6749, 42.0412, -87.6822, "m")*100)/100).toEqual(0.39);
                     expect(Math.round(geo.distance(42.0426, -87.6749, 42.0412, -87.6822, "mile")*100)/100).toEqual(0.39);
                     expect(Math.round(geo.distance(42.0426, -87.6749, 42.0412, -87.6822, "miles")*100)/100).toEqual(0.39);
                     });
                  it("should return 0 when given wrong parameters", function () {
                     expect(Math.round(geo.distance(42.0426, -87.6749, 42.0412, -87.6822, "blue")*100)/100).toEqual(0);
                     expect(Math.round(geo.distance(42.0426, -87.6749, 42.0412, "Hey")*100)/100).toEqual(0);
                     expect(Math.round(geo.distance("Up", -87.6749, 42.0412, -87.6822, "miles")*100)/100).toEqual(0);
                     });
                  });
         });