"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { config } from "@/config/config";
import { logout, removeAuthAction } from "../Auth/AuthSlice";
import RemoveAuth from "../RemoveAuth";
import { reviewerModel as revMode } from "./UsersCommentsSlice";

// start get reviews
export const getReviewsAction = createAsyncThunk(
  "reviews/getReviewsAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, page } = arg;
    try {
      const response = await axios.get(
        `${config.api}admin/reviews?page=${page}`,
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
      if (response.data?.last_page) {
        dispatch(handlePages(response.data?.last_page));
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
// end get reviews

// start delete reviews
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
      dispatch(handleAction(true));
      setTimeout(() => dispatch(handleAction(false)), 1500);

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
// end delete reviews

// start add review
export const addReviewAction = createAsyncThunk(
  "reviews/addReviewAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const {
      token,
      chat_user_dislike_id,
      comment_reviewr,
      comment_super_reviewr,
      super_reviewr_id,
      status,
    } = arg;

    try {
      const response = await axios.post(
        `${config.api}admin/create/reviews`,
        {
          chat_user_dislike_id,
          comment_reviewr,
          comment_super_reviewr,
          super_reviewr_id,
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

      dispatch(handleAction(true));
      setTimeout(() => dispatch(handleAction(false)), 1500);
      dispatch(revMode(true))

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
// end add reviews

// start edit review
export const updateReviewAction = createAsyncThunk(
  "reviews/updateReviewAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const {
      token,
      id,
      chat_user_dislike_id,
      comment_reviewr,
      comment_super_reviewr,
      status,
    } = arg;

    try {
      const response = await axios.put(
        `${config.api}admin/reviews/${id}`,
        {
          chat_user_dislike_id,
          comment_reviewr,
          comment_super_reviewr,
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

      if (response.data?.meta?.total) {
        dispatch(handlePages(response.data?.meta?.total));
      }
      dispatch(revMode(false))

      dispatch(handleAction(true));
      setTimeout(() => dispatch(handleAction(false)), 1500);

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
// end edit user reviews

// start train
export const trainAction = createAsyncThunk(
  "reviews/trainAction",
  async (arg, { dispatch, rejectWithValue }) => {
    const { token, new_data , id } = arg;

    try {
      const response = await axios.get(
        `${config.api}admin/create/instruction/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          params: {
            new_data: new_data,
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
        dispatch(removeAuthAction())
        RemoveAuth();
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end train

const initialState = {
  review: [],
  reviews: [],

  loading: false,
  updates: false,

  addModule: false,
  deleteModule: false,
  viewModule: false,
  reviewerModel: false,
  trainModule: false,

  editModule: false,
  roleModule: false,
  action: false,

  total_pages: 1,
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
    trainModule: (state, action) => {
      state.trainModule = action.payload.open;
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
    handlePages: (state, action) => {
      state.total_pages = action.payload;
    },
    handleAction: (state, action) => {
      state.action = action.payload;
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
        state.reviews = action.payload;
        state.addModule = false;
      })
      .addCase(getReviewsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // end get reviews

      // start add reviews
      .addCase(addReviewAction.pending, (state) => {
        state.loading = true;
        state.error = true;
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.updates = !state.updates;
        state.addModule = false;
      })
      .addCase(addReviewAction.rejected, (state, action) => {
        console.log('error' , action.payload)

        state.loading = false;
        state.error = action.payload.message;
      })
      // end add reviews

      //start get comment by id
      .addCase(trainAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(trainAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.trainModule = false;
        state.updates = !state.updates;
      })
      .addCase(trainAction.rejected, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.error = action.payload?.error;
      })
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
        console.log(action.payload)
        state.loading = false;
        state.error = action.payload?.message;
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
  trainModule,
  handlePages,
  handleAction,
} = ReviewSlice.actions;

export default ReviewSlice.reducer;
