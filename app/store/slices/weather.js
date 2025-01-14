import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    isLoading: false,
    data: [],
    error: false,
  },
  extraReducers: (builder) => {},
});

export default weatherSlice.reducer;
