"use client";

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { config } from "@/config/config";
import axios from "axios"

// start get chat
export const getCodeAction = createAsyncThunk(
  "code/getCodeAction",
  async (arg, { rejectWithValue }) => {
    const { token } = arg;
    console.log('code action ' , token)
    try {
      const response = await axios.get(`${config.api}admin/section_pdf`,{
      headers: {
        Authorization: `Bearer ${token}`
      }})

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end get chat

const initialState = {
  value: '',
  storedCode: [],
}

export const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    getCode: (state , action) => {
      state.value = action.payload
    },
    set_stored_code: (state, action) => {
      if (state.storedCode.some(item => item === action.payload)) {
        state.storedCode = state.storedCode.filter(item => item !== action.payload);
      } else {
        state.storedCode.push(action.payload);
      }
    }
  },

  extraReducers: (builder) => {
    builder
      //start get chat
      .addCase(getCodeAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCodeAction.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload
      })
      .addCase(getCodeAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end get chat
  },
})

export const { getCode , set_stored_code } = codeSlice.actions

export default codeSlice.reducer