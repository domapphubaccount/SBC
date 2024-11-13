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
    send_failed: (state , action) => {
      if (state.chat_data.length > 0) {
        console.log('it works')
        state.chat_data[state.chat_data.length - 1].answer = `<div style=font-weight:800> Sorry there is an ERROR please try again ${action.payload} </div>`;
      }
      console.log('it works 2')
      state.loading = false;
    },

    chat_out: (state , action) => {
      localStorage.removeItem('chat')
      localStorage.removeItem('code')
      return {
        ...state,
        value: 0,
        chat_data:[],
        conversation: [],
        get_chat:''
      }
    }
  },
})

export const { getChatHistory , getChatData , getConversation , get_chat , choseChate , send_success , send_failed , chat_out} = chatSlice.actions

export default chatSlice.reducer