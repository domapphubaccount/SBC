import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";

// start login
export const dashboardAction = createAsyncThunk(
  "dashboard/dashboardAction",
  async (arg, { rejectWithValue }) => {
    const { email, password } = arg;
    try {
      const response = await axios.post(
        `${config.api}login?email=${email}&password=${password}`,
        {
          email: email,
          password: password,
        }
      );

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end login


const initialState = {
  values: null
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //start login
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // end login

  },
});

export default dashboardSlice.reducer