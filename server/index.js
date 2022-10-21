require('dotenv').config()


console.log("SERVER BEEP BOOP RUNNNING");


const app = require('./app');
const PORT = 3002;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})