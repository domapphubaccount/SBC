"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch sections
export const handleGetCode = createAsyncThunk(
  "code/handleGetCode",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://sbc.designal.cc/api/sections", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
  value: "",
  storedCode: [],
  error: "",
  status: 1, // 0 false , 1 succeed , 2 loading
};

export const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    getCode: (state, action) => {
      state.value = action.payload;
    },
    set_code: (state, action) => {
      if (state.storedCode.includes(action.payload)) {
        state.storedCode = state.storedCode.filter(
          (item) => item !== action.payload
        );
      } else {
        state.storedCode.push(action.payload);
      }
    },
    remove_code: (state, action) => {
      state.storedCode = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetCode.pending, (state) => {
        state.status = 2;
        console.log("loading");
      })
      .addCase(handleGetCode.fulfilled, (state, action) => {
        state.status = 1;
        state.value = action.payload;
        console.log("succeeded");
      })
      .addCase(handleGetCode.rejected, (state, action) => {
        state.status = 0;
        state.error = action.payload;
        console.log("failed");
      });
  },
});

export const { getCode, set_code, remove_code } = codeSlice.actions;

export default codeSlice.reducer;
