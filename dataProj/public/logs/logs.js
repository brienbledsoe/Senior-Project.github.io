const mymap = L.map('checkMap').setView([0,0], 1);//lattitude longitude 0,0
const attribution =  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileURL= 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, {attribution});
tiles.addTo(mymap);

getData()
async function getData(){
const response = await fetch('/sending_data');
const data = await response.json();

for(item of data){

  const marker = L.marker([item.lat, item.lon]).addTo(mymap);

  if(item.air === "Not available"){
    const text = `The weather at ${item.lat}&deg,
    ${item.lon}&deg; is ${item.weather.weather[0].description} With
    a temperature of ${item.weather.temp}&deg Fahrenheit.<br><br>
    There is no air quality reading for this location.`
    // return text;
    marker.bindPopup(text)
  }else{
    const text = `The weather at ${item.lat}&deg,
    ${item.lon}&deg; is ${item.weather.weather[0].description} With
    a temperature of ${item.weather.temp}&deg Fahrenheit.<br><br>
    The concentration of particulate matter(${item.air.parameter}) <br>
    is ${item.air.value} ${item.air.unit} last
    updated on ${item.air.lastUpdated}`
    // return text;
    marker.bindPopup(text)
  }
  // const text = `The weather at ${item.lat}&deg,
  // ${item.lon}&deg; is ${item.weather.weather[0].description} With
  // a temperature of ${item.weather.temp}&deg Fahrenheit.<br><br>
  // The concentration of particulate matter(${item.air.parameter}) <br>
  // is ${item.air.value} ${item.air.unit} last
  // updated on ${item.air.lastUpdated}`



  // marker.bindPopup(text) //function that is apart of leaflet.js where we can bind some text to a pop up


  // const root = document.createElement('p');
  // const emotion = document.createElement('p');
  // const geo = document.createElement('p');
  // const date = document.createElement('p');
  //
  // emotion.textContent = `emotion: ${item.emotion}`;
  // geo.textContent = `${item.lat}°, ${item.lon}°`;
  // const dateString = new Date(item.timestamp).toLocaleString();
  // //⬆️ gives date in local time zone
  // date.textContent = dateString;
  //
  // root.append(emotion,geo,date);
  // document.body.append(root);
}

console.log(data);

}
