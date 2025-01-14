import store from "../store/configureStore";

export default function Table({ data }) {
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
          <tbody key={weather.city}>
            <tr>
              <th scope="row">{weather}</th>
              <td>{weather}</td>
              <td>{weather}</td>
              <td>{weather}</td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
}
