"use client";
import { sendError } from "@/app/Redux/Features/Chat/ChatActionsSlice";
import {
  choseChate,
  getChatData,
  send_failed,
} from "@/app/Redux/Features/Chat/ChatSlice";
import { send_message } from "@/app/Redux/Features/ChatInputSlice/ChatInputSlice";
import { setTypeValue } from "@/app/Redux/Features/type/typeSlice";
import { update } from "@/app/Redux/Features/Update/UpdateSlice";
import { config } from "@/config/config";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";

function ChatInput() {
  const [message, setMessage] = useState("");
  const [sendMessage, setSendMessage] = useState(false);
  const textAreaRef = useRef(null);
  const chatData = useSelector((state) => state.chatSlice.chat_data);
  const conversation = useSelector((state) => state.chatSlice.conversation);
  const [dir, setDir] = useState(false);
  const storedCode = useSelector((state) => state.codeSlice.storedCode);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const chatCode = useSelector((state) => state.chatSlice.chat_code);
  const chatslice = useSelector((state) => state.chatSlice.get_chat);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.chatInputSlice.loading);

  function handleErrorResponse(item) {
    switch (item) {
      case 400 || 404 || 413:
        return [
          "Error Code 1002 Technical difficulties are preventing us from proceeding. Kindly contact support.",
          "Error Code 1002 We’re currently dealing with a technical problem. Please contact support for help.",
          "Error Code 1002 A technical issue has interrupted the process. Please reach out to support.",
          "Error Code 1002 We’ve encountered a technical problem. Please contact support for assistance.",
          "Error Code 1002 A technical malfunction has occurred. Please get in touch with technical support.",
        ];
      case 401 || 403 || 429:
        [
          "Error Code 1001 We’re experiencing a technical issue. Please contact support for assistance.",
          "Error Code 1001 A technical problem has occurred. Kindly reach out to support for help.",
          "Error Code 1001 There seems to be a technical glitch. Please contact technical support.",
          "Error Code 1001 We’re facing a technical issue. Please get in touch with support for resolution.",
          "Error Code 1001 A technical error has been detected. Please contact support for further assistance.",
        ];
      case 500 || 502 || 503 || 504:
        [
          "Error Code 1003 Here’s a technical error on our end. Kindly contact support for further help.",
          "Error Code 1003 We’re experiencing a glitch. Please reach out to support for resolution.",
          "Error Code 1003 Technical issues are affecting the process. Please contact support for help.",
          "Error Code 1003 A technical issue has arisen. Please contact support to resolve it.",
          "Error Code 1003 A We’ve run into a technical problem. Please get in touch with support for assistance.",
        ];
      default:
        return [
          "Error Code 1002 Technical difficulties are preventing us from proceeding. Kindly contact support.",
          "Error Code 1002 We’re currently dealing with a technical problem. Please contact support for help.",
          "Error Code 1002 A technical issue has interrupted the process. Please reach out to support.",
          "Error Code 1002 We’ve encountered a technical problem. Please contact support for assistance.",
          "Error Code 1002 A technical malfunction has occurred. Please get in touch with technical support.",
        ];
    }
  }

  useEffect(() => {
    if (document.getElementById("custom_text_area")) {
      document
        .getElementById("custom_text_area")
        .addEventListener("focus", () =>
          document.getElementById("sendIcon").classList.add("text-gray-700")
        );
      document
        .getElementById("custom_text_area")
        .addEventListener("blur", () =>
          document.getElementById("sendIcon").classList.remove("text-gray-700")
        );
    }
  }, []);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current?.focus();
    }
  }, [chatData]);

  // start send message
  const handleSendMessage = () => {
    let timer;

    const startTimer = () => {
      return new Promise((_, reject) => {
        timer = setTimeout(() => {
          reject(new Error("No response after 40 seconds"));
        }, 40000); // 40 seconds timeout
      });
    };

    if (storedCode.length > 0 && message.length > 0) {
      dispatch(getChatData([...chatData, { question: message }]));
      dispatch(send_message(true));
      // Race the timer and API call
      Promise.race([
        startTimer(),
        axios.post(
          `${config.api}ask_question`,
          {
            question: message,
            thread_id:
              (conversation && conversation.chatgpt_id) ||
              (chatCode && chatCode),
            file_ids: storedCode && storedCode.join(","),
          },
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ])
        .then((response) => {
          clearTimeout(timer); // Clear the timeout if the response is received
          if (response.data) {
            dispatch(setTypeValue(true));
            dispatch(update());
            if (!chatslice) {
              localStorage.setItem(
                "chat",
                response?.data?.data?.master_chat_id
              );
              localStorage.setItem("hints", false);
              dispatch(choseChate(response.data?.data?.master_chat_id));
            }
            setMessage("");
          } else {
            setSendMessage(true);
            dispatch(
              send_failed(
                handleErrorResponse()[
                  Math.floor(Math.random() * handleErrorResponse().length)
                ]
              )
            );
          }
          dispatch(send_message(false));
        })
        .catch((error) => {
          clearTimeout(timer); // Clear the timeout if an error occurs
          dispatch(send_message(false));
          console.log(error);
          if (error.message === "No response after 40 seconds") {
            console.error(error.message);
          } else {
            console.error("There was an error making the request!", error);
          }

          dispatch(
            send_failed(
              handleErrorResponse(error?.response)[
                Math.floor(
                  Math.random() * handleErrorResponse(error?.response).length
                )
              ]
            )
          );
          dispatch(sendError(true));
          setTimeout(() => dispatch(sendError(false)), 1500);
        });
    } else if (storedCode.length === 0) {
      setSendMessage(true);
    }
  };
  // end send message

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  function isEnglish(text) {
    const firstChar = text.trim().charAt(0);

    // Check if it's an English character
    const isEnglishChar = /^[A-Za-z]$/.test(firstChar);
  
    // Set direction
    setDir(isEnglishChar);
  }

  return (
    <>
      <div className="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300">
        {loading ? (
          <div className="w-full max-w-2xl mx-auto p-4">
            <div className="flex space-x-2 animate-pulse">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full max-w-2xl mx-auto px-4">
              <div className="flex items-center gap-3">
                <TextareaAutosize
                  onChange={(e) => {
                    isEnglish(e.target.value);
                    setMessage(e.target.value);
                  }}
                  id="custom_text_area"
                  className="custom_textarea py-3 pl-5 block w-full bg-gray-100 outline-none focus:text-gray-700 text-gray-800 rounded-lg"
                  onKeyDown={handleKeyDown}
                  dir={dir ? "ltr" : "rtl"}
                  placeholder={
                    !conversation?.id
                      ? "start new chat first / إبدأ محادثة جديدة"
                      : "start question / إبدأ بسؤال"
                  }
                  maxRows={8}
                  ref={textAreaRef}
                />

                <button
                  onClick={handleSendMessage}
                  disabled={
                    message.length <= 0 &&
                    !conversation.id &&
                    message.length === 0
                  }
                  className="outline-none focus:outline-none"
                  type="submit"
                >
                  <svg
                    id="sendIcon"
                    className="text-gray-400 h-7 w-7 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}

        {sendMessage && storedCode.length <= 0 && (
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          className="h-6 w-6 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <div className="mt-5">
                          <p className="text-sm text-gray-500">
                            Please select the CODE before submitting your query.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      onClick={() => setSendMessage(false)}
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className="m-auto text-center text-black	footer-text py-2 text-xs"
        style={{ color: "#545454" }}
      >
        <div
          className="mx-auto absolute bottom-2.5 left-[10px] text-black text-center footer-text text-xs"
          style={{ width: "4rem" }}
        >
          <span style={{ fontSize: "10px" }}>Powered By</span>{" "}
          <span
            className="font-bold"
            style={{
              fontFamily: "Alef, sans-serif",
              letterSpacing: "-1px",
            }}
          >
            <span style={{ color: "#162C4C" }}>CPV</span>
            <span style={{ color: "#2C518E" }}>ARABIA</span>
          </span>
        </div>


        Verify crucial details for accuracy by cross-referencing with reliable
        sources.
      </div>
    </>
  );
}

export default ChatInput;
