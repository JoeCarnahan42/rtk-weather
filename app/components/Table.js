"use client";
import { useDispatch, useSelector } from "react-redux";
import { getLatLong, getForecast } from "../store/slices/apiSlice";
import { useState, useEffect } from "react";

export default function Table() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const { latitude, longitude, weather, loading, error } = useSelector(
    (state) => state.weather
  );

  // TODO: Figure out how to populate jsx elements with weatherData
  // Start work on chart components
  const weatherData = [];

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

  if (weatherData.length < 1) {
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
        </table>
      </div>
    );
  } else {
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
            <button className="btn btn-outline-primary" type="button">
              Submit
            </button>
          </div>
        </div>
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
        </table>
      </div>
    );
  }
}
