"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";
import { logout } from "../Auth/AuthSlice";
import { addpdffileAction } from "./PdfsSlice";

// start get section
export const getSectionsAction = createAsyncThunk(
  "sections/getSectionsAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token , page } = arg;
    try {
      const response = await axios.get(`${config.api}admin/sections?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.error) {
        return new Error(response.data.error);
      }
      if(response.data?.meta?.last_page){
        dispatch(handlePages(response.data?.meta?.last_page))
      }
      return response.data.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout());
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
    const { token, name, file_path , fileName } = arg;
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
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.error) {
        return new Error(response.data.error);
      }
      // if (file_path && response.data?.data?.id) {
      //   dispatch(
      //     addpdffileAction({
      //       name: fileName,
      //       token,
      //       section_id: response.data?.data?.id,
      //       file_path,
      //     })
      //   );
      // }
      dispatch(handleAction(true))
      setTimeout(()=>dispatch(handleAction(false)) , 1500)
      
      return response.data.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end add section

// start delete section
export const deleteSectionAction = createAsyncThunk(
  "sections/deleteSectionAction",
  async (arg, { dispatch, rejectWithValue }) => {
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
      dispatch(handleAction(true))
      setTimeout(()=>dispatch(handleAction(false)) , 1500)


      return response.data.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end delete section

// start edit section
export const editSectionAction = createAsyncThunk(
  "sections/editSectionAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, id, name , file_path } = arg;
    try {
      const response = await axios.put(
        `${config.api}admin/sections/${id}`,
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

      if (file_path && response.data?.data?.id) {
        dispatch(
          addpdffileAction({
            token,
            section_id: response.data?.data?.id,
            file_path,
          })
        );
      }

      dispatch(handleAction(true))
      setTimeout(()=>dispatch(handleAction(false)) , 1500)


      return response.data.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout());
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

  total_pages: 1,
  action: false
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
    removeError: (state)=>{
      state.error = null
    },
    handlePages: (state , action) => {
      state.total_pages = action.payload
    },
    handleAction: (state , action) => {
      state.action = action.payload
    }
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
        state.error = action.payload?.message;
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
        state.error = action.payload?.message;
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
        state.section_ID = { id: null, name: null };
      })
      .addCase(deleteSectionAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
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
        state.section_ID = { id: null, name: null };
        state.editModule = false;
      })
      .addCase(editSectionAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
    // end edit section
  },
});

export const { editModule, deleteModule, viewModule, addModule, getSectionId, removeError , handlePages , handleAction } =
  sectionsSlice.actions;

export default sectionsSlice.reducer;
