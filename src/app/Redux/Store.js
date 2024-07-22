"use client"

import { configureStore } from '@reduxjs/toolkit'
import  codeSlice from './Features/Code/CodeSlice'
import  chatSlice from './Features/Chat/ChatSlice'
import  updateSlice from './Features/Update/UpdateSlice'
import typeSlice from './Features/type/typeSlice'

export const store = configureStore({
  reducer: {
    codeSlice,
    chatSlice,
    updateSlice,
    typeSlice
  },
})
