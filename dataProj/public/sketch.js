
  // const button = document.getElementById('submit');
  // button.addEventListener('click', async event => {
  let lat,lon;
if('geolocation' in navigator){
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    lat = position.coords.latitude;
    lon = position.coords.longitude
    document.getElementById('latitude').textContent = lat.toFixed(2);
    document.getElementById('longitude').textContent = lon.toFixed(2);
    // const apiKey = 'bd3aebe7893aee9885545c96d06c993e'
    const api_url = `weather/${lat},${lon}`;
    // const api_url = `/weather`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log("This is json: ", json)
    document.getElementById('summary').textContent = json.weather.current.weather[0].description;
    document.getElementById('temperature').textContent = json.weather.current.temp;
    console.log("is anything happening: ", json);

    // console.log("This is your position: ",position)
  });

  }else{
    console.log('geolocation not available');
  }

  const button = document.getElementById('submit');
  button.addEventListener('click', async event => {
    var emotion = document.getElementById('Emotion').value;

    const data = {lat,lon,emotion};
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
        const response = await fetch('/sending_data',options);
          // console.log("This is the response object: ",response);
          const json = await response.json();
          console.log("Printing data variable to console: ",json)



// });//end of position function



// }else{
//   console.log('geolocation not available');
// }

}); //end of button function
