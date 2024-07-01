"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    loading: false,
    chatId: '',
    chatConversation: {},
    chatHash: ''
}

export const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    open_share: (state,action) => {
        state.open = action.payload.open
        state.chatConversation = {}
    },
    close_share: (state,action) => {
        state.open = false
    },
    get_share_chatId: (state,action) => {
        state.chatId = action.payload.chatId
    },
    get_conversations: (state,action) => {
      state.chatConversation = action.payload
    },
    get_hash: (state,action) => {
      state.chatHash = action.payload
    }
  },
})

export const {open_share,close_share,get_chatId,get_share_chatId,get_conversations,get_hash} = shareSlice.actions

export default shareSlice.reducer