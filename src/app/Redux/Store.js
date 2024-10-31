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
import sectionsSlice from "./Features/Dashboard/SectionsSlice";
import rolesSlice from "./Features/Dashboard/RolesSlice";
import permissionsSlice from "./Features/Dashboard/PermmisionsSlice";
import pdfsSlice from "./Features/Dashboard/PdfsSlice";
import userCommentsSlice from "./Features/Dashboard/UsersCommentsSlice";
import historySlice from "./Features/Chat_History/historySlice";
import chatActionsSlice from "./Features/Chat/ChatActionsSlice";
import ReviewSlice from "./Features/Dashboard/ReviewerSlice";
import dashboardSlice from "./Features/Dashboard/DashboardSlice";
import usersChatSlice from "./Features/Dashboard/MasterUsersChat";
import asideSlice from "./Features/Dashboard/SideBarSlice";

export const store = configureStore({
  reducer: {
    loginSlice,
    asideSlice,
    conversationSlice,
    codeSlice,
    dashboardSlice,
    usersChatSlice,
    profileSlice,
    usersSlice,
    rolesSlice,
    pdfsSlice,
    permissionsSlice,
    sectionsSlice,
    historySlice,
    userCommentsSlice,
    chatSlice,
    updateSlice,
    typeSlice,
    chatActionsSlice,
    ReviewSlice,
  },
});
