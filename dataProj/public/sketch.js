
  // const button = document.getElementById('submit');
  // button.addEventListener('click', async event => {
  let lat,lon;
if('geolocation' in navigator){
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition(async position => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    document.getElementById('latitude').textContent = lat.toFixed(2);
    document.getElementById('longitude').textContent = lon.toFixed(2);
    // const apiKey = 'bd3aebe7893aee9885545c96d06c993e'
    const api_url = `weather/${lat},${lon}`;
    // const api_url = `/weather`;
    const response = await fetch(api_url);
    const json = await response.json();
    console.log("This is json: ", json)
    const air = json.air_quality.results[0] ? json.air_quality.results[0].measurements[0] : "Not available";
    // const air = json.air_quality.results[0].measurements[0];
    // console.log("Testing: ",air);

    // const air = json.air_quality.results[0] ? json.air_quality.results[0].measurements[0] :
  const weather = json.weather.current;
    hideInfo()
    function hideInfo() {
      if(air === "Not available"){
        console.log("inside first if")
        var x = document.getElementById("airQuality");
          x.style.display="none";

          document.getElementById("test").innerHTML = "There is no air quality measurement available for your region\
          at this time.";
      }

    }
    console.log("Testing: ",air);

    document.getElementById('summary').textContent = json.weather.current.weather[0].description;
    document.getElementById('temperature').textContent = json.weather.current.temp;
    document.getElementById('aq_parameter').textContent = air.parameter ? air.parameter : "Not available";

    // document.getElementById('aq_parameter').textContent = air.parameter;
    document.getElementById('aq_value').textContent = air.value ? air.value: "Not available";
    document.getElementById('aq_units').textContent = air.unit ? air.unit: "Not available";
    document.getElementById('aq_date').textContent = air.lastUpdated ? air.lastUpdated : "Not available";
    console.log("is anything happening: ", json);

    console.log("This is your position: ",position)

    var emotion = document.getElementById('Emotion').value;

    const data = {lat,lon,weather,air};
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
        const db_response = await fetch('/sending_data',options);
          // console.log("This is the response object: ",response);
          const db_json = await db_response.json();
          console.log("Printing db_json variable to console: ",db_json)

  }); //end of position function

  }else{
    console.log('geolocation not available');
  }

  const button = document.getElementById('submit');
  button.addEventListener('click', async event => {
    var emotion = document.getElementById('Emotion').value;

    const data = {emotion};
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }
        const button_response = await fetch('/sending_data',options);
          // console.log("This is the response object: ",response);
          const button_json = await button_response.json();
          console.log("Printing data variable to console: ",button_json)



}); //end of button function
