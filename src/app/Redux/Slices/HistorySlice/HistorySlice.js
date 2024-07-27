"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// start history action
export const historyAction = createAsyncThunk(
  "auth/loginAction",
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.AuthSlice.data.token;
    console.log(token)

    try {
      const response = await axios.get(`https://sbc.designal.cc/api/dashboard` ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(response.data.success){
      return response.data;
      }else{
          return thunkAPI.rejectWithValue(response.message);
        }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
// end history action

const initialState = {
  loading: false,
  error: '',
  data: {},
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // start history
    builder
      .addCase(historyAction.pending, (state) => {

        state.loading = true;
        
        console.log('pending');
      
      })
      .addCase(historyAction.fulfilled, (state, action) => {

        state.loading = false;
        state.data = action.payload.data;

        console.log('success');
      })
      .addCase(historyAction.rejected, (state, action) => {

        state.loading = false;
        state.error = action.payload;
        
        console.log('rejected' , action);
      
       })
    //   end history
  },
});

export default historySlice.reducer;
export const historyActions = historySlice.actions;
