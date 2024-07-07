"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  chat_data:[],
  conversation: {},
  get_chat:'',
  first_message: false
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
    sendMessage_success: (state , action) => {
      console.log(state , 'redux')
      const userChats = state.conversation.user_chats;
      if (userChats.length > 0) {
        userChats[userChats.length - 1].answer = action.payload.answer;
        // Check if userChats has at least two elements
        if (userChats.length > 1 && userChats[userChats.length - 2].id) {
          userChats[userChats.length - 1].id = userChats[userChats.length - 2].id + 1;
        } else {
          state.first_message = !state.first_message;
        }
      }
    }

  },
})

export const { getChatHistory , getChatData , getConversation , get_chat , choseChate , sendMessage_success} = chatSlice.actions

export default chatSlice.reducer