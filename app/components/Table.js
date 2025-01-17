"use client";
import { useDispatch, useSelector } from "react-redux";
import { getLatLong, getForecast } from "../store/slices/apiSlice";
import { addCity, removeCity } from "../store/slices/historySlice";
import { useState, useEffect } from "react";

// TODO: Move search bar to different component //
// Figure out rendering problem //

export default function Table() {
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const dispatch = useDispatch();

  const { latitude, longitude, weather } = useSelector(
    (state) => state.weather
  );

  const { history } = useSelector((state) => state.history);

  const submit = (e) => {
    e.preventDefault();
    dispatch(getLatLong(input));
  };

  const handelChange = (e) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(getForecast({ latitude, longitude }));
    }
  }, [latitude, longitude, dispatch]);

  useEffect(() => {
    if (weather) {
      dispatch(addCity(weather));
    }
  }, [weather, dispatch]);

  useEffect(() => {
    if (history.length > 0) {
      history.forEach((city) => {
        setWeatherData((weatherData) => [...weatherData, city]);
      });
    }
  }, [history]);

  return (
    <div className="container">
      <div className="input-group">
        <input
          value={input}
          onChange={handelChange}
          type="text"
          className="form-control"
          placeholder="Enter City Name:"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button
            onClick={submit}
            className="btn btn-outline-primary"
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
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
