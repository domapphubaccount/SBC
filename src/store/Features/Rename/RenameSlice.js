"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    loading: false,
    chatId: ''
}

export const renameSlice = createSlice({
  name: 'rename',
  initialState,
  reducers: {
    open_rename: (state,action) => {
        state.open = action.payload.open
    },
    close_rename: (state,action) => {
        state.open = false
    },
    get_chatId: (state,action) => {
        state.chatId = action.payload.chatId
    }
  },
})

export const {open_rename,close_rename,get_chatId} = renameSlice.actions

export default renameSlice.reducer