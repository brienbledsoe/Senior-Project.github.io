const express = require('express');
/*in order to have acess to the node package express, need to put this ^
line of code above. Basically like an import statement*/
const Datastore = require('nedb'); //getting a function that creates a datastore or a databse
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

 app.use(express.static('public'));

/*what we need to give here is a folder name, and were going to call it public,
because we're going to remind ourselves that we put within the public directory is public accessible from the URL
in this case itse localhost:3000 */
app.use(express.json({limit: '1mb'}));
/*
code that allows the server to parse javaScript code

we can also put some options in there to control or limit what is possible in terms of receiving
data


we can start by limitting the code server to only processing 1 megabyte of code
*/

// const database = [];
//create array for saving information into database
const database = new Datastore('database.db');

/*What we are going to give to this Datastore function, is a path to a file name
ultimately the database is going to sit on a local file on this laptop, becuase thats where we are running the file right now.
- once we've created this datastore, its up to us to now specify whether or not we want to load whatever is in there
*/
database.loadDatabase(); /*going to actually load the file, load the existing data from the previous time the server ran into memory
and puts the file in our directory. If we actually looked inside the file as of right now, theres nothing actually inside so now we move on to using insert
to populate the database*/
// database.insert({name: "Brien", status: '🌈'});
// database.insert({name: "Siva", status: '🍉'});
/*a key aspect of working with a database, is having every record, every entry into the database be associated with a unique key
NeDb is generating this code, (ID within the database.db file), this seemingly randon sequence of letters and numbers to be this particular
piece of data's unique ID */

/*
we want to insert information into the database the moment we receive it from the client
*/
// app.post('/sending_data', (request,response)=>{
//   console.log(request.body);
// });


app.get('/sending_data', (request,response) =>{
  database.find({}).sort({timestamp:1}).exec((err,data)=>{
    if(err){
      console.log("error: ",err);
      response.end;
      return;
    }else{
      console.log("new test")
      response.json(data)
    }
  })
  // database.find({}, (err,data) =>{
  //   if (err){
  //     console.log("Error: ", err);
  //     response.end();
  //     return;
  //   }
  //   else{
  //     console.log("hello",data.timestamp)
  //     console.log("data: ",data)
  //     console.log("data 2: ", data[1].timestamp)
  //     response.json(data); //sending the data, passing the data to the client
  //
  //   }
  // })

  /*
  NeDB has more documentation on find
  -we would give it an object here which is a way of modifying that search, but we are going to
  give it an empty object because we want it to look for everything
  -and we are going to give it a callback
  -the callback has two arguments, error, and the data itself.
  */

});


  app.post('/sending_data', (request, response) => {
    console.log("I got a request!", request.body);
    const data = request.body;
    console.log("This is the data: ",data)
    const timestamp = Date.now();
    // data.emotion = emotion;
    data.timestamp = timestamp;
    // data.emotion = emotion;
    // data.status = status;

    database.insert(data);
    //
      console.log(database);
      // console.log("Data: ",data);
      // response.json({
      //   status: 'success',
      //   emotion: data.emotion,
      //   timestamp:timestamp,
      //   latitude: data.lat,
      //   longitude: data.lon
      //   // image: data.image64
      // });
      response.json(data);

  });

  // database.push(data); insteading of saying database.push data, send we are relying on information sent from the client we can use insert


  /*It is required that we complete a request. The best thing to do is send a response back when object or information has been
  recieved.*/

  //Date.now() - function explained in mozilla docs, the amount of time that has passed down to millisecond, from 1970
  /*just like we pushed data into the array before, we are inserting it into the NeDb data store, and it will get saved in that file*/


  //const json_information = await response.json();
  //console.log("testing: ");
  //every time we receive new data we push it into the database
  /*
  everything in the response.json is what we want to send back to the server as javaScript. Now in the client
  we want to do something to receive this
  */

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
