"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  state: false,
  loading_chat: false,
}

export const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    update: (state , action) => {
      state.state = !state.state;
      console.log('update')
    },
    loading_chat: (state , action) => {
      state.loading_chat = action.payload
    }
  },
})

export const { update , loading_chat } = updateSlice.actions

export default updateSlice.reducer