console.log("Irrigation JS Loaded");

async function analyzeIrrigation(){

    console.log("Analyze function started");
    let notify = document.getElementById("notify").value;
    let area = Number(document.getElementById("area").value.trim());
    let soil = document.getElementById("soil").value;
    let crop = document.getElementById("crop").value;

    // validation
    if(!area || area <= 0){
        alert("Please enter valid land area");
        return;
    }

    if(!soil || !crop){
        alert("Please fill all farm details");
        return;
    }

    let rain = Math.random() * 5; // fallback

    try {
        // ✅ get location
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log("Location:", lat, lon);

        // ✅ rainfall API (WORKING)
        let res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=rain`
        );

        let data = await res.json();

        // ✅ take average of first few hours instead of only index 0
const rainArray = data?.hourly?.rain || [];

if(rainArray.length > 0){
    const avgRain = rainArray.slice(0, 6).reduce((a,b)=>a+b,0) / 6;
    rain = avgRain || rain;
}
    } catch (err) {
        console.log("Using fallback rain");
    }

    console.log("Final Rain:", rain);

    // send to backend
    let response = await fetch("http://localhost:5000/analyze",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            area:area,
            soilType:soil,
            cropType:crop,
            rain:rain,
            email: localStorage.getItem("farmerEmail"),
            phone: localStorage.getItem("farmerPhone"),
            notify: notify
        })
    });

    let data = await response.json();
    // ✅ 7 day rainfall history
let history = [];

try {
  const histRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=rain_sum&past_days=7`
  );

  const histData = await histRes.json();
  history = histData?.daily?.rain_sum || [];
} catch(err){
  console.log("History fetch failed");
}

data.history = history; // ✅ attach history
localStorage.setItem("result",JSON.stringify(data));

    window.location = "output.html";
}