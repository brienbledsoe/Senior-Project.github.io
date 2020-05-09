
  const button = document.getElementById('submit');
  button.addEventListener('click', async event => {
if('geolocation' in navigator){
  console.log('geolocation available');
  navigator.geolocation.getCurrentPosition( async position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude
    document.getElementById('latitude').textContent = lat
    document.getElementById('longitude').textContent = lon
    var emotion = document.getElementById('Emotion').value;

    console.log("This is your position: ",position)


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



});//end of position function



}else{
  console.log('geolocation not available');
}

}); //end of button function
