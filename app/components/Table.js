"use client";
import { useDispatch, useSelector } from "react-redux";
import { getForecast } from "../store/slices/apiSlice";
import { useState, useEffect } from "react";

// TODO: Move search bar to different component //
// Figure out rendering problem //

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
    if (weather) {
      setWeatherData((weather) => [...weatherData, weather]);
    }
  }, [weather, weatherData]);

  return (
    <div className="container">
      <h1>Enter a city to get started</h1>
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
        {console.log("re render -----")}
        {/* {weatherData.map((weather) => {
          console.log(weather);
        })} */}
      </table>
    </div>
  );
}
