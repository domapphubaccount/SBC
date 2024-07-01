"use client";

import { configureStore } from '@reduxjs/toolkit'
import updatesSlice from './Features/Updates/Updates'
import ThemeSlice from './Features/Theme/Theme'
import ChatSlice from './Features/Chat/ChatSlice';
import authSlice from './Features/auth/authSlice';
import codeSlice from './Features/Code/Code';
import loadingSlice from './Features/Loading/LoadingSlice';
import alertsSlice from './Features/Alerts/AlertsSlice';
import deslikeSlice from './Features/Deslike/DeslikeSlice';
import deleteSlice from './Features/Delete/DeleteSlice';
import shareSlice from './Features/Share/ShareSlice';
import RenameSlice from './Features/Rename/RenameSlice';

export const store = configureStore({
  
  reducer: {
    theme: ThemeSlice,
    chat: ChatSlice,
    authSlice: authSlice,
    codeSlice: codeSlice,
    loadingSlice: loadingSlice, 
    alertsSlice: alertsSlice,
    deslikeSlice: deslikeSlice,
    RenameSlice: RenameSlice,
    updatesSlice: updatesSlice,
    deleteSlice: deleteSlice,
    ShareSlice: shareSlice,
  },
})
