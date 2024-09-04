"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// start update password
export const updatePasswordAction = createAsyncThunk(
  "profile/updatePasswordAction",
  async (arg, { rejectWithValue }) => {
    const { token, current_password, new_password, confirm_password } = arg;
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

      if (response.data.error) {
        return new Error(response.data.message);
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end update password

const initialState = {
  loading: false,
  value: "",
  error: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // start update password
      .addCase(updatePasswordAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePasswordAction.fulfilled, (state, action) => {
        state.loading = false;
        console.log("updated succ");
        // state.value = action.payload
      })
      .addCase(updatePasswordAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end update password
  },
});

// export const { getCode , set_stored_code } = profileSlice.actions

export default profileSlice.reducer;
