"use client"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";
import { logout } from "../Auth/AuthSlice";

// start get pdfs
export const getPdfsAction = createAsyncThunk(
  "pdfs/getPdfsAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token , page } = arg;
    try {
      const response = await axios.get(`${config.api}admin/all_files?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "*/*",
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
      if(error?.response?.status === 401){
        dispatch(logout())
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end get pdfs

// start get role by id
export const getRoleByIDAction = createAsyncThunk(
  "roles/getRoleByIDAction",
  async (arg, { rejectWithValue }) => {
    const { token, id } = arg;

    try {
      const response = await axios.get(`${config.api}admin/roles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
          "Content-Type": "*/*",
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
// end get role by id

// start delete pdf
export const deletePdfAction = createAsyncThunk(
  "pdfs/deletePdfAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token, id } = arg;

    try {
      const response = await axios.delete(`${config.api}admin/soft_delete_file/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.error) {
        return new Error(response.data.error);
      }

      dispatch(handleAction(true))
      setTimeout(()=>dispatch(handleAction(false)) , 1500)

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end delete pdf


// Start add PDF file
export const addpdffileAction = createAsyncThunk(
  "pdfs/addpdffileAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token, name, section_id, file_path , type } = arg;

    // Create FormData object to handle file upload
    const formData = new FormData();

    formData.append("section_id", section_id);
    formData.append("name", name);
    formData.append("file_path", file_path); // Adjust this if the backend expects a different name
    formData.append("type",type);

    try {
      const response = await axios.post(
        `${config.api}admin/upload_file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.error) {
        return rejectWithValue(new Error(response.data.error));
      }

      dispatch(handleAction(true))
      setTimeout(()=>dispatch(handleAction(false)) , 1500)

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Start Assign user to PDF file
export const assignUserToPdfAction = createAsyncThunk(
  "pdfs/assignUserToPdfAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token, file_id, user_ids } = arg;

    try {
      const response = await axios.post(
        `${config.api}admin/assign-users-to-file`,
        {
          file_id , user_ids
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
        return rejectWithValue(new Error(response.data.error));
      }

      dispatch(handleAction(true))
      setTimeout(()=>dispatch(handleAction(false)) , 1500)


      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// End Assign user to PDF file

// start edit role
export const updateRoleAction = createAsyncThunk(
  "roles/updateRoleAction",
  async (arg, { rejectWithValue }) => {
    const { token, id, name } = arg;

    try {
      const response = await axios.put(
        `${config.api}admin/roles/${id}`,
        { name },
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
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end edit user role

const initialState = {
  pdfs: [],
  pdf: {},

  loading: false,
  updates: false,

  addModule: false,
  deleteModule: false,
  viewModule: false,
  assignModule: false,

  editModule: false,
  roleModule: false,
  total_pages: 1,
  error: null,
  action: false
};

export const pdfsSlice = createSlice({
  name: "pdfs",
  initialState,
  reducers: {
    viewModule: (state, action) => {
      state.viewModule = action.payload;
    },
    editModule: (state, action) => {
      state.editModule = action.payload;
    },
    deleteModule: (state, action) => {
      state.deleteModule = action.payload;
    },
    addModule: (state, action) => {
      state.addModule = action.payload;
    },
    closePdfError: (state)=>{
      state.error = null
    },
    assignModule: (state , action)=>{
      state.assignModule = action.payload;
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
      //start get pdfs
      .addCase(getPdfsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPdfsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.pdfs = action.payload;
        state.addModule = false;
      })
      .addCase(getPdfsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // end get pdfs

      // start add pdf file
      .addCase(addpdffileAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addpdffileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // state.roles = action.payload;
        state.updates = !state.updates;
        state.addModule = false;
      })
      .addCase(addpdffileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // end add pdf file

      // start assign user to pdf file
      .addCase(assignUserToPdfAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignUserToPdfAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.assignModule = false;
      })
      .addCase(assignUserToPdfAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // end assign user to pdf file

      //start delete pdf file
      .addCase(deletePdfAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePdfAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.deleteModule = false;
      })
      .addCase(deletePdfAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // end delete pdf file

      //start get role by id
      .addCase(getRoleByIDAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRoleByIDAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.role = action.payload;
      })
      .addCase(getRoleByIDAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // end get role by id

      //start update user role
      .addCase(updateRoleAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoleAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.role = {};
        state.editModule = false;
      })
      .addCase(updateRoleAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
    // end update user role
  },
});
export const { addModule, viewModule, closeView, deleteModule, editModule, closePdfError, assignModule, handlePages , handleAction } =
  pdfsSlice.actions;

export default pdfsSlice.reducer;
