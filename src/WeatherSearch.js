import React, { useState } from 'react';
import axios from 'axios';
import WeatherChart from './WeatherChart';
import './weatherCSS.css';


const WeatherSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);
  
  

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=fb7e3d6e6417bae7fadf83a42f83c674`
      );
      setLocations(response.data);
      setSelectedLocation(null); // Reset selected location
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationSelect = (event) => {
    const selectedIndex = event.target.value;
    setSelectedLocation(locations[selectedIndex]);
    handleOptionSelect(selectedIndex);
  };

  
  
  const handleOptionSelect = (selectedIndex) => {
    const [lat, lon] = selectedIndex.split('&');

    console.log("==================process.env.REACT_APP_BACKEND_APP_API_URL============");
    console.log(process.env.REACT_APP_BACKEND_APP_API_URL);



    const apiUrl = process.env.REACT_APP_BACKEND_APP_API_URL;



    fetch(`${apiUrl}/weather?lat=${lat}&lon=${lon}`)
    .then((response) => response.json())
    .then((data) => setWeatherData(data))
    .catch((error) => console.log(error));
  };


  return (
    <React.Fragment>
      <h2 className="center-heading">Weather Search</h2>
      <div className="center-div">
        
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleSearch}>Search</button>
        <select value={selectedLocation ? selectedLocation.name : ''} onChange={handleLocationSelect} >
          <option value="">Select a location</option>
          {
              locations.map(
                  (location, index) => (
                      <option key={index} value={`${location.lat}&${location.lon}`} >
                          {location.name}, {location.state}, {location.country}
                      </option>
                  )
              )
          }
        </select>
      </div>

      {alertMsg == null ? (
        <div className="center-div">{alertMsg}</div>
      ) : (
        <div className="center-div"></div>
      )}



      <h2 className="center-heading">Current Weather</h2>
      {weatherData!=null ? (
        <div>
          <center>
          <p>Weather Condition: {weatherData.current.weather_condition}</p>
          <p>Temperature: {weatherData.current.temp}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.speed} m/s </p>
          </center>

        </div>
      ) : (
        <div className="center-div">Please enter the city name...</div>
      )}
      
      <h2 className="center-heading">Forecast</h2>
      {weatherData!=null ? (
      <div className="center-div">
          <WeatherChart forecast_data = {weatherData.forecast} />
      </div>
      ) : (
        <div className="center-div">Please enter the city name...</div>
      )}
    </React.Fragment>
  );
};

export default WeatherSearch;


