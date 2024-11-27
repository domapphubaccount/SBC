"use client";

import { config } from "@/config/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { logout } from "../Auth/AuthSlice";
import RemoveAuth from "../RemoveAuth";
import { Errors } from "./ChatErrors";

// if ($ErrorCode == 400 or $ErrorCode == 404 or $ErrorCode == 413) {
//   $messages = [
//       "Error Code 1002 Technical difficulties are preventing us from proceeding. Kindly contact support.",
//       "Error Code 1002 We’re currently dealing with a technical problem. Please contact support for help.",
//       "Error Code 1002 A technical issue has interrupted the process. Please reach out to support.",
//       "Error Code 1002 We’ve encountered a technical problem. Please contact support for assistance.",
//       "Error Code 1002 A technical malfunction has occurred. Please get in touch with technical support."
//   ];
//   return $messages[array_rand($messages)];
// }else if ($ErrorCode == 401 or $ErrorCode == 403 or $ErrorCode == 429) {
//   $messages = [
//       "Error Code 1001 We’re experiencing a technical issue. Please contact support for assistance.",
//       "Error Code 1001 A technical problem has occurred. Kindly reach out to support for help.",
//       "Error Code 1001 There seems to be a technical glitch. Please contact technical support.",
//       "Error Code 1001 We’re facing a technical issue. Please get in touch with support for resolution.",
//       "Error Code 1001 A technical error has been detected. Please contact support for further assistance."
//   ];

//   return $messages[array_rand($messages)];
// }else if ($ErrorCode == 500 or $ErrorCode == 502 or $ErrorCode == 503 or $ErrorCode == 504) {
//   $messages = [
//       "Error Code 1003 Here’s a technical error on our end. Kindly contact support for further help.",
//       "Error Code 1003 We’re experiencing a glitch. Please reach out to support for resolution.",
//       "Error Code 1003 Technical issues are affecting the process. Please contact support for help.",
//       "Error Code 1003 A technical issue has arisen. Please contact support to resolve it.",
//       "Error Code 1003 A We’ve run into a technical problem. Please get in touch with support for assistance."
//   ];

// start get
export const getChatAction = createAsyncThunk(
  "chat/getChatAction",
  async (arg, { dispatch, rejectWithValue }) => {
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
      if (error?.response?.status === 401) {
        RemoveAuth();
      }
      return rejectWithValue(error.response.data);
    }
  }
);
// end get

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
      console.log('debug')
      if (error?.response?.status === 401) {
        RemoveAuth();
      }
      // if (Errors.some((item) => item.error.includes(error?.response.status))) {
      //   let errros = Errors.filter(item => item.error.includes(error?.response.status))
      //   console.log(errros.error)
      // }
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
  error: null,

  // start chatInput
  input: {
    loading: false,
    error: null,
  },
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
        ].answer = `<div style=font-weight:600> Sorry there is an ERROR please try again ${action.payload} </div>`;
      }
      state.loading = false;
    },
    chat_out: (state, action) => {
      localStorage.removeItem("chat");
      return {
        ...state,
        value: 0,
        chat_data: [],
        conversation: [],
        get_chat: "",
        chat_code: "",
      };
    },
    loading_main_chat: (state, action) => {
      state.loading = action.payload;
    },
    // loading chat
    chatSlice_loading: (state, action) => {
      state.loading = action.payload;
    },
    // loading chat

    // start chat error
    error_start_chat: (state, action) => {
      state.error = action.payload;
    },
    // end chat error
    clearData: (state, action) => {
      state.value = 0;
      state.chat_data = [];
      state.conversation = [];
      state.get_chat = "";
      state.chat_code = "";
      state.loading = false;

      // start chatInput
      state.input = {
        loading: false,
        error: null,
      };
      // end chatInput
    },
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
  error_start_chat,
  clearData,
} = chatSlice.actions;

export default chatSlice.reducer;
