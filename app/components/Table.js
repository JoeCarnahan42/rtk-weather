"use client";
import { useDispatch, useSelector } from "react-redux";
import { getForecast } from "../store/slices/apiSlice";
import { useState, useEffect, useMemo } from "react";

export default function Table() {
  const [weatherData, setWeatherData] = useState([]);
  const dispatch = useDispatch();

  const { latitude, longitude, weather } = useSelector(
    (state) => state.weather
  );

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(getForecast({ latitude, longitude }));
    }
  }, [latitude, longitude, dispatch]);

  useEffect(() => {
    // Render Issue happens here //
    if (weather) {
      setWeatherData((weatherData) => {
        return [...weatherData, weather];
      });
    }
  }, [weather]);

  return (
    <div className="container">
      {!weather ? <h1>Enter a city to get started</h1> : <h1></h1>}
      <br />
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">City</th>
            <th scope="col">Tempurature</th>
            <th scope="col">Pressure</th>
            <th scope="col">Humidity</th>
          </tr>
        </thead>
        {console.log("re render ----->", weatherData)}
        {/* {weatherData.map((weather) => {
          console.log(weather);
        })} */}
      </table>
    </div>
  );
}
