"use client"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";

// start get users
export const getUsersAction = createAsyncThunk(
  "users/getUsersAction",
  async (arg, { rejectWithValue }) => {
    const { token } = arg;
    console.log(token);
    try {
      const response = await axios.get(`${config.api}admin/users`, {
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
// end get users

// start get user by id
export const getUserByIDAction = createAsyncThunk(
  "users/getUserByIDAction",
  async (arg, { rejectWithValue }) => {
    const { token, id } = arg;
    console.log(arg)

    try {
      const response = await axios.get(`${config.api}admin/users/${id}`, {
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
// end get user by id

// start edit user
export const editUserAction = createAsyncThunk(
  "users/editUserAction",
  async (arg, { rejectWithValue }) => {
    console.log("dispatch");
    const { token, id, name, email } = arg;

    try {
      const response = await axios.put(
        `${config.api}admin/users/${id}`,
        { name, email },
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
// end edit user

// start add user
export const addUserAction = createAsyncThunk(
  "users/addUserAction",
  async (arg, { rejectWithValue }) => {
    const { token, name, email , password , password_confirmation } = arg;

    try {
      const response = await axios.post(
        `${config.api}admin/users`,
        { name, email , password , password_confirmation },
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
// end add user

// start delete user
export const deleteUserAction = createAsyncThunk(
  "users/deleteUserAction",
  async (arg, { rejectWithValue }) => {
    console.log("dispatch");
    const { token, id } = arg;

    try {
      const response = await axios.delete(`${config.api}admin/users/${id}`, {
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
// end delete user

// start edit user role
export const updateRoleAction = createAsyncThunk(
  "users/updateRoleAction",
  async (arg, { rejectWithValue }) => {
    console.log("dispatch");
    const { token, id, role } = arg;

    try {
      const response = await axios.post(
        `${config.api}users/${id}/attach-role`,
        { role },
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
  users: [],
  user: {},
  loading: false,
  updates: false,

  editModule: false,
  deleteModule: false,
  viewModule: false,
  roleModule: false,
  addModule:false
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addModule: (state,action)=>{
      state.addModule = action.payload 
    },
    removeUser: (state,action)=>{
      state.user = {}
    },
    editModule: (state , action) => {
      state.editModule = action.payload
    },
    deleteModule: (state , action) => {
      state.deleteModule = action.payload
    },
    viewModule: (state , action) => {
      state.viewModule = action.payload
    },
    roleModule: (state , action) => {
      state.roleModule = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      //start get users
      .addCase(getUsersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersAction.fulfilled, (state, action) => {
        state.error = null;
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getUsersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      // end get users

      //start get user by id
      .addCase(getUserByIDAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserByIDAction.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUserByIDAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end get user by id

      //start edit user
      .addCase(editUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.user = {};
        state.editModule = false
      })
      .addCase(editUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end edit user

      //start delete user
      .addCase(deleteUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.user = {};
        state.deleteModule = false;
      })
      .addCase(deleteUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end delete user

      //start update user role
      .addCase(updateRoleAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRoleAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.user = {};
        state.roleModule = false;
      })
      .addCase(updateRoleAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end update user role

      //start add user 
      .addCase(addUserAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.addModule = false
      })
      .addCase(addUserAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end add user 



  },
});
export const { removeUser , editModule , deleteModule , viewModule , roleModule , addModule } = usersSlice.actions

export default usersSlice.reducer;
