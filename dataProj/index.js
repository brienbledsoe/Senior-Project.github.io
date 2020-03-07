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
