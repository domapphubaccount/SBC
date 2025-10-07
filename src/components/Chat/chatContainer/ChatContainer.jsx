"use client";
import React, { useEffect, useState } from "react";
import Refrence from "../reference/Refrence";
import MainChat from "../mainChat/MainChat";
import axios from "axios";
import { redirect, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getCodeAction,
  set_direct_code,
} from "@/app/Redux/Features/Code/CodeSlice";
import {
  getChatCode,
  getChatData,
  getConversation,
  loading_main_chat,
} from "@/app/Redux/Features/Chat/ChatSlice";
import { config } from "@/config/config";
import { loading_get_chat_history } from "@/app/Redux/Features/Chat_History/historySlice";

function ChatContainer() {
  const [windowWidth, setWindowWidth] = useState();
  const pathName = usePathname();
  const dashboardData = useSelector((state) => state.chatSlice.value);
  const catchChat = useSelector((state) => state.chatSlice.get_chat);
  const updates = useSelector((state) => state.updateSlice.state);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const chatCode = useSelector((state) => state.chatSlice.chat_code);
  const dispatch = useDispatch();
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );

  // start manage window width and is logged or not
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    if (
      !JSON.parse(localStorage.getItem("data")) &&
      pathName.slice(0, 9) != "/sharable"
    ) {
      redirect("/signIn");
    } else {
      if (permissionsData && permissionsData.includes("sections.pdf")) {
        dispatch(getCodeAction({ token }));
      }
    }
    const handleWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleWindowWidth);

    return () => window.removeEventListener("resize", handleWindowWidth);
  }, []);
  // end manage window width and is logged or not

  useEffect(() => {
    if (token && pathName.slice(0, 9) != "/sharable") {
      // Only load chat if explicitly selected (catchChat) or from history, not from storage
      if (catchChat) {
        axios
          .get(`${config.api}get_chat/${catchChat}`, {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            if (response.data) {
              let { userChats } = response.data.data;
              let lastQuestionCode =
                userChats[userChats.length - 1]?.pdfs.map(
                  (item) => item.chatgpt_file_id
                ) || "";
              // dispatch(set_direct_code(lastQuestionCode)); //here

              dispatch(getChatCode(lastQuestionCode));
              dispatch(getConversation(response.data.data));
              dispatch(getChatData(response.data.data.userChats));
              dispatch(dispatch(loading_main_chat(false)));
              dispatch(loading_get_chat_history(false));
            }
          })
          .catch((error) => {
            console.error("There was an error making the request!", error);
          });
      }
    }
  }, [token, dashboardData, updates, catchChat]);

  return (
    <div className="h-screen">
      <div className="w-full bg-neutral-200 chat_input">
        <div className="w-screen overflow-x-hidden">
          <div className=" border rounded" style={{ minHeight: "80vh" }}>
            <MainChat windowWidth={windowWidth} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
