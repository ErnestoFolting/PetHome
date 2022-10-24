import React, { useState } from "react";

export default function App() {
  const [weather, setWeather] = useState([])
  return (
    <div>
      <button onClick={getWeather}>
        GetForecast
      </button>
      <></>
        <div>
        <MapElements/>
      </div>
    </div>
  );
  function getWeather() {
    const url = "https://localhost:7124/api/WeatherForecast"
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(weather => setWeather(weather))
      .catch(er => alert(er))
  }
  function MapElements(){
    const listItems = weather.map(
      (element) => {
          return (
              <ul type="disc">
                  <li style={{ 
                      fontWeight: 'bold', 
                      color: 'red' }}
                  >
                      {element.date}
                  </li>
                  <li>{element.temperatureC}</li>
                  <li>{element.temperatureF}</li>
                  <li>{element.summary}</li>
              </ul>
          )
      }
  )

    return (
      <div>
          {listItems}
      </div>
    )
  }
}

