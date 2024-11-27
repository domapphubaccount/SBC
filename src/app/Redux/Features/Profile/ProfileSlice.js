"use client";

import { config } from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../Auth/AuthSlice";
import { clearData } from "../Chat/ChatSlice";
import { clearHistory } from "../Chat_History/historySlice";
import RemoveAuth from "../RemoveAuth";

// start update password
export const updatePasswordAction = createAsyncThunk(
  "profile/updatePasswordAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token, current_password, new_password, confirm_password } = arg;
    try {
      const response = await axios.put(
        `${config.api}profile`,
        { current_password, new_password, confirm_password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.error) {
        return new Error(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      if(error?.response?.status === 401){
        RemoveAuth()
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end update password

// start get profile
export const getProfileAction = createAsyncThunk(
  "profile/getProfileAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token } = arg;
    try {
      const response = await axios.get(`${config.api}profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.data.error) {
        return new Error(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      if(error?.response?.status === 401){
        RemoveAuth()
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end get profile

const initialState = {
  loading: false,
  value: "",
  error: "",
  profile: {},
  permissions: []
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state)=>{
      state.value = "";
      state.error= "";
      state.profile = {};
      state.permissions = [];
    }
  },

  extraReducers: (builder) => {
    builder
      // start update password
      .addCase(updatePasswordAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        // state.value = action.payload
      })
      .addCase(updatePasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // end update password

      // start get profile
      .addCase(getProfileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.permissions = action.payload?.roles[0]?.permissions.map(item => item.name)
      })
      .addCase(getProfileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end get profile
  },
});

export const {clearProfile} = profileSlice.actions

export default profileSlice.reducer;
