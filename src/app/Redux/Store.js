"use client";

import { configureStore } from "@reduxjs/toolkit";
import codeSlice from "./Features/Code/CodeSlice";
import chatSlice from "./Features/Chat/ChatSlice";
import updateSlice from "./Features/Update/UpdateSlice";
import typeSlice from "./Features/type/typeSlice";
import loginSlice from "./Features/Auth/AuthSlice";
import conversationSlice from "./Features/Conversation/ConversationSlice";
import profileSlice from "./Features/Profile/ProfileSlice";
import usersSlice from "./Features/Dashboard/UsersSlice";
import userCommentsSlice from "./Features/Dashboard/UsersCommentsSlice";
import sectionsSlice from "./Features/Dashboard/SectionsSlice";

export const store = configureStore({
  reducer: {
    loginSlice,
    conversationSlice,
    codeSlice,
    profileSlice,
    usersSlice,
    sectionsSlice,
    userCommentsSlice,
    chatSlice,
    updateSlice,
    typeSlice,
  },
});
