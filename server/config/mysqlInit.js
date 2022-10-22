const mysql = require('mysql')
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    port: process.env.MYSQL_PORT || 3306,
    password: process.env.MYSQL_PASSWORD || "",
})

db.connect (function(err) {
    if (err) throw err;
    var sql = "CREATE TABLE location ( LocID int NOT NULL, LocName varchar(255) DEFAULT NULL, LocType varchar(255) DEFAULT NULL, LandingZone varchar(255) DEFAULT NULL, PRIMARY KEY (`LocID`))";
    con.query(sql);
});

db.connect (function(err) {
    if (err) throw err;
    var sql = "CREATE TABLE passenger (PassengerID int NOT NULL,PassportNum int NOT NULL,PassengerName varchar(255) DEFAULT NULL,PRIMARY KEY (`PassengerID`))";
    con.query(sql);
});

db.connect (function(err) {
    if (err) throw err;
    var sql = "CREATE TABLE spacecarrier (CarrierID int NOT NULL,CarrierName varchar(255) DEFAULT NULL,PRIMARY KEY (`CarrierID`))";
    con.query(sql);
});

db.connect (function(err) {
    if (err) throw err;
    var sql = "CREATE TABLE spaceship (ShipID int NOT NULL,Capacity int NOT NULL,Model varchar(255) DEFAULT NULL,PRIMARY KEY(`ShipID`))";
    con.query(sql);
});

db.connect (function(err) {
    if (err) throw err;
    var sql = "CREATE TABLE flight (FlightID int NOT NULL,DepartureTime int DEFAULT NULL,FlightClass varchar(255) DEFAULT NULL,FlightType varchar(255) DEFAULT NULL,DepartureLoc int DEFAULT NULL,Destination int DEFAULT NULL,SpaceShipID int DEFAULT NULL,CarrierID int DEFAULT NULL,TicketNum int DEFAULT NULL,PRIMARY KEY (`FlightID`),KEY DepartureLoc (`DepartureLoc`),KEY Destination (`Destination`),KEY SpaceShipID (`SpaceShipID`),KEY CarrierID (`CarrierID`),KEY TicketNum (`TicketNum`),CONSTRAINT flight_ibfk_1 FOREIGN KEY (`DepartureLoc`) REFERENCES location (`LocID`),CONSTRAINT flight_ibfk_2 FOREIGN KEY (`Destination`) REFERENCES location (LocID`),CONSTRAINT flight_ibfk_3 FOREIGN KEY (`SpaceShipID`) REFERENCES spaceship (`ShipID`),CONSTRAINT flight_ibfk_4 FOREIGN KEY (`CarrierID`) REFERENCES spacecarrier (`CarrierID`)CONSTRAINT flight_ibfk_5 FOREIGN KEY (`TicketNum`) REFERENCES ticket (`TicketNum`))";
    con.query(sql);
});

db.connect (function(err) {
    if (err) throw err;
    var sql = "CREATE TABLE ticket (TicketNum int NOT NULL,PassengerID int DEFAULT NULL,PRIMARY KEY (`TicketNum`),KEY PassengerID (`PassengerID`),KEY fk (`FlightID`),CONSTRAINT fk FOREIGN KEY (`FlightID`) REFERENCES flight (`FlightID`),CONSTRAINT ticket_ibfk_1 FOREIGN KEY (`PassengerID`) REFERENCES passenger (`PassengerID`))";
    con.query(sql);
});


