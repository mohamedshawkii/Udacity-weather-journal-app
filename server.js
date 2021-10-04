// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 4000;
const name = "localhost";
// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const server = app.listen(port, () => {
  console.log(`server is running at http://${name}:${port}`);
});

app.get("/updateData", (request, response) => {
  response.send(projectData);
});

app.post("/sendweatherData", (request, response) => {
  projectData = {
    dayTemp: request.body.dayTemp,
    fullDate: request.body.fullDate,
    clientInput: request.body.clientInput,
    countryName: request.body.countryName,
    cityName: request.body.cityName,
  };
  response.end();
  console.log(projectData);
});
