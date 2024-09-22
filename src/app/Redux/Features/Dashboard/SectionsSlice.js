"use client"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";
import { logout } from "../Auth/AuthSlice";

// start get section
export const getSectionsAction = createAsyncThunk(
  "sections/getSectionsAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token } = arg;
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
      return response.data.data;
    } catch (error) {
      if(error?.response?.status === 401){
        dispatch(logout())
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end get section

// start add section
export const addSectionAction = createAsyncThunk(
  "sections/addSectionAction",
  async (arg, { rejectWithValue, dispatch }) => {
    const { token, name } = arg;
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
      if(error?.response?.status === 401){
        dispatch(logout())
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end add section

// start delete section
export const deleteSectionAction = createAsyncThunk(
  "sections/deleteSectionAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token, id } = arg;
    try {
      const response = await axios.delete(`${config.api}admin/sections/${id}`, {
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
      if(error?.response?.status === 401){
        dispatch(logout())
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end delete section

// start edit section
export const editSectionAction = createAsyncThunk(
  "sections/editSectionAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token, id ,name} = arg;
    try {
      const response = await axios.put(`${config.api}admin/sections/${id}`, {
        name
      },{
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
      if(error?.response?.status === 401){
        dispatch(logout())
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end edit section

const initialState = {
  sections: [],
  loading: false,
  error: false,
  updates: false,

  section_ID: {
    id: null,
    name: null,
  },

  addModule: false,
  deleteModule: false,
  editModule: false,

  viewModule: false,
};

export const sectionsSlice = createSlice({
  name: "sections",
  initialState,
  reducers: {
    getSectionId: (state, action) => {
      state.section_ID = {
        id: action.payload.id,
        name: action.payload.name,
      };
    },
    addModule: (state, action) => {
      state.addModule = action.payload;
    },
    editModule: (state, action) => {
      state.editModule = action.payload;
    },
    deleteModule: (state, action) => {
      state.deleteModule = action.payload;
    },
    viewModule: (state, action) => {
      state.viewModule = action.payload;
    },
  },
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
        state.updates = !state.updates;
        state.addModule = false;
      })
      .addCase(addSectionAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // end add new section

      //start delete section
      .addCase(deleteSectionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSectionAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.updates = !state.updates;
        state.deleteModule = false;
        state.section_ID = {id:null,name:null};
      })
      .addCase(deleteSectionAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // end delete section

      //start edit section
      .addCase(editSectionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editSectionAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.updates = !state.updates;
        state.section_ID = {id:null,name:null};
        state.editModule = false;
      })
      .addCase(editSectionAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end edit section
  },
});

export const { editModule, deleteModule, viewModule, addModule, getSectionId } =
  sectionsSlice.actions;

export default sectionsSlice.reducer;
