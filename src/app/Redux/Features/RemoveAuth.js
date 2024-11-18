"use client"
import React from 'react'
import { useDispatch } from 'react-redux'
import { clearData } from './Chat/ChatSlice'
import { clearHistory } from './Chat_History/historySlice'
import { logout } from './Auth/AuthSlice'

function RemoveAuth() {
    const dispatch = useDispatch()
    dispatch(clearData())
    dispatch(clearHistory())
    dispatch(logout())

  return (
    <></>
  )
}

export default RemoveAuth