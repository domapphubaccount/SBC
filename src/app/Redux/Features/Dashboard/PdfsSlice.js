import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";

// start get pdfs
export const getPdfsAction = createAsyncThunk(
  "pdfs/getPdfsAction",
  async (arg, { rejectWithValue }) => {
    const { token } = arg;
    console.log(token);
    try {
      const response = await axios.get(`${config.api}admin/all_files`, {
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
// end get role by id

// start delete pdf
export const deletePdfAction = createAsyncThunk(
  "pdfs/deletePdfAction",
  async (arg, { rejectWithValue }) => {
    console.log("dispatch");
    const { token, id } = arg;

    try {
      const response = await axios.delete(`${config.api}admin/force_delete_file/${id}`, {
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
// end delete pdf


// Start add PDF file
export const addpdffileAction = createAsyncThunk(
  "pdfs/addpdffileAction", // action name
  async (arg, { rejectWithValue }) => {
    const { token, section_id, file_path } = arg;

    // Create FormData object to handle file upload
    const formData = new FormData();
    formData.append("section_id", section_id);
    
    // Append each file to the FormData (assuming multiple files)
      formData.append("file_path[]", file_path);


    try {
      const response = await axios.post(
        `${config.api}admin/upload_file`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data", // Ensure correct content type
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
// End add PDF file

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

  editModule: false,
  roleModule: false,
};

export const pdfsSlice = createSlice({
  name: "pdfs",
  initialState,
  reducers: {
    editModule: (state, action) => {
      state.editModule = action.payload;
    },
    deleteModule: (state, action) => {
      state.deleteModule = action.payload;
    },
    addModule: (state, action) => {
      state.addModule = action.payload;
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
        state.error = action.payload.message;
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
        state.error = action.payload;
        console.log(action.payload)
      })
      // end add pdf file

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
        state.error = action.payload.message;
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
        state.error = action.payload.message;
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
        state.error = action.payload.message;
      });
    // end update user role
  },
});
export const { addModule, viewModule, closeView, deleteModule, editModule } =
  pdfsSlice.actions;

export default pdfsSlice.reducer;
