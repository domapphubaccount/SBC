"use client"
import React from 'react'
import { useDispatch } from 'react-redux'
import { clearData } from './Chat/ChatSlice'
import { clearHistory } from './Chat_History/historySlice'
import { logout } from './Auth/AuthSlice'
import { removeData } from './Dashboard/Pagination/Pagination'

function RemoveAuth() {
    const dispatch = useDispatch()
    dispatch(clearData())
    dispatch(clearHistory())
    dispatch(logout())
    dispatch(removeData())

  return (
    <></>
  )
}

export default RemoveAuth