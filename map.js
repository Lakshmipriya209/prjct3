var map = L.map('map').setView([10.79,78.70],13)

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map)

let marker

map.on('click',function(e){

let lat = e.latlng.lat
let lng = e.latlng.lng

document.getElementById("lat").value = lat
document.getElementById("lng").value = lng

localStorage.setItem("lat",lat)
localStorage.setItem("lon",lng)

if(marker){
map.removeLayer(marker)
}

marker = L.marker([lat,lng]).addTo(map)

fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)

.then(res=>res.json())

.then(data=>{

if(data.address.state_district){

document.getElementById("district").value =
data.address.state_district

}

})

})
navigator.geolocation.getCurrentPosition(pos=>{
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
  
    map.setView([lat, lon], 10);
  
    //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
    L.marker([lat, lon]).addTo(map)
      .bindPopup("Your Farm Location 🌱")
      .openPopup();
  });