import store from "../store/configureStore";

export default function SearchBar() {
  return (
    <div className="container input-group">
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
  );
}
