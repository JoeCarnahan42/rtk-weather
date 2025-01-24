"use client";
import { getLatLong } from "../store/slices/apiSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const SearchBar = () => {
  const dispatch = useDispatch();

  // Better validation?? //
  const schema = yup.object({
    input: yup
      .string()
      .transform(function (value) {
        return value.toLowerCase(), value.trim(" ");
      })
      .required("City name is required."),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    dispatch(getLatLong(data.input));
    setValue("input", "");
  };

  return (
    <div className="container">
      <br />
      <div className="input-group">
        <input
          {...register("input", { required: true })}
          type="text"
          className="form-control"
          placeholder="Enter City Name:"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button
            onClick={handleSubmit(submit)}
            className="btn btn-outline-primary"
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
      {errors.input?.message && (
        <div className="alert alert-danger">{errors.input?.message}</div>
      )}
    </div>
  );
};

export default SearchBar;
