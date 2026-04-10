require("dotenv").config();
const mysql = require("mysql2");
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
//console.log("Connected DB:", process.env.DB_NAME);
//const db = mysql.createConnection({
//host:"localhost",
//user:"root",
//password:"123456",
//database:"irrigated_sys"
//});

db.connect(err=>{
if(err) {
console.log("Database Connection failed:",err);
}
else{
    console.log("mysql connected successfully")
}
});

module.exports=db;