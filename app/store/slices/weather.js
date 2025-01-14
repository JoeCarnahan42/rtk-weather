import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    temp: null,
    press: null,
    humidity: null,
  },
  reducers: {
    setTemp: (state, action) => {
      state.temp = action.payload;
    },
    setPress: (state, action) => {
      state.press = action.payload;
    },
    setHumidity: (state, action) => {
      state.humidity = action.payload;
    },
  },
});

export const { setTemp } = weatherSlice.actions;
export const { setPress } = weatherSlice.actions;
export const { setHumidity } = weatherSlice.actions;

export default weatherSlice.reducer;
