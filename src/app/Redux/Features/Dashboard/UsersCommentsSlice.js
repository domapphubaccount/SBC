"use client"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";

// start get comments
export const getCommentsAction = createAsyncThunk(
  "comments/getCommentsAction",
  async (arg, { rejectWithValue }) => {
    const { token } = arg;
    console.log(token);
    try {
      const response = await axios.get(`${config.api}admin/chat-user-dislikes`, {
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
// end get comments

// start get comment by id
export const getCommentByIDAction = createAsyncThunk(
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
// end get comment by id

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
  comments: [],
  comment: {},

  loading: false,
  updates: false,

  addModule: false,
  deleteModule: false,
  viewModule: false,

  editModule: false,
  roleModule: false,
};

export const userCommentsSlice = createSlice({
  name: "comments",
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
      //start get comment
      .addCase(getCommentsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.comments = action.payload;
        state.addModule = false;
      })
      .addCase(getCommentsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end get comment

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

      //start get comment by id
      .addCase(getCommentByIDAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentByIDAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.comment = action.payload;
      })
      .addCase(getCommentByIDAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end get comment by id

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
userCommentsSlice.actions;

export default userCommentsSlice.reducer;
