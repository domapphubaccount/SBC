"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
}

export const deslikeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    openDislikeAlert: (state , action) => {
      state.open = action.payload.open
    },
    closeDislikeAlert: (state , action) => {
      state.open = action.payload.open
    }
  },
})

export const { openDislikeAlert , closeDislikeAlert } = deslikeSlice.actions

export default deslikeSlice.reducer