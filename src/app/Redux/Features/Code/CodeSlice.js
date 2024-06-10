"use client";

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: '',
  storedCode: {},
}

export const codeSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getCode: (state , action) => {
      state.value = action.payload
    },
    set_stored_code: (state , action)=>{
      state.storedCode = action.payload
    }
  },
})

export const { getCode , set_stored_code } = codeSlice.actions

export default codeSlice.reducer