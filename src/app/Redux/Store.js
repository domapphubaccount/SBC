"use client"

import { configureStore } from '@reduxjs/toolkit'
import  codeSlice from './Features/Code/CodeSlice'
import  chatSlice from './Features/Chat/ChatSlice'

export const store = configureStore({
  reducer: {
    codeSlice,
    chatSlice,
  },
})
