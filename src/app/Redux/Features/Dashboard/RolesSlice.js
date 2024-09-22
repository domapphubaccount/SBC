"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";
import { logout } from "../Auth/AuthSlice";

// start get Roles
export const getRolesAction = createAsyncThunk(
  "roles/getRolesAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token } = arg;
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
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end get Roles

// start get role by id
export const getRoleByIDAction = createAsyncThunk(
  "roles/getRoleByIDAction",
  async (arg, { dispatch, rejectWithValue }) => {
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
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end get role by id

// start delete role
export const deleteRoleAction = createAsyncThunk(
  "roles/deleteRoleAction",
  async (arg, { dispatch, rejectWithValue }) => {
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
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end delete role

// start add role
export const addRoleAction = createAsyncThunk(
  "users/addRoleAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, name, permissions } = arg;

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

      console.log(response.data);

      if (permissions && response.data?.data?.id) {
        dispatch(
          assignPermissionAction({
            token,
            id: response.data?.data?.id,
            permissions: permissions, // This should be sent as the array of permission IDs
          })
        );
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
// end add role

// start assign permission to role
export const assignPermissionAction = createAsyncThunk(
  "users/assignPermissionAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, id, permissions } = arg;
    try {
      const response = await axios.post(
        `${config.api}admin/roles/${id}/assign-permissions`,
        { permissions },
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
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end assign permission to role

// start edit role
export const updateRoleAction = createAsyncThunk(
  "roles/updateRoleAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, id, name, permissions } = arg;

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

      if (permissions && response.data?.message) {
        dispatch(
          assignPermissionAction({
            token,
            id,
            permissions, 
          })
        );
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
  roles: [],
  role: {},

  loading: false,
  updates: false,

  addModule: false,
  deleteModule: false,
  viewModule: false,

  editModule: false,
  roleModule: false,

  editPermissionsModule: false,
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
    editPermissionsModule: (state, action) => {
      state.editPermissionsModule = action.payload;
    },
    closeView: (state, action) => {
      state.role = {};
    },
    addModule: (state, action) => {
      state.addModule = action.payload;
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
        state.error = action.payload?.message;
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

      // start assign PermissionAction
      .addCase(assignPermissionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignPermissionAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.editPermissionsModule = false;
      })
      .addCase(assignPermissionAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // end assign PermissionAction

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
export const {
  addModule,
  viewModule,
  closeView,
  deleteModule,
  editModule,
  editPermissionsModule,
} = rolesSlice.actions;

export default rolesSlice.reducer;
