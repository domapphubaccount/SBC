"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const chatSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getChatHistory: (state , action) => {
      state.value = action.payload
    },
  },
})

export const { getChatHistory } = chatSlice.actions

export default chatSlice.reducer