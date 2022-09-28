const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=London&appid=d670eac31c0c7e77db2ba32fdd289ee6&units=imperial';

  https.get(url, (response) => {
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);
      const { temp } = weatherData.main;
      const { name } = weatherData;
      const weatherDescription = weatherData.weather[0].description;
      const { icon } = weatherData.weather[0];
      const imgURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      res.write(`<p>The weather is currently ${weatherDescription}</p>`);
      res.write(
        `<h1>The temperature in ${name} is ${temp} degrees Fahrenheit.</h1>`
      );
      res.write(`<img src="${imgURL}">`);
      res.send();
    });
  });
});

app.listen(port, () => console.log(`Server started on port ${port}!`));
