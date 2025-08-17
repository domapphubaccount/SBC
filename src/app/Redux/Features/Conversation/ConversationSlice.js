"use client"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";
import { logout, removeAuthAction } from "../Auth/AuthSlice";
import RemoveAuth from "../RemoveAuth";

// start get chat
export const getChatAction = createAsyncThunk(
  "conversation/getChatAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token , chat_id } = arg;
    try {
      const response = await axios.post(`${config.api}get_chat/${chat_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data;
    } catch (error) {
      if(error?.response?.status === 401){
        dispatch(removeAuthAction())
        RemoveAuth()
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end get chat

// start create section
export const startSectionAction = createAsyncThunk(
  "conversation/startSectionAction",
  async (arg, { rejectWithValue , dispatch }) => {
    const { token , chat_id } = arg;
    try {
      const response = await axios.post(`${config.api}get_chat/${chat_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data;
    } catch (error) {
      if(error?.response?.status === 401){
        dispatch(removeAuthAction())
        RemoveAuth()
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end create section




const initialState = {
  value: "",
  loading: false,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //start get chat
      .addCase(getChatAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(getChatAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end get chat
  },
});

export default conversationSlice.reducer;
