const mysql = require('mysql')
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    port: process.env.MYSQL_PORT || 3306,
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "database" 
})

module.exports = db;