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
    try {
      const response = await axios.get(`${config.api}chat_history`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
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

// start rename history
export const renameHistoryAction = createAsyncThunk(
  "history/getHistoryAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token , id , name} = arg;
    try {
      const response = await axios.post(`${config.api}rename-chat`,{
        chat_id: id,
        new_name: name
      } , {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
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
// end rename history


const initialState = {
  chat_history: [],
  loading: false,
  error: false,
  rename_module: false,
  delete_module: false,
  share_module: false,
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    loading_get_chat_history: (state , action) => {
      state.loading = action.payload
    },
    clearHistory: (state) => {
      state.chat_history = [];
      state.loading = false
    },
    rename_module: (state , action) =>{
      state.rename_module = action.payload
    },
    delete_module: (state , action) =>{
      state.delete_module = action.payload
    },
    share_module: (state , action) =>{
      state.share_module = action.payload
    },
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
          state.chat_history = action.payload;
      })
      .addCase(getHistoryAction.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
      })
      // end get history
  },
});

export const {loading_get_chat_history , clearHistory , rename_module , delete_module , share_module} = historySlice.actions 
export default historySlice.reducer;
