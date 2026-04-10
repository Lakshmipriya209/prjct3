async function loadDashboard() {

    const res = await fetch("http://127.0.0.1:5000/data");
    const data = await res.json();
    console.log("DATA API:", data);
    console.log("Rendering table...");
    
    let html = "";
  
    data.forEach(row => {
      html += `
        <tr>
          <td>${row.id}</td>
          <td>${row.land_area}</td>
          <td>${row.crop_type}</td>
          <td>${row.water_amount}</td>
          <td>${row.irrigation_time}</td>
          <td>${Number(row.rainfall || 0).toFixed(2)} mm</td>

        </tr>
      `;
    });
    console.log("Generated HTML:", html);
    document.getElementById("data").innerHTML = html;
  
    // farmer count
    document.getElementById("farmerCount").innerText = data.length;
    
// ✅ Analytics (MUST be inside function)
let totalWater = 0;
let totalRain = 0;

data.forEach(row => {
  totalWater += Number(row.water_amount || 0);
  totalRain += Number(row.rainfall || 0);
});

// total water (optional UI)
if(document.getElementById("totalWater")){
  document.getElementById("totalWater").innerText = totalWater.toFixed(2);
}

// water saved
let saved = (data.length * 200) - totalWater;
document.getElementById("waterSaved").innerText = saved.toFixed(2);

// average rainfall
document.getElementById("avgRain").innerText =
  (data.length ? (totalRain / data.length) : 0).toFixed(2);
}


  
  async function loadFeedback() {
  
    try {
      const res = await fetch("http://127.0.0.1:5000/feedback")
      if (!res.ok) {
        throw new Error("API not found");
      }
      const data = await res.json();
      console.log("Feedback API:", data);
      let html = "";
  
      data.forEach(f => {
        const msg = f.message || f.feedback || f.text || "No message";
      
        html += `<div style="background:#fff;padding:10px;margin:10px;border-radius:5px">
      💬 ${msg}
      </div>`;
      });
  
      document.getElementById("feedbackList").innerHTML = html;
  
    } catch(err){
      console.log("Feedback error:", err);
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    console.log("PAGE LOADED ✅");
    loadDashboard();
    loadFeedback();
  });
 