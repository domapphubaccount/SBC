"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
  sidebar: false,
}

export const updatesSlice = createSlice({
  name: 'updates',
  initialState,
  reducers: {
    update: (state) => {
      state.value = !state.value
    },
    update_sidebar: (state) => {
      state.sidebar = !state.sidebar
    },
  },
})

export const { update, update_sidebar } = updatesSlice.actions

export default updatesSlice.reducer