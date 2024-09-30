"use client"

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";
import { logout } from "../Auth/AuthSlice";

// start get comments
export const getCommentsAction = createAsyncThunk(
  "comments/getCommentsAction",
  async (arg, { rejectWithValue }) => {
    const { token } = arg;
    try {
      const response = await axios.get(`${config.api}admin/chat-user-dislikes`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
console.log(response.data)
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
  async (arg, { dispatch , rejectWithValue }) => {
    const { token, id } = arg;

    try {
      const response = await axios.get(`${config.api}admin/chat-user-dislikes/${id}`, {
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
      if(error?.response?.status === 401){
        dispatch(logout())
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end get comment by id

// start delete role
export const deleteCommentAction = createAsyncThunk(
  "roles/deleteRoleAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token, id } = arg;

    try {
      const response = await axios.delete(`${config.api}admin/chat-user-dislikes/force_delete/${id}`, {
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
      if(error?.response?.status === 401){
        dispatch(logout())
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end delete role

// start add review
export const addReviewAction = createAsyncThunk(
  "comments/addReviewAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token, id , comment , status } = arg;

    try {
      const response = await axios.post(
        `${config.api}admin/reviews`,
        { 
          chat_user_dislike_id: id,
          comment_reviewr: comment,
          status
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
      return response.data.data;
    } catch (error) {
      if(error?.response?.status === 401){
        dispatch(logout())
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end add role

// start edit role
export const updateCommentAction = createAsyncThunk(
  "comments/updateCommentAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token, id, comment } = arg;

    try {
      const response = await axios.put(
        `${config.api}admin/chat-user-dislikes/${id}`,
        { "user_chat_id" : id,comment },
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
      if(error?.response?.status === 401){
        dispatch(logout())
      }
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
  reviewerModel: false,

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
    },
    reviewerModel: (state, action) => {
      state.reviewerModel = action.payload
    }
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
        state.error = action.payload;
      })
      // end get comment

      // start add review
      .addCase(addReviewAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.addModule = false;
      })
      .addCase(addReviewAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end add review

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

      //start delete comment
      .addCase(deleteCommentAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.comment = {};
        state.deleteModule = false;
      })
      .addCase(deleteCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end delete comment

      //start update user comment
      .addCase(updateCommentAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.role = {};
        state.editModule = false;
      })
      .addCase(updateCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end update user comment
  },
});
export const { addModule, viewModule, closeView, deleteModule, editModule, reviewerModel } =
userCommentsSlice.actions;

export default userCommentsSlice.reducer;
