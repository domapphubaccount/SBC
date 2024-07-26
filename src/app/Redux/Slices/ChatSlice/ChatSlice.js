"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const startChat = createAsyncThunk(
  "chat/sendReports",
  async (arg, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    axios
      .post(`https://sbc.designal.cc/api/get-chat/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          chat_id: catchChat,
          share_name: "1",
        },
      })
      .then((res) => res)
      .catch((e) => rejectWithValue(e.message));
      
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

const reports = createSlice({
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
      .addCase(sendReports.pending, (state, action) => {
        console.log(action);
      })
      .addCase(sendReports.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(sendReports.rejected, (state, action) => {
        console.log(action);
      });
  },
});
