"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";
import { logout, removeAuthAction } from "../Auth/AuthSlice";
import RemoveAuth from "../RemoveAuth";

// start get dashbaord
export const getDashboardDataAction = createAsyncThunk(
  "dashboard/getDashboardDataAction",
  async (arg, { rejectWithValue , dispatch }) => {
    const { token, id } = arg;
    
    try {
      const response = await axios.get(`${config.api}admin/analysis`, {
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
      if(error?.response?.status === 401){
        dispatch(removeAuthAction())
        RemoveAuth()
      }
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

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateAction: (state, action) => {
      state.updates = !state.updates;
    },
  },
  extraReducers: (builder) => {
    builder
      //start login
      .addCase(getDashboardDataAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDashboardDataAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(getDashboardDataAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end login
  },
});
export const { updateAction } = dashboardSlice.actions;

export default dashboardSlice.reducer;
