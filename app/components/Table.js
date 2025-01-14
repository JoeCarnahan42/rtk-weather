export default function Table({ data }) {
  if (!data) {
    return (
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
    );
  } else {
    return (
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
            <tbody key={weather.cityName}>
              <tr>
                <th scope="row">{weather.cityName}</th>
                <td>{weather.temp}</td>
                <td>{weather.press}</td>
                <td>{weather.hum}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  }
}
