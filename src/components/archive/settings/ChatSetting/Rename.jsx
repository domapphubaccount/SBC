"use client"
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { close_rename } from "@/app/Redux/Features/Rename/RenameSlice";
import axios from "axios";
import { update_sidebar } from "@/app/Redux/Features/Updates/Updates";
 
export default function Rename() {
    const dispatch = useDispatch()
    const open = useSelector(state => state.RenameSlice.open)
    const chatId = useSelector(state => state.RenameSlice.chatId)
    const [loading,setLoading] = useState(false)
    const token = useSelector(state => state.authSlice.userData.token)
    const [name,setName] = useState('')

 
  const handleOpen = () => dispatch(close_rename());

  const handleSubmit = () => {
    setLoading(true)
    axios.post(
          "https://sbc.designal.cc/api/rename-chat",
          {
            chat_id: chatId,
            new_name: name
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(response => {
          if(response.data.success){
            setLoading(false)
            dispatch(update_sidebar())
            handleOpen()
          }
        })
        .catch(error => {
            setLoading(false)
          console.error('There was an error making the request!', error);
        });
  }
 
  return (
    <>
        <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Rename Chat {" "}
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Chose new chat name.
          </Typography>
          {loading ?
                <div className="loader m-auto py-3">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div> 
                :
          <div className="grid gap-6">
            <Input label="Chat name" onChange={(e)=>setName(e.target.value)}/>
          </div>
        }
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="gray" onClick={handleSubmit}>
            Rename
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}