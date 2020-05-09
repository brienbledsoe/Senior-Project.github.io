getData()
async function getData(){
const response = await fetch('/sending_data');
const data = await response.json();

for(item of data){
  const root = document.createElement('p');
  const emotion = document.createElement('p');
  const geo = document.createElement('p');
  const date = document.createElement('p');

  emotion.textContent = `emotion: ${item.emotion}`;
  geo.textContent = `${item.lat}°, ${item.lon}°`;
  const dateString = new Date(item.timestamp).toLocaleString();
  //⬆️ gives date in local time zone
  date.textContent = dateString;

  root.append(emotion,geo,date);
  document.body.append(root);

}

console.log(data);

}
