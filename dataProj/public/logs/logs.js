getData()
  async function getData(){
  const response = await fetch('/sending_data')
  const data = await response.json();
  /*ultimately what we want to do is from the client, make a GET request to a route on
  the server, and have that route return all the data from the database.

  this is much simpler, we don't need to explicitly set the method to POST, because the default
  is GET

  and we could just give it the same path we used before, although we could set up a different
  route

  * we can reuse the API route because we used it previously as a POST, so calling fetch with
  a GET to API will be handled in a different function in the server itself

  NOW: We also have to add some native JavaScript DOM manipulation to display the content in the database onto the webpage
  Dan leaves some code to get us started

  */
  for (item of data){
    const root = document.createElement('P');
    const name = document.createElement('P');
    const geo = document.createElement('P');
    const date = document.createElement('P');
    const image = document.createElement('IMG');


    name.textContent = `name: ${item.user}`;
    geo.content = `${item.lat},${item.long}`;
    const dateString = new Date(item.timestamp).toLocaleString();
    /*this is basically taking thatt timestamp, which is basically the # of milliseconds since
    January 1 1970, and converting back into a string*/
    date.textContent = dateString;
    image.src = item.image64;
    image.alt = "Brien Bledsoe posing in the same position on different days to test database"
    image.setAttribute("width","304");
    image.setAttribute("height","215");
    /*so basically all three divs all go inside root*/
    root.append(name,geo,date,image);
    /*can use append functiona
    -append will actually take multiple elements as arguments and append them all
    */
    document.body.append(root);
  }
  console.log("Data: ",data);

}//end of getData() function
