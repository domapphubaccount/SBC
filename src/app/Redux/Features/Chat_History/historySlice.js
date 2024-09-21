"use client"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";
import { logout } from "../Auth/AuthSlice";

// start get history
export const getHistoryAction = createAsyncThunk(
  "history/getHistoryAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token } = arg;
    console.log(token);
    try {
      const response = await axios.get(`${config.api}chat_history`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data.data;
    } catch (error) {
      if(error?.response?.status === 401){
        dispatch(logout())
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end get history


const initialState = {
  chat_history: [],
  loading: false,
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    loading_get_chat_history: (state , action) => {
      state.loading = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      //start get history
      .addCase(getHistoryAction.pending, (state) => {
        state.loading = true;
        state.error = true;
      })
      .addCase(getHistoryAction.fulfilled, (state, action) => {
          state.error = null;
          state.loading = false;
          console.log(action.payload)
          state.chat_history = action.payload;
      })
      .addCase(getHistoryAction.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
      })
      // end get history
  },
});

export const {loading_get_chat_history} = historySlice.actions 
export default historySlice.reducer;
