"use client";

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
}

const fetchLogin = createAsyncThunk('https://sbc.designal.cc/api/login', ()=>{
    axios.post
})

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase()
  }
})

export const { } = chatSlice.actions

export default chatSlice.reducer