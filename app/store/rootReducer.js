import { combineReducers } from "@reduxjs/toolkit";
import apiReducer from "./slices/apiSlice";

const rootReducer = combineReducers({
  weather: apiReducer,
});

export default rootReducer;
