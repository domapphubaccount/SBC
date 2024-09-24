"use client";

import { config } from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../Auth/AuthSlice";

// start get pdfs
export const getChatAction = createAsyncThunk(
  "chat/getChatAction",
  async (arg, { dispatch , rejectWithValue }) => {
    const { token, chat_id } = arg;
    try {
      const response = await axios.get(`${config.api}get_chat/${chat_id}`, {
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
// end get pdfs

// start add question
export const addQuestionAction = createAsyncThunk(
  "chat/addQuestionAction",
  async (arg, { rejectWithValue }) => {
    const { token, question, thread_id, files } = arg;

    try {
      const response = await axios.post(
        `${config.api}ask_question`,
        {
          question,
          thread_id,
          "file_ids[]": files.join(","),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// end add question

const initialState = {
  value: 0,
  chat_data: [],
  conversation: [],
  get_chat: "",
  chat_code: "",
  loading: false,


  // start chatInput
  input: {
    loading: false,
    error: null
  }
  // end chatInput
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getChatCode: (state, action) => {
      state.chat_code = action.payload;
    },
    getChatHistory: (state, action) => {
      state.value = action.payload;
    },
    getChatData: (state, action) => {
      state.chat_data = action.payload;
    },
    getConversation: (state, action) => {
      state.conversation = action.payload;
    },
    choseChate: (state, action) => {
      state.get_chat = action.payload;
    },
    send_success: (state, action) => {
      const userChats = state.chat_data;
      if (userChats.length > 0) {
        userChats[userChats.length - 1].answer = action.payload.answer;
        if (userChats.length > 1 && userChats[userChats.length - 2].id) {
          userChats[userChats.length - 1].id =
            userChats[userChats.length - 2].id + 1;
        } else {
          state.first_message = !state.first_message;
        }
      }
      state.loading = false;
    },
    send_failed: (state, action) => {
      if (state.chat_data.length > 0) {
        state.chat_data[
          state.chat_data.length - 1
        ].answer = `<div style=font-weight:800> Sorry there is an ERROR please try again ${action.payload} </div>`;
      }
      state.loading = false;
    },
    chat_out: (state, action) => {
      localStorage.removeItem("chat")
      return {
        ...state,
        value: 0,
        chat_data: [],
        conversation: [],
        get_chat: "",
        chat_code: "",
      };
    },
    loading_main_chat: (state , action) => {
      state.loading = action.payload
    },
    // loading chat
    chatSlice_loading: (state, action) => {
      state.loading = action.payload;
    },
    // loading chat

    // start chat error
    error_start_chat: (state, action) => {
      state.error = action.payload;
    }
    // end chat error
  },
  extraReducers: (builder) => {
    builder
      //start get chat
      .addCase(getChatAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatAction.fulfilled, (state, action) => {
        state.conversation = action.payload;
        state.chat_data = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getChatAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // end get chat

      // start add question
      .addCase(addQuestionAction.pending, (state) => {
        state.input.loading = true;
        state.input.error = null;
      })
      .addCase(addQuestionAction.fulfilled, (state, action) => {
        state.input.error = null;
        state.input.loading = false;
      })
      .addCase(addQuestionAction.rejected, (state, action) => {
        state.input.error = action.payload;
        state.input.loading = false;
      });
    // end add question
  },
});

export const {
  chatSlice_loading,
  getChatCode,
  getChatHistory,
  getChatData,
  getConversation,
  get_chat,
  choseChate,
  send_success,
  send_failed,
  chat_out,
  loading_main_chat,
  error_start_chat
} = chatSlice.actions;

export default chatSlice.reducer;
