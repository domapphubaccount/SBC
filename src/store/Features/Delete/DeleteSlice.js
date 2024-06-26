"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    open: false,
    chatId: ''
}

export const deleteSlice = createSlice({
  name: 'delete',
  initialState,
  reducers: {
    open_delete: (state,action) => {
        state.open = action.payload.open
    },
    get_delete_chatId: (state,action) => {
        state.chatId = action.payload.chatId
    }
  },
})

export const {open_delete,get_delete_chatId} = deleteSlice.actions

export default deleteSlice.reducer