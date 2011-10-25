describe("CTA Tests", function() {
	
	describe("When getting data from DB", function () {
		var ctaDataAccess;
		
		beforeEach(function() {
			window.localStorage.removeItem('CTADatabaseVersion');
			ctaDataAccess = new cta.DataAccess();
		});
		
		it("should be able to create database and populate data", function() {
			expect(ctaDataAccess.isDBSupported).toEqual(true);
			expect(window.localStorage.getItem('CTADatabaseVersion')).toEqual(ctaDataAccess.dbVersion);
			expect(ctaDataAccess.isPopulated).toEqual(true);
			expect(ctaDataAccess.ctadb).not.toEqual(null);
			//console.log(ctaDataAccess.ctadb);
		});
             
             it("should be able to load bus stops data for a route", function() {
				// The #76 Diversey bus has 80 stops
                ctaDataAccess.loadBusStops(76);
                waitsFor(function() {
                         return ctaDataAccess.dbTransactionComplete();
                         }, "loadBusStops never completed", 10000);
                runs(function () {
                     expect(ctaDataAccess.transactionResults.length).toEqual(80);
                     });
                
                });
             it("should not get any bus stops when given non-exist route", function() {
                ctaDataAccess.loadBusStops("hell666");
                waitsFor(function() {
                         return ctaDataAccess.dbTransactionComplete();
                         }, "loadBusStops never completed", 10000);
                runs(function () {
                     expect(ctaDataAccess.transactionResults.length).toEqual(0);
                     });
                
                });
	});
         
         describe("When getting closest bus stops", function () {
         	
         	var ctaUtil;        
                  
         	beforeEach(function() {
                    ctaUtil = new cta.Utilities();
                    });
				
				  it("should get buses for this stop or empty array", function() {
						buses = ctaUtil.getPredictions([11046,11027]);
						expect(buses.length).not.toEqual(null);
					 });
				  
                  it("should get the closest bus stop", function() {
                  	 var stops = [
                  	 	new cta.BusStop("1", "One", 2, 1),
                  	 	new cta.BusStop("2", "two", 1, 1),
                  	 	new cta.BusStop("3", "three", 2, 1),
                  	 	new cta.BusStop("4", "four", 2, 2)
                  	 ];
                  	 var closest = stops[1];
                  	 var closeStop = ctaUtil.dFindClosestBusStops(0, 0, stops, 1); 
                     expect(closeStop[0]).toEqual(closest);
                     });
                     
                  it("should get the 5 closest bus stop", function() {
                  	 var stops = [
                  	 	new cta.BusStop("1", "one", 2, 1),
                  	 	new cta.BusStop("2", "two", 1, -1),
                  	 	new cta.BusStop("3", "three", -2, 7),
                  	 	new cta.BusStop("4", "four", 2, 9),
                  	 	new cta.BusStop("5", "five", 3, 2),
                  	 	new cta.BusStop("6", "six", 2, -5),
                  	 	new cta.BusStop("7", "seven", -2, -5),
                  	 	new cta.BusStop("8", "eight", 0, 0),
                  	 	new cta.BusStop("9", "nine", -2, -2),
                  	 	new cta.BusStop("10", "ten", 0, 10)
                  	 ];
                  	 var expectedStops = [
                  	 	stops[7],
                  	 	stops[1],
                  	 	stops[0],
                  	 	stops[8],
                  	 	stops[4]
                  	 ];
                  	 var closeStops = ctaUtil.dFindClosestBusStops(0, 0, stops, 5); 
                  	 var i = 0;
                     for(var bStop in closeStops){
                     	
                     	expect(closeStops[i]).toEqual(expectedStops[i]);
                     	i = i + 1;
                     }
                     expect(i).toEqual(5);
                     });
                        
                  
         });
      });