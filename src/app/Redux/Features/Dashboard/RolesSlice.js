"use client"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";

// start get Roles
export const getRolesAction = createAsyncThunk(
  "roles/getRolesAction",
  async (arg, { rejectWithValue }) => {
    const { token } = arg;
    console.log(token);
    try {
      const response = await axios.get(`${config.api}admin/roles`, {
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
// end get Roles

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

// start delete role
export const deleteRoleAction = createAsyncThunk(
  "roles/deleteRoleAction",
  async (arg, { rejectWithValue }) => {
    console.log("dispatch");
    const { token, id } = arg;

    try {
      const response = await axios.delete(`${config.api}admin/roles/${id}`, {
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
// end delete role


// start add role
export const addRoleAction = createAsyncThunk(
  "users/addRoleAction",
  async (arg, { rejectWithValue }) => {
    console.log("dispatch");
    const { token, name } = arg;

    try {
      const response = await axios.post(
        `${config.api}admin/roles`,
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
// end add role

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
  roles: [],
  role: {},

  loading: false,
  updates: false,

  addModule: false,
  deleteModule: false,
  viewModule: false,

  editModule: false,
  roleModule: false,
};

export const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    editModule: (state, action) => {
      state.editModule = action.payload;
    },
    deleteModule: (state, action) => {
      state.deleteModule = action.payload;
    },
    viewModule: (state, action) => {
      state.viewModule = action.payload;
    },
    closeView: (state, action) => {
      state.role = {};
    },
    addModule: (state, action) => {
      state.addModule = action.payload;
      console.log("w3", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      //start get roles
      .addCase(getRolesAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRolesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.roles = action.payload;
        state.addModule = false;
      })
      .addCase(getRolesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end get roles

      // start add role
      .addCase(addRoleAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRoleAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.roles = action.payload;
        state.updates = !state.updates;
        state.addModule = false;
      })
      .addCase(addRoleAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end add role

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

      //start delete role
      .addCase(deleteRoleAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoleAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.role = {};
        state.deleteModule = false;
      })
      .addCase(deleteRoleAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end delete role

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
  rolesSlice.actions;

export default rolesSlice.reducer;
