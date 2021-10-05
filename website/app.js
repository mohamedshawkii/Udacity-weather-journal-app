/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
const generate = document.getElementById("generate");

generate.addEventListener("click", startSearching);
async function startSearching(e) {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},&appid=cc070ef287fe73fb1b3a5764e7bdee2d&units=metric`;

  getOpenWeatherMap(apiUrl).then(function (data) {
    const pickedData = {
      dayTemp: data.main.temp,
      fullDate: newDate,
      clientInput: feelings,
      countryName: data.sys.country,
      cityName: data.name,
    };
    updateUI();
    postData("/sendWeatherData", pickedData);
  });
}

const getOpenWeatherMap = async (apiUrl) => {
  const res = await fetch(apiUrl);
  switch (res.status) {
    case 200:
      document.getElementById("status").innerHTML =
        "Yea! We hope you enjoy the service.";
      break;
    case 404:
      document.getElementById("status").innerHTML =
        "Sorry! Our service is limited for USA 'zipCode' only!.";
      break;
    case 500:
      document.getElementById("status").innerHTML =
        "Sorry! We work on major problem, maybe you can try later.";
      break;
  }
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error, "error");
  }
};

const postData = async (url = "", data = {}) => {
  console.log(data);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log(error, "error");
  }
};

const updateUI = async () => {
  const request = await fetch("/updateData");
  try {
    const renewInfo = await request.json();
    document.querySelector("#date").innerHTML = renewInfo.fullDate;
    document.querySelector("#temp").innerHTML = renewInfo.dayTemp;
    document.querySelector("#content").innerHTML = renewInfo.clientInput;
    document.querySelector("#country").innerHTML = renewInfo.countryName;
    document.querySelector("#city").innerHTML = renewInfo.cityName;
  } catch (error) {
    console.log(error, "error");
  }
};
