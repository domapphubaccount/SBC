"use client";

import { createSlice } from '@reduxjs/toolkit'
const isBrowser = typeof window !== "undefined"

const initialState = {
    userData: isBrowser && localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : '',
}

export const authSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    login_success: (state , action) => {
        state.userData = action.payload
    },

    logout: (state , action) => {
        state.userData = '';
        localStorage.removeItem("data")
    }

  },
})

export const { login_success , logout } = authSlice.actions

export default authSlice.reducer