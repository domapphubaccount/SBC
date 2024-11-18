"use client";
import { sendError } from "@/app/Redux/Features/Chat/ChatActionsSlice";
import {
  choseChate,
  getChatData,
  send_failed,
} from "@/app/Redux/Features/Chat/ChatSlice";
import { setTypeValue } from "@/app/Redux/Features/type/typeSlice";
import { update } from "@/app/Redux/Features/Update/UpdateSlice";
import { config } from "@/config/config";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";

function ChatInput() {
  const [message, setMessage] = useState("");
  const [sendMessage, setSendMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatData = useSelector((state) => state.chatSlice.chat_data);
  const conversation = useSelector((state) => state.chatSlice.conversation);
  const [popoverOpen, setPopoverOpen] = useState({ open: false, data: "" });
  const [dir, setDir] = useState(false);
  const storedCode = useSelector((state) => state.codeSlice.storedCode);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const chatCode = useSelector((state) => state.chatSlice.chat_code);
  const chatslice = useSelector((state) => state.chatSlice.get_chat);
  const dispatch = useDispatch();
  let errorsStore = ["error 1", "error 2", "error 3", "error 4", "error 5"];

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("data")) {
      const storedData = JSON.parse(localStorage.getItem("data"));
    }

    document.getElementById("custom_text_area").addEventListener("focus" , ()=> document.getElementById("sendIcon").classList.add("text-gray-700"))
    document.getElementById("custom_text_area").addEventListener("blur" , ()=> document.getElementById("sendIcon").classList.remove("text-gray-700"))
  }, []);

  const handleSendMessage = () => {
    if (storedCode.length > 0 && message.length > 0) {
      dispatch(getChatData([...chatData, { question: message }]));
      setLoading(true);
      axios
        .post(
          `${config.api}ask_question`,
          {
            question: message,
            thread_id:
              (conversation && conversation.chatgpt_id) ||
              (chatCode && chatCode),
            "file_ids[]": storedCode && storedCode.join(","),
          },
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (response.data) {
            dispatch(setTypeValue(true));
            dispatch(update());
            if (!chatslice) {
              localStorage.setItem("chat", response.data.data.master_chat_id);
              dispatch(choseChate(response.data.data.master_chat_id));
            }
            setMessage("");
          } else {
            setSendMessage(true);
            dispatch(
              send_failed(
                errorsStore[Math.floor(Math.random() * errorsStore.length)]
              )
            );
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);

          dispatch(
            send_failed(
              errorsStore[Math.floor(Math.random() * errorsStore.length)]
            )
          );
          dispatch(sendError(true));
          setTimeout(() => dispatch(sendError(false)), 1500);
          console.error("There was an error making the request!", error);
        });
    } else if (storedCode.length === 0) {
      setSendMessage(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  function isEnglish(text) {
    // Remove non-alphabetic characters for a better accuracy
    const cleanedText = text.replace(/[^a-zA-Z]/g, "");
    // Calculate the percentage of alphabetic characters that are English
    const englishCharCount = cleanedText.length;
    const totalCharCount = text.length;

    // Determine the percentage of English characters
    const percentageEnglish = (englishCharCount / totalCharCount) * 100;

    // Check if the percentage is above a certain threshold (e.g., 50%)
    setDir(percentageEnglish > 50);
  }

  return (
    <>
      <div className="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300">
        {loading ? (
          <>
            <div className="flex space-x-2 animate-pulse">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            </div>
          </>
        ) : (
          <>
            <TextareaAutosize
              onChange={(e) => {
                isEnglish(e.target.value);
                setMessage(e.target.value);
              }}
              id="custom_text_area"
              className="custom_textarea py-3 mx-3 pl-5 block w-full bg-gray-100 outline-none focus:text-gray-700 text-gray-800"
              onKeyDown={handleKeyDown}
              // disabled={!conversation.id || chatCode}
              dir={dir ? "ltr" : "rtl"}
              placeholder={
                !conversation?.id
                  ? "start new chat first / إبدأ محادثة جديدة"
                  : "start question / إبدأ بسؤال"
              }
              maxRows={8}
            />

            <button
              onClick={handleSendMessage}
              disabled={message.length <= 0 && !conversation.id}
              className="outline-none focus:outline-none"
              type="submit"
            >
              <PopoverDefault popoverOpen={popoverOpen}>
                <svg
                  id="sendIcon"
                  className="text-gray-400 h-7 w-7 origin-center transform rotate-90"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </PopoverDefault>
            </button>
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
                        {/* <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Error</h3> */}
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
        Verify crucial details for accuracy by cross-referencing with reliable
        sources.{" "}
      </div>
    </>
  );
}

export default ChatInput;

function PopoverDefault({ children, popoverOpen }) {
  return (
    <Popover open={popoverOpen.open}>
      <PopoverHandler>{children}</PopoverHandler>
      <PopoverContent>
        <p className="text-black">{popoverOpen.data}</p>
      </PopoverContent>
    </Popover>
  );
}
