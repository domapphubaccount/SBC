import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";
import { updateAction } from "./DashboardSlice";

// start login
export const getSectionsAction = createAsyncThunk(
  "sections/getSectionsAction",
  async (arg, { rejectWithValue }) => {
    const { token } = arg;
    console.log(token);
    try {
      const response = await axios.get(`${config.api}admin/sections`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.error) {
        return new Error(response.data.error);
      }
      dispatch(updateAction())
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end login

// start add section
export const addSectionAction = createAsyncThunk(
  "sections/addSectionAction",
  async (arg, { rejectWithValue , dispatch }) => {
    const { token, name } = arg;
    console.log(token);
    try {
      const response = await axios.post(
        `${config.api}admin/sections`,
        {
          name,
        },
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
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end add section

const initialState = {
  sections: [],
  loading: false,
  error: false,
};

export const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //start get all sections
      .addCase(getSectionsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSectionsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(getSectionsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // end get all sections

      //start add new section
      .addCase(addSectionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSectionAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;

      })
      .addCase(addSectionAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end add new section
  },
});

export default sectionsSlice.reducer;
