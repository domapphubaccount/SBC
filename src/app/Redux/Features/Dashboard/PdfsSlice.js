"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";
import { logout } from "../Auth/AuthSlice";
import RemoveAuth from "../RemoveAuth";
import { handleProgressFunction } from "./Progress/Progress";

// start get pdfs
export const getPdfsAction = createAsyncThunk(
  "pdfs/getPdfsAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, page, fileType } = arg;
    try {
      const response = await axios.get(
        `${config.api}admin/all_files?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "*/*",
          },
        }
      );

      if (response.data.error) {
        return new Error(response.data.error);
      }

      if (fileType == 0) {
        dispatch(setAllData(response.data.data));
      } else {
        dispatch(
          setAllData(response.data.data.filter((item) => item.type == 1))
        );
      }
      dispatch(setPage(1))
      return response.data.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        RemoveAuth();
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end get pdfs

// start get pdfs
export const getDeletedPdfsAction = createAsyncThunk(
  "pdfs/getDeletedPdfsAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, page, fileType } = arg;
    try {
      const response = await axios.get(
        `${config.api}admin/all_files/soft_deleted`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "*/*",
          },
        }
      );

      if (response.data.error) {
        return new Error(response.data.error);
      }

      if (fileType == 0) {
        dispatch(setAllData(response.data.data));
      } else {
        dispatch(
          setAllData(response.data.data.filter((item) => item.type == 1))
        );
      }
      dispatch(setPage(1))
      return response.data.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        RemoveAuth();
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end get pdfs

// start get role by id
export const getRoleByIDAction = createAsyncThunk(
  "roles/getRoleByIDAction",
  async (arg, { rejectWithValue, dispatch }) => {
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
      if (error?.response?.status === 401) {
        RemoveAuth();
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end get role by id

// start delete pdf
export const deletePdfAction = createAsyncThunk(
  "pdfs/deletePdfAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, id } = arg;

    try {
      const response = await axios.delete(
        `${config.api}admin/soft_delete_file/${id}`,
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

      dispatch(handleAction(true));
      setTimeout(() => dispatch(handleAction(false)), 1500);

      return response.data.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        RemoveAuth();
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end delete pdf
// start delete pdf force
export const deleteForcePdfAction = createAsyncThunk(
  "pdfs/deleteForcePdfAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, id } = arg;

    try {
      const response = await axios.delete(
        `${config.api}admin/force_delete_file/${id}`,
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

      dispatch(handleAction(true));
      setTimeout(() => dispatch(handleAction(false)), 1500);

      return response.data.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        RemoveAuth();
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end delete pdf force

// Start add PDF file
export const addpdffileAction = createAsyncThunk(
  "pdfs/addpdffileAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, name, section_id, file_path, type } = arg;

    // Create FormData object to handle file upload
    const formData = new FormData();

    formData.append("section_id", section_id);
    formData.append("name", name);
    formData.append("file_path", file_path); // Adjust this if the backend expects a different name
    formData.append("type", type);

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
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const progress = Math.round((loaded / total) * 100);
            console.log(`Upload progress: ${progress}%`);

            handleProgressFunction(progress,dispatch)
          },
        }
      );

      if (response.data.error) {
        return rejectWithValue(new Error(response.data.error));
      }

      dispatch(handleAction(true));
      setTimeout(() => dispatch(handleAction(false)), 1500);

      return response.data.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        RemoveAuth();
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Start Assign user to PDF file
export const assignUserToPdfAction = createAsyncThunk(
  "pdfs/assignUserToPdfAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, file_id, user_ids } = arg;

    try {
      const response = await axios.post(
        `${config.api}admin/assign-users-to-file`,
        {
          file_id,
          user_ids,
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

      dispatch(handleAction(true));
      setTimeout(() => dispatch(handleAction(false)), 1500);

      return response.data.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// End Assign user to PDF file

// start edit role
export const restorePdfAction = createAsyncThunk(
  "pdfs/restorePdfAction",
  async (arg, { rejectWithValue, dispatch }) => {
    const { token, id } = arg;

    try {
      const response = await axios.put(
        `${config.api}admin/${id}/restore`,
        {},
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
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end edit user role

// start edit role
export const updateRoleAction = createAsyncThunk(
  "roles/updateRoleAction",
  async (arg, { rejectWithValue, dispatch }) => {
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
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
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
  restoreModule: false,
  forceDeleteModule:false,

  editModule: false,
  roleModule: false,
  total_pages: 1,
  error: null,
  action: false,

  // pagination
  allData: [],
  displayedData: [],
  currentPage: 1,
  itemsPerPage: 10,
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
    forceDeleteModule: (state, action) => {
      state.forceDeleteModule = action.payload;
    },
    addModule: (state, action) => {
      state.addModule = action.payload;
    },
    restoreModule: (state , action) => {
      state.restoreModule = action.payload
    },
    closePdfError: (state) => {
      state.error = null;
    },
    assignModule: (state, action) => {
      state.assignModule = action.payload;
    },
    handlePages: (state, action) => {
      state.total_pages = action.payload;
    },
    handleAction: (state, action) => {
      state.action = action.payload;
    },

    // pagination
    setAllData: (state, action) => {
      state.allData = action.payload;
      state.displayedData = state.allData.slice(0, 10);
    },
    setDisplayedData: (state, action) => {
      state.displayedData = action.payload;
    },
    resetData: (state) => {
      state.allData = [];
      state.displayedData = [];
      state.currentPage = 1;
    },
    setPage: (state, action) => {
      const page = action.payload;
      state.currentPage = page;
      const startIndex = (page - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      state.displayedData = state.allData.slice(startIndex, endIndex);
    },
    removeData: (state, action) => {
      state.displayedData = [];
      state.allData = [];
    },
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

      //start get deleted pdfs
      .addCase(getDeletedPdfsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDeletedPdfsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.pdfs = action.payload;
        state.addModule = false;
      })
      .addCase(getDeletedPdfsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // end get deleted pdfs

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

      // start restore pdf file
      .addCase(restorePdfAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(restorePdfAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.restoreModule = false;
      })
      .addCase(restorePdfAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // end restore pdf file

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

      //start force delete pdf file
      .addCase(deleteForcePdfAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteForcePdfAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.forceDeleteModule = false;
      })
      .addCase(deleteForcePdfAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // end force delete pdf file

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
export const {
  addModule,
  viewModule,
  closeView,
  deleteModule,
  editModule,
  closePdfError,
  assignModule,
  handlePages,
  handleAction,
  setAllData,
  setDisplayedData,
  resetData,
  setPage,
  removeData,
  restoreModule,
  forceDeleteModule
} = pdfsSlice.actions;

export default pdfsSlice.reducer;
