import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";

// start login
export const getCommentsAction = createAsyncThunk(
  "usersComments/getCommentsAction",
  async (arg, { rejectWithValue }) => {
    const { token } = arg;
    try {
      const response = await axios.get(
        `${config.api}admin/chat-user-dislikes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
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

export const userCommentsSlice = createSlice({
  name: "usersComments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //start login
      .addCase(getCommentsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentsAction.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
      })
      .addCase(getCommentsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // end login

  },
});

export default userCommentsSlice.reducer