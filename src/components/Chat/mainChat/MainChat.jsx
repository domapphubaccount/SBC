"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatInput from "../chatInput/ChatInput";
import axios from "axios";
import Dislike from "./actions/Dislike";
import { usePathname } from "next/navigation";
import MessageImg from "@/assets/chat/MESSAGE.png";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useDispatch, useSelector } from "react-redux";
import {
  loading_chat,
  updateSlice,
} from "@/app/Redux/Features/Update/UpdateSlice";
import {
  chat_out,
  choseChate,
  getChatCode,
} from "@/app/Redux/Features/Chat/ChatSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import StartLogo from "@/assets/logo/start_logo.png";
import Logo from "@/assets/logo/icon.png";
import { ReactTyped } from "react-typed";
import { setTypeValue } from "@/app/Redux/Features/type/typeSlice";
import { config } from "@/config/config";
import {
  action_done,
  loading_chat_action,
} from "@/app/Redux/Features/Chat/ChatActionsSlice";
import Loading_chat from "../chatContainer/Loading";

function MainChat({ elementWidth }) {
  const pathName = usePathname();
  const [copyIcon, setCopyIcon] = useState(false);
  const [user, setUser] = useState("");
  const [dislike, setDislike] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const [itemId, setItemId] = useState(null);
  const [dislikeMessage, setDislikeMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false); // State to track speech synthesis
  const [copID, setCopId] = useState();
  const updates = useSelector((state) => state.updateSlice.state);
  const chatData = useSelector((state) => state.chatSlice.chat_data);
  const conversation = useSelector((state) => state.chatSlice.conversation);
  const getchat = useSelector((state) => state.chatSlice.get_chat);
  const loadingchat = useSelector((state) => state.chatSlice.loading);
  const loading = useSelector((state) => state.updateSlice.loading_chat);
  const chatSlice_loading = useSelector((state) => state.chatSlice.loading);
  const typeComplete = useSelector((state) => state.typeSlice.value);
  const chatRef = useRef();
  const [responseId, setResponseId] = useState("");
  const dispatch = useDispatch();
  const chatCode = useSelector((state) => state.chatSlice.chat_code);
  const [windhtchat, setwidthchat] = useState();
  const loading_actions = useSelector(
    (state) => state.chatActionsSlice.loading
  );

  function isEnglish(text) {
    const cleanedText = text.replace(/[^a-zA-Z]/g, "");
    const englishCharCount = cleanedText.length;
    const totalCharCount = text.length;
    const percentageEnglish = (englishCharCount / totalCharCount) * 100;
    return percentageEnglish > 50;
  }
  useEffect(() => {
    window.MathJax && window.MathJax.typeset();
  }, [
    responseId,
    user,
    itemId,
    dislike,
    copID,
    updates,
    copyIcon,
    isSpeaking,
    elementWidth,
    chatData,
    conversation,
    dislikeMessage,
    loadingMessage,
    typeComplete,
  ]);
  const dislikeToggle = (id) => {
    setItemId(id);
    setDislike(!dislike);
  };
  const handleReadText = async (textRead, id) => {
    setCopId(id);
    try {
      const isArabic = /[^\u0000-\u007F]/.test(textRead);
      if (isArabic) {
        const { text } = await translate(textRead, { to: "en" });
        textRead = text;
      }
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(textRead);
        utterance.lang = "en-US"; // Set language to English (United States)
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true); // Update state to indicate speech synthesis is active
        utterance.onend = () => {
          setIsSpeaking(false); // Update state to indicate speech synthesis has ended
        };
      } else {
        console.error("Speech synthesis not supported in this browser.");
      }
    } catch (error) {
      console.error("Error translating or reading text:", error);
    }
  };
  const handleStopReading = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop speech synthesis
      setIsSpeaking(false); // Update state to indicate speech synthesis has stopped
    }
  };
  const stripHtml = (html) => {
    const temporalDivElement = document.createElement("div");
    temporalDivElement.innerHTML = html;
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
  };
  const handleCopyText = (textCopy, id) => {
    setCopId(id);
    const textToCopy = stripHtml(textCopy);
    setCopyIcon(true);
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // alert('Text copied to clipboard');
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
    setTimeout(() => setCopyIcon(false), 500);
  };
  const handleResendMessage = (id) => {
    setResponseId(id);
    setLoadingMessage(true);
    axios
      .post(
        "https://sbc.designal.cc/api/resend-message",
        {
          chat_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch(updateSlice());
        setLoadingMessage(false);
        setResponseId("");
      })
      .catch((error) => {
        setLoadingMessage(false);
        setResponseId("");
        console.error("There was an error making the request!", error);
      });
  };
  const handleDislike = (data) => {
    dispatch(loading_chat_action(true));
    axios
      .post(
        `${config.api}admin/chat-user-dislikes`,
        {
          user_chat_id: itemId,
          comment: dislikeMessage,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setLoadingMessage(false);
        dispatch(loading_chat_action(false));
        setDislike(false);
      })
      .catch((error) => {
        setLoadingMessage(false);
        dispatch(loading_chat_action(false));
        setDislike(false);
        console.error("There was an error making the request!", error);
      });
  };
  const handleStartNewChat = () => {
    dispatch(chat_out());
    dispatch(loading_chat(true));
    dispatch(loading_chat_action(true));

    axios
      .post(
        `${config.api}create_thread`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        dispatch(getChatCode(response.data.data[0]));
        dispatch(loading_chat_action(false));
        dispatch(loading_chat(false));
        // localStorage.setItem("chat", response.data.data[0]);
      })
      .catch((error) => {
        dispatch(loading_chat(false));
        dispatch(loading_chat_action(false));
        console.error("There was an error making the request!", error);
      });
  };
  dispatch(action_done(true));
  useEffect(() => {
    if (localStorage.getItem("data")) {
      setUser(JSON.parse(localStorage.getItem("data")).name);
    }
  }, []);
  useEffect(() => {
    setwidthchat(window.innerWidth);
    window.onresize = () => {
      setwidthchat(window.innerWidth);
      window.MathJax && window.MathJax.typeset();
    };
  }, []);
  useEffect(() => {
    window.MathJax && window.MathJax.typeset();
  }, [windhtchat]);
  useEffect(() => {
    window.MathJax && window.MathJax.typeset();
  }, [conversation]);
  const pattern = /SBC.*?\/\//g;
  const textHandler = (item) => {
    if (item.match(pattern)) {
      let dataArray = item.match(pattern);
      let data = item;
      dataArray.forEach((item2) => {
        data = data.replaceAll(item2, "");
      });
      return data;
    }
    return item; // Return the original item if no match is found
  };
  // Scroll to the bottom
  const scrollToBottom = () => {
    const element = document.getElementById("chat");
    if (element) {
      setTimeout(() => {
        element.scrollTop = element.scrollHeight - element.clientHeight;
      }, 100); // Adjust delay if needed
    }
  };
  useEffect(() => {
    scrollToBottom();
    window.MathJax && window.MathJax.typeset();
  }, [conversation, chatData]);

  function handleShowStart() {
    if (chatCode) {
      return false;
    } else if (conversation && Object.entries(conversation).length === 0) {
      return true;
    }
  }
  useEffect(() => {
    if (localStorage.getItem("data")) {
      setUser(JSON.parse(localStorage.getItem("data")).name);
    }
  }, []);


  return (
    <div className="col-span-3 bg-white relative">
      {!loadingchat ? (
        <>
          <div
            className="w-full log-bannar-2"
            style={{ paddingTop: "100px", height: "100vh" }}
          >
            <div
              className="w-full grid grid-cols-4"
              id="chat"
              style={{
                height: "calc(100vh - 120px)",
                width: windhtchat - 10 + "px",
                position: "absolute",
                right: 0,
                top: 0,
                overflowY: "scroll",
              }}
            >
              <div
                className="col-span-1"
                style={{ width: elementWidth + "px" }}
              ></div>
              {/* relative */}
              <div className="col-span-3 py-5">
                {chatSlice_loading ? (
                  <div className="flex items-center justify-center min-h-screen">
                    <img
                      src={loadingImg.src}
                      className="loading_icon"
                      alt="laoding"
                    />
                  </div>
                ) : (
                  <ul>
                    {handleShowStart() ? (
                      <div className="pt-3" style={{ paddingTop: "200px" }}>
                        <div className="text-center">
                          <div
                            className="m-auto mb-2"
                            style={{ width: "200px" }}
                          >
                            <img src={StartLogo.src} className="w-100" alt="" />
                          </div>
                          {/* <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">No Chat yet !</h1> */}
                          <p className="mt-3 text-xs leading-8 text-gray-600">
                            you can start new session or chose previous chat.
                          </p>
                          <div className="mt-6 flex items-center justify-center gap-x-6">
                            {loading_actions ? (
                              <div class="dot-wave">
                                <div class="dot-wave__dot"></div>
                                <div class="dot-wave__dot"></div>
                                <div class="dot-wave__dot"></div>
                                <div class="dot-wave__dot"></div>
                              </div>
                            ) : (
                              <button
                                onClick={handleStartNewChat}
                                className="learn-more start"
                              >
                                <span className="circle" aria-hidden="true">
                                  <span className="icon arrow"></span>
                                </span>
                                <span className="button-text">Start Chat</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <li
                        ref={chatRef}
                        id="chat-zeft"
                        className="clearfix2 mt-4 px-10 w-full"
                        style={{ paddingTop: "90px" }}
                      >
                        {chatData &&
                          conversation &&
                          conversation.userChats &&
                          chatData.map((item, i) => (
                            <React.Fragment key={i}>
                              <div className="flex justify-end relative w-full">
                                <div>
                                  <div className="chat_userName_2 text-right">
                                    {user}
                                  </div>
                                  <div className="flex justify-end">
                                    <div className="bg-sky-900 text-white rounded px-5 py-2 my-2 relative chat_card">
                                      <MathJaxContext>
                                        <MathJax dynamic>
                                          <span
                                            className="block"
                                            dir={
                                              isEnglish(item.question)
                                                ? "ltr"
                                                : "rtl"
                                            }
                                            dangerouslySetInnerHTML={{
                                              __html: item.question.replaceAll(
                                                "\n",
                                                "<br/>"
                                              ),
                                            }}
                                          />
                                        </MathJax>
                                      </MathJaxContext>
                                    </div>
                                  </div>
                                  <div
                                    className="flex mb-3 justify-end"
                                    style={{ height: "20px" }}
                                  >
                                    {!copyIcon ? (
                                      <svg
                                        onClick={() =>
                                          handleCopyText(item.question, i)
                                        }
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="black"
                                        className="size-3.5 mr-4 cursor-pointer"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z"
                                          clipRule="evenodd"
                                        />
                                        <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                                        <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                                      </svg>
                                    ) : (
                                      i == copID && (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="black"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className="size-3.5 mr-4  ml-2"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                          />
                                        </svg>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="relative w-full">
                                <div
                                  className="code"
                                  style={{ width: elementWidth - 40 + "px" }}
                                >
                                  {item.pdfs?.length > 0 && (
                                    <span className="hover:bg-gray-100 border border-gray-300 px-3 py-2 overflow-auto	 flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
                                      <div className="w-full pb-2">
                                        <div className="flex justify-between"></div>
                                        <span className="block ml-2 text-sm text-gray-600  font-semibold">
                                          {
                                            // item.answer.match(pattern) ? (
                                            //   item.answer
                                            //     .match(pattern)
                                            //     ?.map((item3, i) => (
                                            // <p className="w-100 my-3" key={i}>
                                            //   {item3}
                                            // </p>
                                            //     ))

                                            item.pdfs?.length > 0 ? (
                                              item.pdfs.map((item, i) => (
                                                <p
                                                  className="w-100 my-3"
                                                  key={i}
                                                >
                                                  {item.section.name}ssdfsdf
                                                </p>
                                              ))
                                            ) : (
                                              <div>No Reference</div>
                                            )
                                          }
                                        </span>
                                      </div>
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <div className="chat_userName">
                                    <img
                                      src={Logo.src}
                                      style={{ width: "30px" }}
                                      alt="logo"
                                    />
                                  </div>
                                  <div className="w-full flex justify-start chat_card">
                                    <div className="bg-gray-200 rounded px-5 py-2 my-2 text-gray-700 relative chat_card">
                                      {responseId == item.id ? (
                                        <img
                                          src={loadingImg.src}
                                          className="loading_icon"
                                          alt="laoding"
                                        />
                                      ) : (
                                        <>
                                          {item?.answer ? (
                                            chatData.length - 1 === i &&
                                            false ? (
                                              <ReactTyped
                                                strings={[
                                                  textHandler(
                                                    item.answer.replaceAll(
                                                      "\n",
                                                      "<br/>"
                                                    )
                                                  ),
                                                ]}
                                                showCursor={false}
                                                onComplete={() =>
                                                  dispatch(setTypeValue(false))
                                                }
                                                backSpeed={50}
                                                typeSpeed={5}
                                              />
                                            ) : (
                                              <span
                                                className="block chat_box"
                                                style={{ overflowX: "auto" }}
                                                dir={
                                                  isEnglish(item.answer)
                                                    ? "ltr"
                                                    : "rtl"
                                                }
                                                dangerouslySetInnerHTML={{
                                                  __html: textHandler(
                                                    item.answer.replaceAll(
                                                      "\n",
                                                      "<br/>"
                                                    )
                                                  ),
                                                }}
                                              />
                                            )
                                          ) : (
                                            <div>
                                              <img
                                                className="m-auto"
                                                src={loadingImg.src}
                                                style={{ width: "70px" }}
                                                alt="loading"
                                              />
                                            </div>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </div>
                                  {item?.answer ? (
                                    <div className="flex mb-3">
                                      <svg
                                        onClick={() =>
                                          handleReadText(item.answer, i)
                                        }
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="black"
                                        className="size-3.5 ml-2 cursor-pointer"
                                      >
                                        <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                                        <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                                      </svg>
                                      {isSpeaking && i == copID && (
                                        <svg
                                          onClick={handleStopReading}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          fill="black"
                                          className="size-3.5 ml-2 cursor-pointer"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM9 8.25a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75H9Zm5.25 0a.75.75 0 0 0-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75h-.75Z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      )}
                                      {!copyIcon ? (
                                        <svg
                                          onClick={() =>
                                            handleCopyText(item.answer, i)
                                          }
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                          fill="black"
                                          className="size-3.5 ml-2 cursor-pointer"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z"
                                            clipRule="evenodd"
                                          />
                                          <path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z" />
                                          <path d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z" />
                                        </svg>
                                      ) : (
                                        i == copID && (
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="black"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-3.5 ml-2"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                          </svg>
                                        )
                                      )}
                                      {pathName.trim().slice(0, 9) !== "/sharable" &&
                                      <svg
                                        onClick={() => dislikeToggle(item.id)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="black"
                                        className="size-3.5 ml-2 cursor-pointer"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                        />
                                      </svg>}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            </React.Fragment>
                          ))}
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
          {pathName.slice(0, 9) == "/sharable" ? (
            ""
          ) : (conversation && Object.entries(conversation).length !== 0) ||
            chatCode.length > 0 ? (
            <div style={{ width: "100%", position: "absolute", bottom: "0" }}>
              <ChatInput />
            </div>
          ) : (
            <div></div>
          )}
        </>
      ) : (
        <Loading_chat />
      )}
      {dislike && (
        <Dislike
          handleDislike={handleDislike}
          setDislikeMessage={setDislikeMessage}
          setDislike={setDislike}
          dislike={dislike}
        />
      )}
    </div>
  );
}

export default MainChat;
