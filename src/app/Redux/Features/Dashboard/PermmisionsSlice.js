"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";
import { logout, removeAuthAction } from "../Auth/AuthSlice";
import RemoveAuth from "../RemoveAuth";

// start get permission
export const getPermissionsAction = createAsyncThunk(
  "permission/getPermissionsAction",
  async (arg, { rejectWithValue, dispatch }) => {
    const { token, page } = arg;
    try {
      const response = await axios.get(`${config.api}admin/all_permissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
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
// end get permission

// start get permission by id
export const getPermissionByIDAction = createAsyncThunk(
  "permission/getPermissionByIDAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, id } = arg;

    try {
      const response = await axios.get(`${config.api}admin/permissions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.error) {
        return new Error(response.data.error);
      }
      return response.data.data;
    } catch (error) {
      if (error?.response?.status === 401) {
        dispatch(removeAuthAction())
        RemoveAuth();
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end get permission by id

// start delete permission
export const deletePermissionAction = createAsyncThunk(
  "roles/deleteRoleAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, id } = arg;

    try {
      const response = await axios.delete(
        `${config.api}admin/permissions/${id}`,
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
        dispatch(removeAuthAction())
        RemoveAuth();
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end delete permission

// start add permission
export const addPermissionAction = createAsyncThunk(
  "users/addPermissionAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, name } = arg;

    try {
      const response = await axios.post(
        `${config.api}admin/permissions`,
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
        dispatch(removeAuthAction())
        RemoveAuth();
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end add permission

// start edit role
export const updatePermissionAction = createAsyncThunk(
  "roles/updatePermissionAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, id, name } = arg;

    try {
      const response = await axios.put(
        `${config.api}admin/permissions/${id}`,
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
        dispatch(removeAuthAction())
        RemoveAuth();
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end edit user role

const initialState = {
  permissions: [],
  permission: {},

  loading: false,
  updates: false,

  addModule: false,
  deleteModule: false,
  viewModule: false,

  editModule: false,
  roleModule: false,
};

export const permissionsSlice = createSlice({
  name: "permission",
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
      state.permission = {};
    },
    addModule: (state, action) => {
      state.addModule = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //start get permissions
      .addCase(getPermissionsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPermissionsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.permissions = action.payload;
        state.addModule = false;
      })
      .addCase(getPermissionsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // end get permisionss

      //start get permission by id
      .addCase(getPermissionByIDAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPermissionByIDAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.permission = action.payload;
      })
      .addCase(getPermissionByIDAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end get permission by id

      // start add permission
      .addCase(addPermissionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPermissionAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // state.permissions = action.payload;
        state.updates = !state.updates;
        state.addModule = false;
      })
      .addCase(addPermissionAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end add permission

      //start delete permission
      .addCase(deletePermissionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePermissionAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.permission = {};
        state.deleteModule = false;
      })
      .addCase(deletePermissionAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end delete permission

      //start update permission
      .addCase(updatePermissionAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePermissionAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.permission = {};
        state.editModule = false;
      })
      .addCase(updatePermissionAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
    // end update user role
  },
});
export const { addModule, viewModule, closeView, deleteModule, editModule } =
  permissionsSlice.actions;

export default permissionsSlice.reducer;
