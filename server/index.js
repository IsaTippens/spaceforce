require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

console.log("SERVER BEEP BOOP RUNNNING");

const db = require('./db');
db.query("SELECT * FROM passenger", (err, result) => {
    if (err) {
        console.log(err)
    }
    console.log(result)
});

// Click this
// http://localhost:3002/api/passenger/getFromId/1
app.get("/api/passenger/getFromId/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM passenger WHERE id = ?", id,
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

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})