"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  state: false,
  loading_chat: false,
  archive: false,
}

export const updateSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    update: (state , action) => {
      state.state = !state.state;
    },
    update_archive: (state , action) => {
      state.archive = !state.archive;
    },
    loading_chat: (state , action) => {
      state.loading_chat = action.payload
    }
  },
})

export const { update , loading_chat , update_archive} = updateSlice.actions

export default updateSlice.reducer