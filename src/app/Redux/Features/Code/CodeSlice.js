"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
  storedCode: [],
}

export const codeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getCode: (state , action) => {
      state.value = action.payload
    },
    set_code: (state, action) => {
      if (state.storedCode.includes(action.payload)) {
        state.storedCode = state.storedCode.filter(item => item !== action.payload);
      } else {
        state.storedCode.push(action.payload);
      }
    },
    remove_code: (state , action) => {
      state.storedCode = []
    }
  },
})

export const { getCode , set_code , remove_code} = codeSlice.actions

export default codeSlice.reducer