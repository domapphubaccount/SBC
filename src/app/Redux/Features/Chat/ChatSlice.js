"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    newChat: false,
    start: {},
    chatHistory: {},
    chatData: {},
    chatConversation: {},
    loading: false,
    first_message: false,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    start_new_chat: (state , action) => {
      state.newChat = true
      state.chatConversation.data = [
        {
          id:action.payload,
          user_chats: [
            {answer: '' , question: ''}
          ]
        }
      ]
      state.chatData = {id: action.payload}
    },
    startChat: (state,action) => {
        state.start = action.payload
    },
    chatHistory: (state,action) => {
      state.chatHistory = action.payload
    },
    get_chat: (state,action) => {
      state.chatData = action.payload
    },
    get_conversations: (state,action) => {
      state.chatConversation = action.payload
    },
    set_loading: (state,action) => {
      state.loading = action.payload
    },
    submit_action: (state,action) => {
      state.chatConversation.data[0].user_chats = [...state.chatConversation.data[0].user_chats ,{answer: '', question: action.payload}]
    },
    send_success: (state, action) => {
      const userChats = state.chatConversation.data[0].user_chats;
      if (userChats.length > 0) {
        userChats[userChats.length - 1].answer = action.payload.answer;
    
        // Check if userChats has at least two elements
        if (userChats.length > 1 && userChats[userChats.length - 2].id) {
          userChats[userChats.length - 1].id = userChats[userChats.length - 2].id + 1;
        } else {
          state.first_message = !state.first_message;
        }
      }
    },
    
    resend_message: (state,action) => {
      const userChats = state.chatConversation.data[0].user_chats;
      if(userChats.length > 0){
        let conversation = userChats.filter(item => item.id === action.payload.id )
        conversation.answer = action.payload.answer
      }
    }
    
  },
})

export const { startChat , chatHistory , get_chat , get_conversations , set_loading , submit_action , start_new_chat , send_success , resend_message} = chatSlice.actions

export default chatSlice.reducer