"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "@/config/config";
import axios from "axios";
import { logout } from "../Auth/AuthSlice";
import RemoveAuth from "../RemoveAuth";

// start get sections
export const getCodeAction = createAsyncThunk(
  "code/getCodeAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token } = arg;
    try {
      const response = await axios.get(`${config.api}admin/section_pdf`, {
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
      if (error?.response?.status === 401) {
        RemoveAuth()
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);
// end get sections

const initialState = {
  value: "",
  storedCode: [],
  error: null,
};

export const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    getCode: (state, action) => {
      state.value = action.payload;
    },
    set_direct_code: (state, action) => {
      state.storedCode = action.payload;
    },
    set_stored_code: (state, action) => {
      if (state.storedCode.length < 5) {
        if (state.storedCode.some((item) => item === action.payload)) {
          state.storedCode = state.storedCode.filter(
            (item) => item !== action.payload
          );
        } else {
          state.storedCode.push(action.payload);
        }
      } else {
        state.storedCode = state.storedCode.filter(
          (item) => item !== action.payload
        );
      }
    },
    set_multi_stored_Code: (state, action) => {
      const codesToAddOrRemove = action.payload;
      const allCodesExist = codesToAddOrRemove.every((code) =>
        state.storedCode.includes(code)
      );

      if (allCodesExist) {
        state.storedCode = state.storedCode.filter(
          (code) => !codesToAddOrRemove.includes(code)
        );
      } else {
        state.storedCode = [
          ...state.storedCode,
          ...codesToAddOrRemove.filter(
            (code) => !state.storedCode.includes(code)
          ),
        ];
      }
    },
    set_code_error: (state, action) => {
      state.error = action.payload;
    },
    clear_code_error: (state) => {
      state.error = null;
    },
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
        state.value = action.payload;
      })
      .addCase(getCodeAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end get chat
  },
});

export const {
  getCode,
  set_stored_code,
  set_code_error,
  clear_code_error,
  set_multi_stored_Code,
  set_direct_code,
} = codeSlice.actions;

export default codeSlice.reducer;
