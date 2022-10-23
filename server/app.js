const express = require('express');
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());
const db = require('./config/db');

db.query("SELECT * FROM passenger", (err, result) => {
    if (err) {
        console.log(err)
    }
    console.log(result)
});
//Gets ALL passengers
// Click this
// http://localhost:3002/api/passenger/getFromId/1
app.get("/api/passenger/getFromId/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM passenger WHERE PassengerID = ?", id,
        (err, result) => {
            //If theres an error with the query
            // Print it to the console
            if (err) {
                console.log(err)
            }
            // Sends the result of the query to the client
            res.send(result)
        });
});
 
//Get single location
app.get("/api/location/getLocFromId/:id",(req,res) =>{
    const id =req.params.id;
    db.query("SELECT * FROM location WHERE LocID = ?",id,
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});
//Get all location
app.get("/api/location/getAllLoc",(req,res) =>{
    db.query("SELECT * FROM location ",
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});
//Get single spacecarrier
app.get("/api/spacecarrier/getCarrieFromId/:id",(req,res) =>{
    const id = req.params.id
    db.query("SELECT * FROM spacecarrier WHERE CarrierID = ?",id,
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});
//Get all spacecarriers 
app.get("/api/spacecarrier/getAllCarriers",(req,res) =>{
    db.query("SELECT * FROM spacecarrier ",
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});
//Get single spaceship
app.get("/api/spaceship/getShipFromId/:id",(req,res) =>{
    const id = req.params.id
    db.query("SELECT * FROM spaceship WHERE ShipID = ?",id,
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});
//Get all spaceship 
app.get("/api/spaceship/getAllShips",(req,res) =>{
    db.query("SELECT * FROM spaceship ",
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});
//Get a single flight
app.get("/api/flight/getFlightFromId/:id",(req,res) =>{
    const id = req.params.id
    db.query("SELECT * FROM flight WHERE FlightID = ?",id,
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});
//Get all flights 
app.get("/api/flightp/getAllFlights",(req,res) =>{
    db.query("SELECT * FROM flight ",
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});
//Get single ticket
app.get("/api/ticket/getTicketFromId/:id",(req,res) =>{
    const id = req.params.id
    db.query("SELECT * FROM ticket WHERE TicketNum = ?",id,
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});
//Get all ticket 
app.get("/api/ticket/getAllTickets",(req,res) =>{
    db.query("SELECT * FROM spaceship ",
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});

//Create a ticket 
app.post("/api/ticket/create",(req,res)=>{
    const passengerID = req.body.passengerID
    const flightID = req.body.FlightID
    db.query("INSERT INTO ticket (PassengerId,FlightId) VALUES(?,?)",[passengerID,flightID],(err,result)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
    });
})
//Create a passenger 
app.post("/api/passenger/create",(req,res)=>{
    const passportNum = req.body.passportNum
    const passName = rey.body.passName
    db.query("INSERT INTO passenger ( PassportNum,PassengerName) VALUES(?,?)",[passportNum,passName],(err,result)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
    });
})
//Create a flight 
app.post("/api/flight/create",(req,res)=>{
    const deptTime = req.body.deptTime;
    const flightClass = req.body.flightClass;
    const flightType = req.body.flightType;
    const depLoc = req.body.depLoc;
    const dest = req.body.dest;
    const shipID = req.body.shipID;
    const carrierID = req.body.carrierID;
    db.query("INSERT INTO passenger (DepartureTime,FlightClass,FlightType,DepartureLoc,Destination,SpaceShipID,CarrierID,) VALUES(?,?,?,?,?,?,?)",[deptTime,flightClass,flightType,depLoc,dest,shipID,carrierID],(err,result)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
    });
})
app.delete('/api/ticket/cancle/:id',(req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM ticket WHERE id =?",id,(err,result)=>{
        if(err){console.log(err)}
    })
})
module.exports = app;