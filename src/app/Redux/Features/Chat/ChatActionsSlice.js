"use client";

import { config } from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout, removeAuthAction } from "../Auth/AuthSlice";
import RemoveAuth from "../RemoveAuth";

// start get 
  "chat/getChatAction",
  async (arg, { rejectWithValue , dispatch }) => {
    const { token, chat_id } = arg;
    try {
      const response = await axios.get(`${config.api}get_chat/${chat_id}`, {
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
        dispatch(removeAuthAction())
        RemoveAuth()
      }
      return rejectWithValue(error.response.data);
    }
  }
//  end get 

const initialState = {
  loading: false,
  action_done: false,
  error: false
};

export const chatActionsSlice = createSlice({
  name: "chatactions",
  initialState,
  reducers: {
    loading_chat_action: (state, action) => {
      state.loading = action.payload;
    },
    action_done: (state,action) => {
      state.action_done = action.payload
    },
    sendError: (state , action)=>{
      state.error = action.payload
    }
  },
});

export const {
    loading_chat_action ,
    action_done,
    sendError
} = chatActionsSlice.actions;

export default chatActionsSlice.reducer;
