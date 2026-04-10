const express=require("express")
const router=express.Router()

const irrigation=require("../irrigationAlgorithm")

router.post("/analyze",(req,res)=>{

const {area,soilType,cropType}=req.body

/* simple rainfall prediction */

let rain=Math.floor(Math.random()*5)

/* run algorithm */

let result=irrigation(area,soilType,cropType,rain)

/* send response */

res.json({
rainfall: rain + " mm",
waterNeeded: result.waterNeeded,
irrigationTime: result.irrigationTime
})

})
router.get("/weather", async (req, res) => {
    const { lat, lon } = req.query;
  
    try {
      // Dummy rainfall logic (replace with API if needed)
      const rainfall = Math.random() * 10;
  
      res.json({ rainfall });
    } catch (err) {
      res.status(500).json({ error: "Weather fetch failed" });
    }
  });
// Save feedback
router.post("/feedback", (req, res) => {
    const { message } = req.body;
  
    db.query("INSERT INTO feedback (message) VALUES (?)", [message], (err) => {
      if (err) return res.status(500).send(err);
      res.send("Feedback saved");
    });
  });
  
  // Get feedback (Admin)
  router.get("/feedback", (req, res) => {
    db.query("SELECT * FROM feedback", (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  });
  router.get("/irrigation", (req, res) => {
    db.query("SELECT * FROM irrigation_results", (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  });
module.exports=router