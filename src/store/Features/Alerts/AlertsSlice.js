"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    type: '', // 'warning' 'success' 'error'
    content: '',
}

export const alertsSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    alertData: (state , action) => {
        state.open = action.payload.open
        state.type = action.payload.type
        state.content = action.payload.content
    },
    closeAlert: (state , action) => {
      state.open = action.payload.open
      state.type = ''
      state.content = ''
    }

  },
})

export const { alertData , closeAlert } = alertsSlice.actions

export default alertsSlice.reducer