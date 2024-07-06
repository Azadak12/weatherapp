import React, { useState } from 'react';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { FaTemperatureHigh, FaCloud, FaTint, FaWind, FaSun, FaCloudRain } from 'react-icons/fa';
import './Weather.css';
import "bootstrap/dist/css/bootstrap.min.css";
const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const apiKey = '6e2766e6cd5dea473b524e49247fa0ad'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setError('');
    } catch (error) {
      setError('Could not fetch weather data. Please check the city name and try again.');
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <div className="card p-4 weather-card">
        <h1 className="text-center mb-4 weather-title">Weather App</h1>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
          <button className="btn btn-primary" onClick={fetchWeather}>
            <FiSearch />
          </button>
        </div>

        {error && <p className="text-danger">{error}</p>}

        {weather && (
          <div className="weather-info">
            <h2 className="text-center">{weather.name}</h2>
            <div className="d-flex justify-content-around mt-3">
              <div className="weather-icon">
                <FaTemperatureHigh size={40} color="#f39c12" />
                <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
              </div>
              <div className="weather-icon">
                <FaCloud size={40} color="#fff" />
                <p>Weather: {weather.weather[0].description}</p>
              </div>
            </div>
            <div className="weather-details">
              <div className="weather-detail">
                <FaTint size={40} color="#3498db" />
                <p>Humidity: {weather.main.humidity}%</p>
              </div>
              <div className="weather-detail">
                <FaWind size={40} color="#3498db" />
                <p>Wind Speed: {weather.wind.speed} m/s</p>
              </div>
              <div className="weather-detail">
                <FaSun size={40} color="#f39c12" />
                <p>Pressure: {weather.main.pressure} hPa</p>
              </div>
              <div className="weather-detail">
                <FaCloudRain size={40} color="#3498db" />
                <p>Cloudiness: {weather.clouds.all}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
