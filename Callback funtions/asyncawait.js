printRandomNumber()
    .then(() => printAllCities());

async function printRandomNumber() {
    const randNumber = await getRandomNumber();
  const randNumberLog = `Random Number: ${randNumber}`;
  console.log(randNumberLog);
  htmlLog(randNumberLog);
}

async function printAllCities() {
  for (const city of [ 'dallas', 'seattle', 'los_angeles' ]) {
    await printLatitudeAndLongitude(city);
  }
}

function getRandomNumber() {
    return new Promise(x =>
      setTimeout(() => x(Math.floor(Math.random() * 1000)), 500));
}

async function printLatitudeAndLongitude(city) {
    const url = `https://geocode.xyz/${city}?json=1`;
  
  let res = await fetch(url);
  
  if (res.status != 200) {
    res = await new Promise(x => setTimeout(async () => {
        const tmpRes = await fetch(url);
        x(tmpRes);
      }, 1000));
  }

    const json = await res.json();
  const output = `${json.standard.city} - Latitude: ${json.latt}, Longitude: ${json.longt}`;
  console.log(output);
  htmlLog(output);
}

function htmlLog(logData) {
    const li = document.createElement('li');
  li.innerText = logData.toString();
    document.getElementById('results').appendChild(li);
}