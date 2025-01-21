"use client";
import { useDispatch, useSelector } from "react-redux";
import { getForecast } from "../store/slices/apiSlice";
import { useState, useEffect } from "react";
import {
  Sparklines,
  SparklinesReferenceLine,
  SparklinesBars,
} from "react-sparklines";

export default function Table() {
  const [weatherData, setWeatherData] = useState([]);
  const dispatch = useDispatch();
  const rawWeatherData = [];

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
      const weatherObj = {
        cityName: weather.city.name,
        dayOne: {
          temp: weather.list[3].main.temp,
          pressure: weather.list[3].main.pressure,
          humidity: weather.list[3].main.humidity,
        },
        dayTwo: {
          temp: weather.list[12].main.temp,
          pressure: weather.list[12].main.pressure,
          humidity: weather.list[12].main.humidity,
        },
        dayThree: {
          temp: weather.list[20].main.temp,
          pressure: weather.list[20].main.pressure,
          humidity: weather.list[20].main.humidity,
        },
        dayFour: {
          temp: weather.list[28].main.temp,
          pressure: weather.list[28].main.pressure,
          humidity: weather.list[28].main.humidity,
        },
        dayFive: {
          temp: weather.list[36].main.temp,
          pressure: weather.list[36].main.pressure,
          humidity: weather.list[36].main.humidity,
        },
      };
      rawWeatherData.push(weatherObj);
    }
  }, [weather]);

  useEffect(() => {
    if (rawWeatherData.length > 0) {
      setWeatherData(rawWeatherData);
    }
  }, [rawWeatherData]);

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
        {weatherData.map((data) => {
          return (
            <tbody key={data[0].city.id}>
              <th scope="row">{data.city.name}</th>
              <td>
                <Sparklines data={data[0].temp}>
                  <SparklinesBars
                    style={{ fill: "slategray", fillOpacity: ".5" }}
                  />
                  <SparklinesReferenceLine type="avg" />
                </Sparklines>
                <p>Tempurature(F)</p>
              </td>
              <td>
                <Sparklines data={data[0].pressure}>
                  <SparklinesBars
                    style={{ fill: "slategray", fillOpacity: ".5" }}
                  />
                  <SparklinesReferenceLine type="avg" />
                </Sparklines>
                <p>Pressure</p>
              </td>
              <td>
                <Sparklines data={data[0].humidity}>
                  <SparklinesBars
                    style={{ fill: "slategray", fillOpacity: ".5" }}
                  />
                  <SparklinesReferenceLine type="avg" />
                </Sparklines>
                <p>Humidity</p>
              </td>
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
