"use client";
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: "light",
}

export const ThemeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    darkMode: (state) => {
      state.mode  = "dark"
    },
    lightMode: (state) => {
      state.mode = "light"
    }
  },
})

export const { darkMode , lightMode} = ThemeSlice.actions

export default ThemeSlice.reducer