"use client"

import { configureStore } from '@reduxjs/toolkit'
import  codeSlice from './Features/Code/CodeSlice'
import  chatSlice from './Features/Chat/ChatSlice'
import  updateSlice from './Features/Update/UpdateSlice'
import typeSlice from './Features/type/typeSlice'
import AuthSlice from './Slices/AuthSlice/AuthSlice'
import ChatSlice from './Slices/ChatSlice/ChatSlice'
import HistorySlice from './Slices/HistorySlice/HistorySlice'
import CodeSlice from './Slices/CodeSlice/CodeSlice'
import ActionsSlice from './Slices/ActionsSlice/ActionsSlice'

export const store = configureStore({
  reducer: {
    codeSlice,
    chatSlice,
    updateSlice,
    typeSlice,



    AuthSlice,
    ChatSlice,
    HistorySlice,
    CodeSlice,
    ActionsSlice
  },
})
