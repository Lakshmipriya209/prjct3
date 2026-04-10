function calculateIrrigation(area,soilType,cropType,rain){

    let CWR=5;
    let SRR=2;
    let RF=rain||0;
    let efficiency=0.8;
    let threshold=2;
    
    if(cropType==="Wheat") CWR=4;
    if(cropType==="Maize") CWR=3;
    
    if(soilType==="Sandy") SRR=1;
    if(soilType==="Clay") SRR=2;
    
    let waterNeeded;
    
    if(RF>threshold){
      waterNeeded=((CWR*area)-(SRR*RF*5))/efficiency*0.7;
    }
    else{
      waterNeeded=((CWR*area)-(SRR*RF*5))/efficiency;
    }

    // ✅ avoid negative
    if(waterNeeded < 0){
      waterNeeded = 0;
    }

    let pumpRate = 20;
    let irrigationMinutes = waterNeeded / pumpRate;

    let irrigationTime = irrigationMinutes.toFixed(2) + " minutes";

    let decision = RF > threshold 
  ? "❌ No irrigation needed (Rain sufficient)"
  : "✅ Irrigation required";

return {
    waterNeeded: Number(waterNeeded.toFixed(2)),
    irrigationTime: irrigationTime,
    decision: decision   // ✅ NEW
};
}

module.exports = calculateIrrigation;