"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  chat_data:[],
  conversation: [],
  get_chat:''
}

export const chatSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getChatHistory: (state , action) => {
      state.value = action.payload
    },
    getChatData: (state , action ) => {
      state.chat_data = action.payload
    },
    getConversation: (state , action) => {
      state.conversation = action.payload
    },
    choseChate: (state , action) => {
      state.get_chat = action.payload
    },
    send_success: (state, action) => {
      const userChats = state.chat_data;
      if (userChats.length > 0) {
        userChats[userChats.length - 1].answer = action.payload.answer;
        if (userChats.length > 1 && userChats[userChats.length - 2].id) {
          userChats[userChats.length - 1].id = userChats[userChats.length - 2].id + 1;
        } else {
          state.first_message = !state.first_message;
        }
      }
      state.loading = false;
    },

  },
})

export const { getChatHistory , getChatData , getConversation , get_chat , choseChate , send_success} = chatSlice.actions

export default chatSlice.reducer