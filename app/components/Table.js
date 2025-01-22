"use client";
import { useDispatch, useSelector } from "react-redux";
import { getForecast } from "../store/slices/apiSlice";
import { useState, useEffect } from "react";
import {
  Sparklines,
  SparklinesReferenceLine,
  SparklinesBars,
} from "react-sparklines";

// TODO: Form Validation //

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
      const temp = [
        Math.floor(weather.list[3].main.temp),
        Math.floor(weather.list[12].main.temp),
        Math.floor(weather.list[20].main.temp),
        Math.floor(weather.list[28].main.temp),
        Math.floor(weather.list[36].main.temp),
      ];

      const pressure = [
        Math.floor(weather.list[3].main.pressure),
        Math.floor(weather.list[12].main.pressure),
        Math.floor(weather.list[20].main.pressure),
        Math.floor(weather.list[28].main.pressure),
        Math.floor(weather.list[36].main.pressure),
      ];

      const humidity = [
        Math.floor(weather.list[3].main.humidity),
        Math.floor(weather.list[12].main.humidity),
        Math.floor(weather.list[20].main.humidity),
        Math.floor(weather.list[28].main.humidity),
        Math.floor(weather.list[36].main.humidity),
      ];

      const calcAvg = (numbers) => {
        const sum = numbers.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );

        const avg = Math.floor(sum / numbers.length);

        return avg;
      };

      const weatherObj = {
        id: Math.random(Math.floor() * 10000),
        cityName: weather.city.name,
        temp: temp,
        avgTemp: calcAvg(temp),
        pressure: pressure,
        avgPress: calcAvg(pressure),
        humidity: humidity,
        avgHum: calcAvg(humidity),
      };
      setWeatherData((weatherData) => {
        return [weatherObj, ...weatherData];
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
            <th scope="col">Tempurature (F)</th>
            <th scope="col">Pressure (hPa)</th>
            <th scope="col">Humidity (%)</th>
          </tr>
        </thead>
        {weatherData.length > 0 &&
          weatherData.map((data) => {
            if (data) {
              return (
                <tbody key={data.id}>
                  <tr className="align-middle">
                    <th scope="row">{data.cityName}</th>
                    <td className="align-middle">
                      <Sparklines data={data.temp}>
                        <SparklinesBars
                          style={{ fill: "orange", fillOpacity: ".5" }}
                        />
                        <SparklinesReferenceLine type="avg" />
                      </Sparklines>
                      <p>
                        Average Temperature: <strong>{data.avgTemp} F</strong>
                      </p>
                    </td>
                    <td className="align-middle">
                      <Sparklines data={data.pressure}>
                        <SparklinesBars
                          style={{ fill: "orange", fillOpacity: ".5" }}
                        />
                        <SparklinesReferenceLine type="avg" />
                      </Sparklines>
                      <p>
                        Average Pressure: <strong>{data.avgPress} hPa</strong>
                      </p>
                    </td>
                    <td className="align-middle">
                      <Sparklines data={data.humidity}>
                        <SparklinesBars
                          style={{ fill: "orange", fillOpacity: ".5" }}
                        />
                        <SparklinesReferenceLine type="avg" />
                      </Sparklines>
                      <p>
                        Average Humidity: <strong>{data.avgHum} %</strong>
                      </p>
                    </td>
                  </tr>
                </tbody>
              );
            }
          })}
      </table>
    </div>
  );
}
