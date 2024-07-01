"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false
}

export const loadingSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    loading_comp: (state,action) => {
        state.loading = action.payload
    },
  },
})

export const {loading_comp} = loadingSlice.actions

export default loadingSlice.reducer