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

  const { latitude, longitude, weather } = useSelector(
    (state) => state.weather
  );

  const data = (weather, dataPoint) => {
    const arr = [3, 12, 20, 28, 36];
    return arr.map((number) =>  Math.floor(weather.list[number].main[dataPoint]);
    );
  };

  const calcAvg = (numbers) => {
    const sum = numbers.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    const avg = Math.floor(sum / numbers.length);

    return avg;
  };

  useEffect(() => {
    if (latitude && longitude) {
      dispatch(getForecast({ latitude, longitude }));
    }
  }, [latitude, longitude, dispatch]);

  useEffect(() => {
    if (weather) {
      const temp = data(weather, "temp");
      const pressure = data(weather, "pressure");
      const humidity = data(weather, "humidity");

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
