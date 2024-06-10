"use client"

import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './Features/Counter/CounterSlice'
import  codeSlice from './Features/Code/CodeSlice'
import  chatSlice from './Features/Chat/ChatSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    codeSlice,
    chatSlice,
  },
})
