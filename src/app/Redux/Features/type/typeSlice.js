"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const typeSlice = createSlice({
  name: 'type',
  initialState,
  reducers: {
    setTypeValue: (state , action) => {
      state.value = action.payload
    },
  },
})

export const { setTypeValue } = typeSlice.actions

export default typeSlice.reducer