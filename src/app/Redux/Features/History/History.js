"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch sections
export const handleGetHistory = createAsyncThunk(
  "history/handleGetHistory",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://sbc.designal.cc/api/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return response.data.data; // Fulfilled response
      } else {
        return rejectWithValue("Failed to fetch sections");
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const initialState = {
  history: [],
  error: "",
  status: 1, // 0 false , 1 succeed , 2 loading
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleGetHistory.pending, (state) => {
        state.status = 2;
        console.log("loading");
      })
      .addCase(handleGetHistory.fulfilled, (state, action) => {
        state.status = 1;
        state.history = action.payload;
        console.log("succeeded");
      })
      .addCase(handleGetHistory.rejected, (state, action) => {
        state.status = 0;
        state.error = action.payload;
        console.log("failed");
      });
  },
});

export const {} = historySlice.actions;

export default historySlice.reducer;
