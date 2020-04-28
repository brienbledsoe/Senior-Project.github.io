// function sendConsoleInfo() {
  // alert('THANKS FOR SENDING YOUR LOCATION!');
  function setup(){
    /*
    -little bit of an oditity about the way the p5 works that's a little different than other JavaScript librarires
    -p5 looks for a function called setup() in your global namespace, meaning its just right there, and in this
     case in my script tag
   *set up is the equivalent of window on load or j queries ready() function
   - its the function th  at gets executed when the web page is loaded and everything is ready to go

    */
    noCanvas();
    const video = createCapture(VIDEO);
    //create video capture from default video source of the computer, the webcam
    video.size(300,250);

    let lat, lon;
    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {

       // if ("geolocation" in navigator) {
       //   console.log('geolocation is available');
       //   navigator.geolocation.getCurrentPosition(async position => { //making the position callback an asyncrhonous function
       //     console.log(position);
       //     const lat = position.coords.latitude;
       //     const long = position.coords.longitude;
       //     document.getElementById('latitude').textContent = lat;
       //     document.getElementById('longitude').textContent = long;
           console.log("user: ", document.getElementById('userName').value);
           var user = document.getElementById('userName').value;
           /*the videos canvas element is not there by default, we need to alert p5
           to the fact that I want to use a canvas

           */
           video.loadPixels();
           /*in p5, the video element has a canvas associated with it*/
           const image64 = video.canvas.toDataURL();
           /*
           taking the videos canvas, converting it to base64, and putting it into
           this variable image ⬆️
           */


                const data = {lat, long, user, image64};/*sending the lat and long as soon as its ready inside of an object*/
                const options = {
                  //first property we need to put in options is teh (method) that we are using
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)

                  /*
                  specifically sending data in JSON format. we need to specify this in something called
                  a header.

                  - a header is something that can be packaged along with any POST or GET request thats moving between
                    client and server, and its a way of adding some additional meta information. Can read more in the mozzilla
                    docs

                  - Headers have a name, a colon, and a value

                  * so we get the geolocation data, we package it into a post, and we send it to the endpoint.
                  */

                }; //end of options object


                const response = await fetch('/sending_data',options);

                //const json_information =  await response.json();
                const json_information =  await response.json();
                console.log(json_information);


                /*
                .then(response => {
                  console.log(response);
                });

                previous code that was added before position in the code above was changed to an asynchronous function, and the keyword
                await was used
                */

                 /*
                right now what we want to do is send a post.
                since we are not doing a regular fetch request, we have to provide a second argument which we named options, which is just a javaScript object.
                we create the javaScript object options so we can evaluate it seperately.

                fetch() returns a promise

                when the response comes back, its written as a datastream, and its up to us to specify how we want to read the information
                - we want to read it as a JSON. So we have to handle this in the client index.html
                  - to do this we could add on another .then() to the fetch function but Dan Shiffman suggest to go to the
                    navigator.geolocation.getCurrentPosition(position => {}) and make the callback function position an asyncrhonous function
                    with the async keyword, and then we could use the keyword await
                */


              // }); //end of position function


  if ("geolocation" in navigator) {
    console.log('geolocation is available');
    navigator.geolocation.getCurrentPosition(async position => { //making the position callback an asyncrhonous function
      console.log(position);
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      document.getElementById('latitude').textContent = lat;
      document.getElementById('longitude').textContent = long;

        }); //end of position function


     }//end of if function
       else {
         console.log('geolocation IS NOT available');
       }


}); //end of button function



  }//end of setup() function


// }

// document.addEventListener('DOMContentLoaded', function () {
//   document.getElementById('console')
//     .addEventListener('click', sendConsoleInfo);
// });
