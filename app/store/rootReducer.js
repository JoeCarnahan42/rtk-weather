import { combineReducers } from "@reduxjs/toolkit";
import weatherReducer from "./slices/weather";
import searchReducer from "./slices/search";

const rootReducer = combineReducers({
  weather: weatherReducer,
  search: searchReducer,
});

export default rootReducer;
