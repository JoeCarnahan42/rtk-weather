"use client";
import { useState } from "react";
import { getLatLong } from "../store/slices/apiSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handelChange = (e) => {
    setInput(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(getLatLong(input));
    setInput("");
  };

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
    </div>
  );
};

export default SearchBar;
