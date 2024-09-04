"use client";

import { configureStore } from "@reduxjs/toolkit";
import codeSlice from "./Features/Code/CodeSlice";
import chatSlice from "./Features/Chat/ChatSlice";
import updateSlice from "./Features/Update/UpdateSlice";
import typeSlice from "./Features/type/typeSlice";
import loginSlice from "./Features/Auth/AuthSlice";
import conversationSlice from "./Features/Conversation/ConversationSlice";

export const store = configureStore({
  reducer: {
    loginSlice,
    conversationSlice,
    codeSlice,
    chatSlice,
    updateSlice,
    typeSlice,
  },
});
