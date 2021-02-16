/* Global Variables */
// openweather url address
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "";
//api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}

const postData = async (url = "", data = {}) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

//get
document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zip = document.getElementById("zip").value;
  getWeatherData(zip)
    .then(function (data) {
      console.log(data);
      // temperature in celsius
      let temperature = (data.main.temp - 273.15).toFixed(0);
      let cityName = data.name;
      let weatherDescription = data.weather;
      // Create a new date instance dynamically with JS
      let d = new Date();
      let newDate =
        d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();
      let userInput = document.getElementById("feelings").value;
      console.log(
        newDate,
        cityName,
        userInput,
        temperature,
        weatherDescription
      );
      postData("/add", {
        date: newDate,
        city: cityName,
        temperature: temperature,
        userInput: userInput,
        weather: weatherDescription,
      });
    })
    .then(updateUI);
}
const getWeatherData = async (zip) => {
  const res = await fetch(baseURL + zip + ",DE&appid=" + apiKey);
  try {
    const data = await res.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.log("eror", eror);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const serverData = await request.json();
    document.getElementById("date").innerHTML = serverData.date;
    document.getElementById("temp").innerHTML = serverData.temperature;
    document.getElementById("content").innerHTML = serverData.userInput;
  } catch (error) {
    console.log("error", error);
  }
};
