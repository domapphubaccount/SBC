"use client"
import { action_done } from '@/app/Redux/Features/Chat/ChatActionsSlice';
import { Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function SnackbarTime() {
  const open = useSelector(state => state.chatActionsSlice.action_done);
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(action_done(false))
  }
  return (
    <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={handleClose}
    message="Action has been done successfully."
  />
  )
}

export default SnackbarTime