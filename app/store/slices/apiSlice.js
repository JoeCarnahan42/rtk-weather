import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLatLong = createAsyncThunk("getLatLong", async (cityInput) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=c09e162aa897c3130ce9f6bfd5698b9b&units=imperial`
  );
  return response.data;
});

export const getForecast = createAsyncThunk(
  "getForecast",
  async ({ latitude, longitude }) => {
    const response = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=c09e162aa897c3130ce9f6bfd5698b9b&units=imperial`
    );
    return response.data;
  }
);

const apiSlice = createSlice({
  name: "data",
  initialState: {
    latitude: null,
    longitude: null,
    weather: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    // First API Request //
    builder
      .addCase(getLatLong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLatLong.fulfilled, (state, action) => {
        state.loading = false;
        state.latitude = action.payload[0].lat;
        state.longitude = action.payload[0].lon;
      })
      .addCase(getLatLong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Second API Request //
      .addCase(getForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getForecast.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      })
      .addCase(getForecast.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default apiSlice.reducer;
