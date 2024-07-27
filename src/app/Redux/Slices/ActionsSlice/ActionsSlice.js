"use client";

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  chat_id: "",
  loading: false,
  renameToggle: false,
  deleteToggle: false,
  shareToggle: false,
  actionAlert: false,
  error: null,
};

// start rename action
export const renameAction = createAsyncThunk(
  "actions/renameAction",
  async (arg, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.AuthSlice.data.token; 
    const id = state.ActionsSlice.chat_id;
    try {
      const response = await axios.post(
        "https://sbc.designal.cc/api/rename-chat",
        {
          chat_id: id,
          new_name: arg,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Success") {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.message);
      }
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {
    renameToggleAction: (state, action) => {
      state.chat_id = action.payload;
      state.renameToggle = !state.renameToggle;
    },
    // Add any other reducer actions you need here
  },
  extraReducers: (builder) => {
    builder
      .addCase(renameAction.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(renameAction.fulfilled, (state, action) => {
        state.loading = false;
        console.log("success");
      })
      .addCase(renameAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("rejected" , action);
      });
  },
});

export default actionsSlice.reducer;
export const { renameToggleAction } = actionsSlice.actions;
