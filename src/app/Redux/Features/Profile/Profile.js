"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch sections
export const handleGetProfile = createAsyncThunk(
  "profile/handleGetProfile",
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
export const handleChangePassword = createAsyncThunk(
  "profile/handleChangePassword",
  async (
    { token, current_password, new_password, confirm_password },
    { rejectWithValue }
  ) => {
    console.log(current_password, new_password, confirm_password);
    try {
      const response = await axios.post(
        "https://sbc.designal.cc/api/update-password",
        { current_password, new_password, confirm_password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log(response.data);
        return response.data.data; // Fulfilled response
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const initialState = {
  profile: {},
  error: "",
  status: 3, // 0 false , 1 succeed , 2 loading, 3 normal
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    get_profile: (state, action) => {
      state.profile = JSON.parse(localStorage.getItem("data"));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetProfile.pending, (state) => {
        state.status = 2;
        console.log("loading");
      })
      .addCase(handleGetProfile.fulfilled, (state, action) => {
        state.status = 1;
        setTimeout((state) => (state.status = 3), 3000);
        state.profile = action.payload;
        console.log("succeeded");
      })
      .addCase(handleGetProfile.rejected, (state, action) => {
        state.status = 0;
        state.error = action.payload;
        console.log("failed");
      })

      .addCase(handleChangePassword.pending, (state) => {
        state.status = 2;
        console.log("loading");
      })
      .addCase(handleChangePassword.fulfilled, (state, action) => {
        state.status = 1;
        setTimeout((state) => (state.status = 3), 3000);
        console.log("succeeded");
      })
      .addCase(handleChangePassword.rejected, (state, action) => {
        state.status = 0;
        state.error = action.payload;
        console.log("failed", action.payload);
      });
  },
});

export const { get_profile } = profileSlice.actions;

export default profileSlice.reducer;
