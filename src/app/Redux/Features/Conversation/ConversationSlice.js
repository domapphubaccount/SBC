"use client"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";

// start get chat
export const getChatAction = createAsyncThunk(
  "conversation/getChatAction",
  async (arg, { rejectWithValue }) => {
    const { token , chat_id } = arg;
    try {
      const response = await axios.post(`${config.api}get_chat/${chat_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end get chat

// start create section
export const startSectionAction = createAsyncThunk(
  "conversation/startSectionAction",
  async (arg, { rejectWithValue }) => {
    const { token , chat_id } = arg;
    try {
      const response = await axios.post(`${config.api}get_chat/${chat_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data;
    } catch (error) {
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
