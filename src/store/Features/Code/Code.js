"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    codes: [],
    chosen_code: []
}

export const codeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    get_code: (state , action) => {
        state.codes = action.payload
    },

    chose_code: (state , action) => {
        state.chosen_code = action.payload
    }

  },
})

export const { get_code , chose_code } = codeSlice.actions

export default codeSlice.reducer