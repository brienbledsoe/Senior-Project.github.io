const express = require('express');
/*in order to have acess to the node package express, need to put this ^
line of code above. Basically like an import statement*/
const app = express(); //creating the web application app in this line
/*whole node library express is brought in and put inside a variable that we have called app*/
app.listen(3000, () => console.log("listening at 3000")); /*Based on Dan Shiffman's diagram, when we create a server, the server want to start
listening for anybody who is trying to have access to the server. So we want to start listening for anyone
who wants to connect

when we want to start listening we want to specify something that is known as a port. The port is a unique number
its like a numeric address at which I'm going to listen. You can have different servers listening to diff ports

the numeric address is followed by a callback function that happens once the port is listening*/

/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
/*NOw that the port is listening we want to...*/

/*1.) serve web pages
right now we have just a server that is running on port 3000, but if we were to deploy our server to our website object
ex. url.com, if people type that into their browser then we want to send them the HTML, JavaScript, and CSS code that we have
made for them to see in their browser

to simplify this, lets just FOR NOW serve one page, the index.js page
the way we give the server access to our index.html file is by using Express to host our static files
*/
//app.use(express.static(path.join(__dirname,"public")));

/*app.use("/", (req,res) =>
  res.sendFile("/public/index.html", {root: __dirname})
);
*/

app.use(express.static('public')); /*what we need to give here is a folder name, and were going to call it public,
because we're going to remind ourselves that we put within the public directory is public accessible from the URL
in this case itse localhost:3000 */

app.use(express.json({limit: '1mb'})); /*
code that allows the server to parse javaScript code

we can also put some options in there to control or limit what is possible in terms of receiving
data

we can start by limitting the code server to only processing 1 megabyte of code
*/
app.post('/sending_data', (request, response) => {
  //res.send('POST request to the homepage')
  console.log(request.body);
  /*It is required that we complete a request. The best thing to do is send a response back when object or information has been
  recieved.*/
  const data = request.body;
  response.json({
    status: 'success',
    latitude: data.lat,
    longitude: data.long
  });
  /*
  everything in the response.json is what we want to send back to the server as javaScript. Now in the client
  we want to do something to receive this
  */
});
/*When specifying a post, we are going to want to specify the address, where we want to receive that POST, as
well as a callback function, where I'm going to look at the information coming in and send a response back

now we are setting up the address, the endpoint for this particular route, where we want to receive
post. We can call it anything.

after the address, we need to set up a callback, (requests, response). We will be using the javaScript arrow syntax to create the
function which makes everything cleaner and replaces the generic function key word in the express version.

* so the function is here, and the request variable holds everything thats within that request. All the data thats being sent
  any information we need to know about that particular client is sending the information

* the response is a variable that we can use to send things back to the client.

* now we must move fetch our post over to the /sending_data endpoint.
    - so the client code, index.js and client index.html,
*/
