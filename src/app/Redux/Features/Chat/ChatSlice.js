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
      
    }

  },
})

export const { getChatHistory , getChatData , getConversation , get_chat , choseChate} = chatSlice.actions

export default chatSlice.reducer