"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";

// start get dashbaord
export const getUsersChatAction = createAsyncThunk(
  "users-chat/getUsersChatAction",
  async (arg, { rejectWithValue }) => {
    const { token } = arg;
    
    try {
      const response = await axios.get(`${config.api}admin/master_user_chat`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
          "Content-Type": "*/*",
        },
      });
      
      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end get dashbaord

const initialState = {
  data: null,
  values: null,
  updates: false,
};

export const usersChatSlice = createSlice({
  name: "users-chat",
  initialState,
  reducers: {
    updateAction: (state, action) => {
      state.updates = !state.updates;
    },
  },
  extraReducers: (builder) => {
    builder
      //start login
      .addCase(getUsersChatAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersChatAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(getUsersChatAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end login
  },
});
export const { updateAction } = usersChatSlice.actions;

export default usersChatSlice.reducer;
