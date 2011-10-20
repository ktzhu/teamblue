cta.DataAccess.prototype.populateDBRoutes = function () {
	
	try {
		console.log('populate');
        this.ctadb.transaction(
			function(transaction) {
				transaction.executeSql('DROP TABLE IF EXISTS route', [], this.nullDataHandler, this.errorHandler);
				transaction.executeSql('CREATE TABLE IF NOT EXISTS route(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL);', [], this.nullDataHandler, this.errorHandler); 

				routes = [[1,"Indiana-Hyde Park"],[2,"Hyde Park Express"],[3,"King Drive"],[4,"Cottage Grove - OWL"],[6,"Jackson Park Express"],[7,"Harrison"],[8,"Halsted"],[9,"Ashland - OWL"],[10,"Museum of Science &amp; Industry"],[11,"Lincoln/Sedgwick"],[12,"Roosevelt"],[14,"Jeffery Express"],[15,"Jeffery Local"],[17,"Westchester"],[18,"16th-18th"],[19,"United Center Express"],[20,"Madison - OWL"],[21,"Cermak"],[22,"Clark - OWL"],[24,"Wentworth"],[26,"South Shore Express"],[28,"Stony Island Local"],[29,"State"],[30,"South Chicago"],[33,"Mag Mile Express"],[34,"South Michigan - OWL"],[35,"35th"],[36,"Broadway"],[39,"Pershing"],[43,"43rd"],[44,"Wallace-Racine"],[47,"47th"],[48,"South Damen"],[49,"Western - OWL"],[50,"Damen"],[51,"51st"],[52,"Kedzie/California"],[53,"Pulaski - OWL"],[54,"Cicero"],[55,"Garfield - OWL"],[56,"Milwaukee"],[57,"Laramie"],[59,"59th/61st"],[60,"Blue Island/26th - OWL"],[62,"Archer - OWL"],[63,"63rd - OWL"],[64,"Foster-Canfield"],[65,"Grand"],[66,"Chicago - OWL"],[67,"67th-69th-71st"],[68,"Northwest Highway"],[69,"Cumberland/East River"],[70,"Division"],[71,"71st/South Shore"],[72,"North"],[73,"Armitage"],[74,"Fullerton"],[75,"74th-75th"],[76,"Diversey"],[77,"Belmont - OWL"],[78,"Montrose"],[79,"79th"],[80,"Irving Park"],[81,"Lawrence - OWL"],[82,"Kimball-Homan"],[84,"Peterson"],[85,"Central"],[86,"Narragansett/Ridgeland"],[87,"87th - OWL"],[88,"Higgins"],[90,"Harlem"],[91,"Austin"],[92,"Foster"],[93,"California/Dodge"],[94,"South California"],[96,"Lunt"],[97,"Skokie"],[100,"Jeffery Manor Express"],[103,"West 103rd"],[106,"East 103rd"],[108,"Halsted/95th"],[111,"Pullman/111th/115th"],[112,"Vincennes/111th"],[119,"Michigan/119th"],[120,"Ogilvie/Wacker Express"],[121,"Union/Wacker Express"],[122,"Illinois Center/Ogilvie Express"],[123,"Illinois Center/Union Express"],[124,"Navy Pier"],[125,"Water Tower Express"],[126,"Jackson"],[128,"Soldier Field Express"],[129,"West Loop/South Loop"],[130,"Museum Campus"],[132,"Goose Island Express"],[134,"Stockton/LaSalle Express"],[135,"Clarendon/LaSalle Express"],[136,"Sheridan/LaSalle Express"],[143,"Stockton/Michigan Express"],[144,"Marine/Michigan Express"],[145,"Wilson/Michigan Express"],[146,"Inner Drive/Michigan Exp."],[147,"Outer Drive Express"],[148,"Clarendon Michigan Express"],[151,"Sheridan - OWL"],[152,"Addison"],[154,"Wrigley Field Express"],[155,"Devon"],[156,"LaSalle"],[157,"Streeterville/Taylor"],[165,"West 65th"],[169,"69th-UPS Express"],[170,"U. of Chicago/Midway"],[171,"U. of Chicago/Hyde Park"],[172,"U. of Chicago/Kenwood"],[192,"U. of Chicago Hospitals Express"],[201,"Central/Ridge"],[205,"Chicago/Golf"],[206,"Evanston Circulator"]];

				for (i in routes) {
					transaction.executeSql('insert into route (id,name) VALUES (' + routes[i][0] + ', "' + routes[i][1] + '");', [], this.nullDataHandler, this.errorHandler);
				}

			}, 
			this.errorHandler);
	
		this.isPopulated = true;
		
	} catch(e) {
        console.log(e.message);
        return;
	}
};