"use client";
import React, { useEffect, useState } from "react";
import Refrence from "../reference/Refrence";
import MainChat from "../mainChat/MainChat";
import axios from "axios";
import { redirect, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getCodeAction } from "@/app/Redux/Features/Code/CodeSlice";
import {
  getChatData,
  getConversation,
  loading_main_chat,
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
  const dispatch = useDispatch();
  const pathName = usePathname();
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    if (
      !JSON.parse(localStorage.getItem("data")) &&
      pathName.slice(0, 9) != "/sharable"
    ) {
      redirect("/signIn");
    } else {
      dispatch(getCodeAction({ token }));
    }
    const handleWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowWidth);

    return () => window.removeEventListener("resize", handleWindowWidth);
  }, []);

  useEffect(() => {
    if (token) {
      if (catchChat || localStorage.getItem("chat") || chatCode) {
        // dispatch(chatSlice_loading(true))
        axios
          .get(
            `${config.api}get_chat/${
              (localStorage.getItem("chat") && localStorage.getItem("chat")) ||
              catchChat
            }`,
            {
              headers: {
                Accept: "*/*",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            if (response.data) {
              dispatch(getConversation(response.data.data));
              dispatch(getChatData(response.data.data.userChats));
              dispatch(dispatch(loading_main_chat(false)));
              dispatch(loading_get_chat_history(false));
              // dispatch(chatSlice_loading(false))
            }
          })
          .catch((error) => {
            // dispatch(chatSlice_loading(false))
            console.error("There was an error making the request!", error);
          });
        // dispatch(getChatAction({token,chat_id: catchChat || localStorage.getItem("chat")&&localStorage.getItem("chat")}))
      } else if (
        dashboardData.chat_history &&
        Object.entries(dashboardData.chat_history).length >= 1 &&
        catchChat === null
      ) {
        const chat_id = Object.entries(dashboardData?.chat_history)[0][1][0]
          ?.id;
        axios
          .get(`${config.api}get-chat/${chat_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            if (response) {
              dispatch(getConversation(response.data.data));
              dispatch(getChatData(response.data.data.userChats));
              dispatch(dispatch(loading_main_chat(false)));
              // dispatch(loading_chat(false));
              dispatch(loading_get_chat_history(false));
            }
          })
          .catch((error) => {
            console.error("There was an error making the request!", error);
          });
      }
    }
  }, [token, dashboardData, updates, catchChat]);

  const [elementWidth, setElementWidth] = useState();
  useEffect(() => {
    const updateElementWidth = () => {
      setElementWidth(
        document.getElementById("listRef") &&
          document.getElementById("listRef").offsetWidth
      );
    };

    updateElementWidth(); // Set initial width
    window.addEventListener("resize", updateElementWidth);
    return () => {
      window.removeEventListener("resize", updateElementWidth);
    };
  }, []);

  return (
    <div className="h-screen chat_container">
      <div className="w-full bg-neutral-200 chat_input">
        <div className="w-screen" style={{ overflowX: "hidden" }}>
          <div className=" border rounded" style={{ minHeight: "80vh" }}>
            <div className="grid grid-cols-4 min-w-full">
              <Refrence setElementWidth={setElementWidth} />
              <MainChat elementWidth={elementWidth} windowWidth={windowWidth} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
