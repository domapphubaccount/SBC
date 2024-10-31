"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  drawer: false
};

export const asideSlice = createSlice({
  name: "aside",
  initialState,
  reducers: {
    sidar_toggle: (state, action) => {
      state.open = !state.open;
    },
    drawer_toggle: (state, action) => {
      state.drawer = !state.drawer
    }
  },
});
export const { sidar_toggle , drawer_toggle } = asideSlice.actions;

export default asideSlice.reducer;
