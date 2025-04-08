"use client"

import { configureStore } from '@reduxjs/toolkit'
import  codeSlice from './Features/Code/CodeSlice'
import  chatSlice from './Features/Chat/ChatSlice'
import  updateSlice from './Features/Update/UpdateSlice'
import typeSlice from './Features/type/typeSlice'
import historySlice from './Features/History/History'
import profileSlice from './Features/Profile/Profile'

export const store = configureStore({
  reducer: {
    codeSlice,
    historySlice,
    profileSlice,
    chatSlice,
    updateSlice,
    typeSlice
  },
})
