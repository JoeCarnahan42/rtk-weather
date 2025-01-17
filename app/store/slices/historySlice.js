import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {
    history: [],
  },
  reducers: {
    addCity: (state, action) => {
      state.history.unshift(action.payload);
    },
    removeCity: (state, action) => {
      state.citys = state.history.filter(
        (history) => history.id !== action.payload
      );
    },
  },
});

export const { addCity, removeCity } = historySlice.actions;

export default historySlice.reducer;
