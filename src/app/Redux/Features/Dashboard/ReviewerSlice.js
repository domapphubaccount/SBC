"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";
import { logout } from "../Auth/AuthSlice";

// start get reviews
export const getReviewsAction = createAsyncThunk(
  "reviews/getReviewsAction",
  async (arg, { rejectWithValue }) => {
    const { token } = arg;
    try {
      const response = await axios.get(`${config.api}admin/reviews`, {
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
      return rejectWithValue(error.response.data);
    }
  }
);
// end get comments

// start get comment by id
// export const getCommentByIDAction = createAsyncThunk(
//   "roles/getRoleByIDAction",
//   async (arg, { dispatch , rejectWithValue }) => {
//     const { token, id } = arg;

//     try {
//       const response = await axios.get(`${config.api}admin/chat-user-dislikes/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//             "Content-Type": "application/json",
//         },
//       });

//       if (response.data.error) {
//         return new Error(response.data.error);
//       }
//       return response.data.data;
//     } catch (error) {
//       if(error?.response?.status === 401){
//         dispatch(logout())
//       }
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// end get comment by id

// start delete role
export const deleteReviewsAction = createAsyncThunk(
  "reviews/deleteReviewsAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, id } = arg;

    try {
      const response = await axios.delete(`${config.api}admin/reviews/${id}`, {
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
// end delete role

// start add review
export const addReviewAction = createAsyncThunk(
  "reviews/addReviewAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, chat_user_dislike_id , comment_reviewer , comment_super_reviewer , super_reviewr_id , status } = arg;

    try {
      const response = await axios.post(
        `${config.api}admin/reviews`,
        { chat_user_dislike_id , comment_reviewer , comment_super_reviewer , super_reviewr_id , status },
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
// end add role

// start edit role
export const updateReviewAction = createAsyncThunk(
  "reviews/updateCommentAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const {
      token,
      id,
      chat_user_dislike_id,
      comment_reviewer,
      comment_super_reviewer,
      status,
    } = arg;

    console.log(arg)

    try {
      const response = await axios.put(
        `${config.api}admin/reviews/${id}`,
        {
          chat_user_dislike_id,
          comment_reviewer,
          comment_super_reviewer,
          status,
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
      if (error?.response?.status === 401) {
        dispatch(logout());
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end edit user role

const initialState = {
  review: [],
  reviews: [],

  loading: false,
  updates: false,

  addModule: false,
  deleteModule: false,
  viewModule: false,
  reviewerModel: false,

  editModule: false,
  roleModule: false,
};

export const ReviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    editModule: (state, action) => {
      state.editModule = action.payload;
      state.editModule = action.payload.open;
      state.review = action.payload.review || "";
    },
    deleteModule: (state, action) => {
      state.deleteModule = action.payload.open;
      state.review = action.payload.review || "";
    },
    viewModule: (state, action) => {
      console.log(action.payload, "+-+-+");
      state.viewModule = action.payload.open;
      state.review = action.payload.review || "";
    },
    closeView: (state, action) => {
      state.role = {};
    },
    addModule: (state, action) => {
      state.addModule = action.payload;
    },
    reviewerModel: (state, action) => {
      state.reviewerModel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //start get reviews
      .addCase(getReviewsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReviewsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload);
        state.reviews = action.payload;
        state.addModule = false;
      })
      .addCase(getReviewsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // end get reviews

      // start add role
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
      // end add role

      //start get comment by id
      // .addCase(getCommentByIDAction.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(getCommentByIDAction.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.error = null;
      //   state.comment = action.payload;
      // })
      // .addCase(getCommentByIDAction.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload.message;
      // })
      // end get comment by id

      //start delete comment
      .addCase(deleteReviewsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReviewsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.comment = {};
        state.deleteModule = false;
      })
      .addCase(deleteReviewsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // end delete comment

      //start update user comment
      .addCase(updateReviewAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReviewAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.role = {};
        state.editModule = false;
      })
      .addCase(updateReviewAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // end update user comment
  },
});
export const {
  addModule,
  viewModule,
  closeView,
  deleteModule,
  editModule,
  reviewerModel,
} = ReviewSlice.actions;

export default ReviewSlice.reducer;
