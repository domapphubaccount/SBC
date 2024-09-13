import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";

// start get history
export const getHistoryAction = createAsyncThunk(
  "history/getHistoryAction",
  async (arg, { rejectWithValue }) => {
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      //start get history
      .addCase(getHistoryAction.pending, (state) => {
        state.loading = true;
        state.error = null;
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
export default historySlice.reducer;
