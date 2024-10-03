"use client";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useSelector } from "react-redux";

function SnackbarError() {
  const messageError = useSelector((state) => state.chatSlice.error);
  const messageError2 = useSelector((state) => state.chatSlice);
  const message = (
      <div
        className="flex items-center"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">{messageError}</span>{" "}
        </div>
      </div>
  );
  return (
    <Snackbar
      open={messageError}
      autoHideDuration={2000}
      //   onClose={'handleClose'}
      message={message || "You need to Open new Thread"}
      //   action={'action'}
    />
  );
}

export default SnackbarError;
