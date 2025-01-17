import { combineReducers } from "@reduxjs/toolkit";
import apiReducer from "./slices/apiSlice";
import historyReducer from "./slices/historySlice";

const rootReducer = combineReducers({
  weather: apiReducer,
  history: historyReducer,
});

export default rootReducer;
