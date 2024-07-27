"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const startChat = createAsyncThunk(
  "chat/startChat",
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.data.token; // Assuming the token is stored in the auth slice under `state.auth.token`
    
    try {
      const response = await axios.post(`https://sbc.designal.cc/api/get-chat`, {
        chat_id: arg.id,
        share_name: "1",
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const initialState = {
  reports: null,
  isLoading: false,
  reportDetails: null,
  reportUpdate: null,
  toggle: false,
  catchReport: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendReport: (state, action) => {
      console.log(action.payload);
      return { ...state, catchReport: action.payload, toggle: true };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startChat.pending, (state) => {
        state.isLoading = true;
        console.log('pending');
      })
      .addCase(startChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reportDetails = action.payload;
        console.log('success');
      })
      .addCase(startChat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log('rejected');
      });
  },
});

export default chatSlice.reducer;
export const chatActions = chatSlice.actions;
