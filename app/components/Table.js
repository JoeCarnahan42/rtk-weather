"use client";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../store/slices/weather";
import { useEffect } from "react";

export default function Table({ data }) {
  if (!data) {
    return (
      <div className="container">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter City Name:"
            aria-describedby="basic-addon2"
          ></input>
          <div className="input-group-append">
            <button className="btn btn-outline-primary" type="button">
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
            type="text"
            className="form-control"
            placeholder="Enter City Name:"
            aria-describedby="basic-addon2"
          ></input>
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
          {data.map((weather) => {
            return (
              <tbody key={weather.name}>
                <tr>
                  <th scope="row">{weather.name}</th>
                  <td>{weather.main.temp}</td>
                  <td>{weather.main.pressure}</td>
                  <td>{weather.main.humidity}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}
