import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { open_delete } from "@/app/Redux/Features/Delete/DeleteSlice";
import axios from "axios";
import { update_sidebar } from "@/app/Redux/Features/Updates/Updates";
 
export default function Delete() {
    const open = useSelector(state => state.deleteSlice.open)
    const chatId = useSelector(state => state.deleteSlice.chatId)
    const [loading,setLoading] = useState(false)
    const token = useSelector(state => state.authSlice.userData.token)
    const dispatch = useDispatch()
 
  const handleOpen = () => dispatch(open_delete({open:false}));

  const handleSubmit = () => {
    setLoading(true)
    axios.post(
        "https://sbc.designal.cc/api/delete-chat",
        {
          chat_id: chatId,
          archive: 0
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
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Your Attention is Required!
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="red" variant="h4">
            You should read this!
          </Typography>
          <Typography className="text-center font-normal">
            Are you sure you want to delete this Chat?
            this action cant be undone
          </Typography>
        </DialogBody>
        {loading ?
                <div className="loader m-auto py-3">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div> 
                :
            ''
        }
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" onClick={handleSubmit}>
            Confirm Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}