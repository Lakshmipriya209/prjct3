let result = JSON.parse(localStorage.getItem("result"))
if(!result){
    alert("No data found. Please analyze again.");
    window.location="farmerInput.html";
    }
document.getElementById("water").innerHTML =
"Water Required : " + result.waterNeeded + " Liters"

document.getElementById("time").innerHTML =
"Irrigation Time : " + result.irrigationTime

document.getElementById("rain").innerHTML =
"Rainfall : " + (result.rain || 0).toFixed(2) + " mm";

document.getElementById("decision").innerHTML =
"Decision : " + (result.decision || "");

const ctx = document.getElementById("chart")

new Chart(ctx,{

type:'pie',

data:{

labels:["Water Used","Water Saved"],

datasets:[{

    data:[Number(result.waterNeeded),200-Number(result.waterNeeded)],
backgroundColor:[
"#4CAF50",
"#2196F3"
]

}]

},options:{
    responsive:true,
    maintainAspectRatio:false
}

})
// ✅ Rainfall History Chart
if(result.history){
    const ctx2 = document.createElement("canvas");
    document.body.appendChild(ctx2);
  
    new Chart(ctx2,{
      type:'line',
      data:{
        labels:["Day1","Day2","Day3","Day4","Day5","Day6","Day7"],
        datasets:[{
          label:"Rainfall History",
          data: result.history
        }]
      }
    });
  }
  // ✅ load history
fetch("http://localhost:5000/history/" + localStorage.getItem("farmerEmail"))
.then(res => res.json())
.then(data => {
  let html = "";
  data.forEach(r=>{
    html += `<p>${r.water_amount}L - ${r.irrigation_time}</p>`;
  });
  document.getElementById("history").innerHTML = html;
});