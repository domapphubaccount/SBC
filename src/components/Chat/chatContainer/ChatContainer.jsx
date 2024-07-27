"use client";
import React, { useEffect, useRef, useState } from "react";
import Refrence from "../reference/Refrence";
import ChatInput from "../chatInput/ChatInput";
import MainChat from "../mainChat/MainChat";
import axios from "axios";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getCode } from "@/app/Redux/Features/Code/CodeSlice";
import {
  getChatData,
  getConversation,
} from "@/app/Redux/Features/Chat/ChatSlice";
import { loading_chat } from "@/app/Redux/Features/Update/UpdateSlice";
import { renameAction, renameToggleAction } from "@/app/Redux/Slices/ActionsSlice/ActionsSlice";

function ChatContainer() {
  const dashboardData = useSelector((state) => state.chatSlice.value);
  const catchChat = useSelector((state) => state.chatSlice.get_chat);
  const updates = useSelector((state) => state.updateSlice.state);
  const renameToggle = useSelector((state) => state.ActionsSlice.renameToggle);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  const nameRef = useRef()

  useEffect(() => {
    console.log("page");
    if (!JSON.parse(localStorage.getItem("data"))) {
      redirect("/signIn");
    } else {
      if (typeof window !== "undefined" && localStorage.getItem("data")) {
        const storedData = JSON.parse(localStorage.getItem("data"));
        setToken(storedData.token);

        axios
          .get("https://sbc.designal.cc/api/sections", {
            headers: {
              Authorization: `Bearer ${storedData.token}`,
            },
          })
          .then((res) => {
            if (res.data.success) {
              dispatch(getCode(res.data.data));
            }
          })
          .catch((e) => console.log(e));
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      if (catchChat || localStorage.getItem("chat")) {
        axios
          .get(
            `https://sbc.designal.cc/api/get-chat/${JSON.parse(
              localStorage.getItem("chat")
            )}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                chat_id: catchChat,
                share_name: "1",
              },
            }
          )
          .then((response) => {
            if (response.data.success) {
              dispatch(getConversation(response.data.data[0]));
              dispatch(getChatData(response.data.data[0].user_chats));
              dispatch(loading_chat(false));
            }
          })
          .catch((error) => {
            console.error("There was an error making the request!", error);
          });
      } else if (
        dashboardData.chat_history &&
        dashboardData.chat_history.length >= 1 &&
        catchChat === null
      ) {
        const chat_id = Object.entries(dashboardData?.chat_history)[0][1][0]
          ?.id;
        axios
          .get(`https://sbc.designal.cc/api/get-chat/${chat_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              chat_id: chat_id,
              share_name: "1",
            },
          })
          .then((response) => {
            if (response.data.success) {
              dispatch(getConversation(response.data.data[0]));
              dispatch(getChatData(response.data.data[0].user_chats));
              dispatch(loading_chat(false));
            }
          })
          .catch((error) => {
            console.error("There was an error making the request!", error);
          });
      }
    }
    window.MathJax && window.MathJax.typeset();
  }, [token, dashboardData, updates, catchChat]);

  const handleRename = () => {
    dispatch(renameAction(nameRef.current.value))
  }

  return (
    <>
    <div className="chat_container">
        <div className="w-screen">
            <div className="min-w-full">
              <MainChat />
            </div>
      </div>
    </div>

    {renameToggle && (
        <div
          class="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class=" sm:items-start">
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        class="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Rename Chat
                      </h3>
                      <div class="mt-2">
                        <div className="relative h-10 w-full">
                          <input
                            ref={nameRef}
                            style={{ color: "black" }}
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            placeholder=" "
                          />
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Rename
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={() => handleRename()}
                    type="button"
                    class="inline-flex w-full justify-center rounded-md bg-primary-color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500	 sm:ml-3 sm:w-auto"
                  >
                    Rename
                  </button>
                  <button
                    onClick={() => dispatch(renameToggleAction())}
                    type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatContainer;
