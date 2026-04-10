require("dotenv").config();
const express = require("express")
const cors = require("cors")

const irrigation = require("./irrigationAlgorithm")
const db = require("./db");
const app = express()
require("./scheduler");
const sendSMS = require("./services/smsService");

    app.get("/test-sms", async (req, res) => {
      await sendSMS("+91XXXXXXXXXX", "Test SMS from irrigation system 🌱");
      res.send("SMS sent");
    });
    const sendEmail = require("./services/emailService");

    app.get("/test-email", async (req, res) => {
      await sendEmail(
        "receiver@gmail.com",
        "Test Email",
        "🌱 Irrigation system working successfully"
      );
    
      res.send("Email sent");
    });
app.use(cors())

app.use(express.json())
app.post("/analyze",(req,res)=>{

    const {area,soilType,cropType,rain,email,phone,notify} = req.body
    // ✅ FIX PHONE FORMAT
    const cleanPhone = phone ? phone.replace(/\s+/g, "") : "";

    const formattedPhone = cleanPhone.startsWith("+91")
      ? cleanPhone
      : "+91" + cleanPhone;
    
    console.log("Formatted Phone:", formattedPhone);
console.log("Phone from frontend:", phone);
console.log("Formatted Phone:", formattedPhone);
    
    const result = irrigation(area,soilType,cropType,rain || 0)
    
    result.rain = rain;
    db.query(
      `INSERT INTO farmers (email, phone, notify_type)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE
       phone = VALUES(phone),
       notify_type = VALUES(notify_type)`,
      [email, formattedPhone, notify || 'daily']  // ✅ FIXED
    );
    db.query(
    `INSERT INTO irrigation_results
    (land_area,soil_type,crop_type,water_amount,irrigation_time,rainfall)
    VALUES (?,?,?,?,?,?)`,
    [
      area,
      soilType,
      cropType,
      result.waterNeeded,
      result.irrigationTime,
      rain
      ]
    )
    
    res.json(result)
    
    })

    

app.get("/data",(req,res)=>{

  
    
    db.query("SELECT * FROM irrigation_results",(err,result)=>{
    
    if(err){
    res.json([])
    }
    else{
    res.json(result)
    }
    
    })
    
    })
    
      app.get("/history/:email",(req,res)=>{

        const email = req.params.email;
      
        db.query(
          `SELECT * FROM irrigation_results 
           ORDER BY id DESC LIMIT 5`,
          (err,result)=>{
            if(err) return res.json([]);
            res.json(result);
          }
        );
      
      });
      app.post("/feedback",(req,res)=>{
        const db = require("./db");
        const {message} = req.body;
      
        db.query(
          "INSERT INTO feedback (message) VALUES (?)",
          [message],
          (err)=>{
            if(err){
              console.log(err);
              return res.status(500).send("Error");
            }
            res.send("Feedback saved");
          }
        );
      });
      app.get("/feedback", (req, res) => {
        
        db.query("SELECT * FROM feedback ORDER BY id DESC", (err, result) => {
          if (err) {
            console.log(err);
            return res.status(500).json([]);
          }
          res.json(result);
        });
      });
app.listen(5000,()=>{

console.log("Server running on port 5000")

})