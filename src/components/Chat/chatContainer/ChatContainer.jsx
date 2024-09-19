"use client";
import React, { useEffect, useState } from "react";
import Refrence from "../reference/Refrence";
import MainChat from "../mainChat/MainChat";
import axios from "axios";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getCodeAction } from "@/app/Redux/Features/Code/CodeSlice";
import {
  getChatData,
  getConversation,
} from "@/app/Redux/Features/Chat/ChatSlice";
import { loading_chat } from "@/app/Redux/Features/Update/UpdateSlice";
import { config } from "@/config/config";
import { loading_get_chat_history } from "@/app/Redux/Features/Chat_History/historySlice";

function ChatContainer() {
  const dashboardData = useSelector((state) => state.chatSlice.value);
  const catchChat = useSelector((state) => state.chatSlice.get_chat);
  const updates = useSelector((state) => state.updateSlice.state);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const chatCode = useSelector((state) => state.chatSlice.chat_code);
  const state = useSelector(state => state)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("data"))) {
      redirect("/signIn");
    } else {
      dispatch(getCodeAction({ token }));
    }
  }, []);

  useEffect(() => {
    if (token) {
      if (catchChat || localStorage.getItem("chat") || chatCode) {
        // dispatch(chatSlice_loading(true))
        axios
          .get(`${config.api}get_chat/${localStorage.getItem("chat")&&localStorage.getItem("chat") || catchChat}`,{
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data) {
              dispatch(getConversation(response.data.data));
              dispatch(getChatData(response.data.data.userChats));
              // dispatch(loading_chat(false));
              dispatch(loading_get_chat_history(false))
              // dispatch(chatSlice_loading(false))
            }
          })
          .catch((error) => {
            // dispatch(chatSlice_loading(false))
            console.error("There was an error making the request!", error);
          });
        // dispatch(getChatAction({token,chat_id: catchChat || localStorage.getItem("chat")&&localStorage.getItem("chat")}))
      } else if (
        dashboardData.chat_history&&
        Object.entries(dashboardData.chat_history).length >= 1 &&
        catchChat === null
      ) {
        const chat_id = Object.entries(dashboardData?.chat_history)[0][1][0]
          ?.id;
        axios
          .get(`${config.api}get-chat/${chat_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response) {
              dispatch(getConversation(response.data.data));
              dispatch(getChatData(response.data.data.userChats));
              // dispatch(loading_chat(false));
              dispatch(loading_get_chat_history(false))
            }
          })
          .catch((error) => {
            console.error("There was an error making the request!", error);
          });
      }
    }
  }, [token, dashboardData, updates, catchChat]);

  const [elementWidth,setElementWidth] = useState()
  useEffect(() => {
    const updateElementWidth = () => {
      setElementWidth(document.getElementById("listRef").offsetWidth);
    }
    updateElementWidth(); // Set initial width
    window.addEventListener('resize', updateElementWidth);
    return () => {
      window.removeEventListener('resize', updateElementWidth);
    }
  }, []);

  return (
    <div className="h-screen chat_container">
      <div className="w-full bg-neutral-200 chat_input">
        <div className="w-screen" style={{ overflowX: "hidden" }}>
          <div className=" border rounded" style={{ minHeight: "80vh" }}>
            <div className="grid grid-cols-4 min-w-full">
              <Refrence setElementWidth={setElementWidth} />
              <MainChat elementWidth={elementWidth}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
