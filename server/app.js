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
// http://localhost:3002/api/passenger/1
app.get("/api/passenger/:id", (req, res) => {
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

app.get("/api/passenger/passport/:num", (req, res) => {
    const num = req.params.num;
    db.query("SELECT * FROM passenger WHERE passportNum = ?", num,
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

app.get("/api/passenger", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM passenger",
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
app.get("/api/location/:id",(req,res) =>{
    const id =req.params.id;
    db.query("SELECT * FROM location WHERE LocID = ?",id,
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});

//Get single location by name
app.get("/api/location/name/:name",(req,res) =>{
    const name =req.params.name;
    db.query("SELECT * FROM location WHERE LocName = ?", name,
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});

//Get all location
app.get("/api/location/",(req,res) =>{
    db.query("SELECT * FROM location ",
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});
//Get single spacecarrier
app.get("/api/spacecarrier/:id",(req,res) =>{
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
app.get("/api/spacecarrier",(req,res) =>{
    db.query("SELECT * FROM spacecarrier ",
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});
//Get single spaceship
app.get("/api/spaceship/:id",(req,res) =>{
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
app.get("/api/spaceship",(req,res) =>{
    db.query("SELECT * FROM spaceship ",
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});
//Get a single flight
app.get("/api/flight/:id",(req,res) =>{
    const id = req.params.id
    db.query("SELECT * FROM flight WHERE FlightID = ?",id,
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});

//Get a single flight by details
app.get("/api/flight/:date/:deptid/:destid/:shipid/:carrid",(req,res) =>{
    const date = req.params.date
    const deptid = req.params.deptid
    const destid = req.params.destid
    const shipid = req.params.shipid
    const carr = req.params.carrid
    db.query(`SELECT * FROM flight 
    WHERE DepartureTime = ?
    AND DepartureLoc = ?
    AND Destination = ?
    AND SpaceShipID = ?
    AND CarrierID = ?`,[date, deptid, destid, shipid, carr],
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});
//Get all flights 
app.get("/api/flight",(req,res) =>{
    db.query("SELECT * FROM flight ",
    (err,result) => {
        if (err){
            console.log(err)
        }
        res.send(result)
    });
});

//Get single ticket
app.get("/api/ticket/:id",(req,res) =>{
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
app.get("/api/ticket",(req,res) =>{
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
    const flightClass = req.body.flightClass;
    const flightType = req.body.flightType;
    db.query("INSERT INTO ticket (PassengerId,FlightId,FlightClass,FlightType) VALUES(?,?)",[passengerID,flightID,flightClass,flightType],(err,result)=>{
        if(err){
            console.log(err)
        }
        return {
            id: result.insertId
        }
    });
})
//Create a passenger 
app.post("/api/passenger/create",(req,res)=>{
    const passportNum = req.body.passportNum
    const passName = req.body.passName
    db.query("INSERT INTO passenger (PassportNum, PassengerName) VALUES(?,?)",[passportNum,passName],(err,result)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
        res.send({
            name: passName,
            passport: passportNum,
            id: result.insertId
        })
    });
})
//Create a flight 
app.post("/api/flight/create",(req,res)=>{
    const deptTime = req.body.deptTime;
    const depLoc = req.body.depLoc;
    const dest = req.body.dest;
    const shipID = req.body.shipID;
    const carrierID = req.body.carrierID;
    db.query("INSERT INTO passenger (DepartureTime,DepartureLoc,Destination,SpaceShipID,CarrierID,) VALUES(?,?,?,?,?,?,?)",[deptTime,depLoc,dest,shipID,carrierID],(err,result)=>{
        if(err){
            console.log(err)
        }
        console.log(result)
        return {
            id: result.insertId
        }
    });
})
app.delete('/api/ticket/cancel/:id',(req,res)=>{
    const id = req.params.id;
    db.query("DELETE FROM ticket WHERE id =?",id,(err,result)=>{
        if(err){console.log(err)}
    })
})
module.exports = app;