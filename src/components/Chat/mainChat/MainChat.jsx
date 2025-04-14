"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ChatInput from "../chatInput/ChatInput";
import axios from "axios";
import Dislike from "./actions/Dislike";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loading_chat } from "@/app/Redux/Features/Update/UpdateSlice";
import {
  chat_out,
  error_start_chat,
  getChatCode,
} from "@/app/Redux/Features/Chat/ChatSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import StartLogo from "@/assets/logo/start_logo.png";
import Logo from "@/assets/logo/icon.png";
import { config } from "@/config/config";
import {
  action_done,
  loading_chat_action,
} from "@/app/Redux/Features/Chat/ChatActionsSlice";
import Loading_chat from "../chatContainer/Loading";
import { Button, Popover } from "flowbite-react";
import { useSnackbar } from "notistack";
import {
  clear_code_error,
  set_code_error,
} from "@/app/Redux/Features/Code/CodeSlice";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import "boxicons/css/boxicons.min.css";

function MainChat({ windowWidth }) {
  const pathName = usePathname();
  const [copyIcon, setCopyIcon] = useState(false);
  const [dislike, setDislike] = useState(false);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const [itemId, setItemId] = useState(null);
  const [fileId, setFileId] = useState("");
  const [dislikeMessage, setDislikeMessage] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copID, setCopId] = useState();
  const chatData = useSelector((state) => state.chatSlice.chat_data);
  const conversation = useSelector((state) => state.chatSlice.conversation);
  const loadingchat = useSelector((state) => state.chatSlice.loading);
  const chatRef = useRef();
  const dispatch = useDispatch();
  const chatCode = useSelector((state) => state.chatSlice.chat_code);
  const [errorMessage, setErrorMessage] = useState();
  const loading_actions = useSelector(
    (state) => state.chatActionsSlice.loading
  );
  const navigate = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [actionSuccess, setAction] = useState(false);
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );
  const { name } = useSelector((state) => state.profileSlice.profile);
  const usedCode = useSelector((state) => state.codeSlice.usedCode);

  useEffect(() => {
    if (actionSuccess) {
      enqueueSnackbar("This action has been done successfully", {
        variant: "success",
      });
    }
  }, [actionSuccess]);
  useEffect(() => {
    window.MathJax && window.MathJax.typeset();
  }, [
    copyIcon,
    copID,
    isSpeaking,
    windowWidth,
    errorMessage,
    fileId,
    chatData,
  ]);
  function isEnglish(text) {
    const englishChars = text.match(/[A-Za-z]/g) || [];
    const englishCharCount = englishChars.length;

    const totalCharCount = text.replace(/[^A-Za-z]/g, "").length;

    if (totalCharCount === 0) return false;
    const percentageEnglish = (englishCharCount / totalCharCount) * 100;

    return percentageEnglish > 50;
  }

  const dislikeToggle = (id) => {
    setItemId(id);
    setDislike(!dislike);
  };
  const handleReadText = async (textRead, id) => {
    setCopId(id);
    try {
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
    let textCop = textCopy;

    if (textCop.match(pattern)) {
      let fileIdArray = textCop.match(pattern);
      fileIdArray.forEach((item2) => {
        textCop = textCop.replaceAll(item2, "");
      });
    }

    if (textCop.match(pattern)) {
      let fileIdArray = textCop.match(pattern);
      fileIdArray.forEach((item2) => {
        textCop = textCop.replaceAll(item2, "");
      });
    }
    setCopId(id);
    const textToCopy = stripHtml(textCop);
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
  const handleDislike = (data) => {
    setErrorMessage();
    dispatch(loading_chat_action(true));
    axios
      .post(
        `${config.api}dislike/message`,
        {
          file_ids: fileId,
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
        setErrorMessage();
        dispatch(loading_chat_action(false));
        setDislike(false);
        setAction(true);
        setTimeout(() => setAction(false), 1500);
      })
      .catch((error) => {
        dispatch(loading_chat_action(false));
        setErrorMessage(error?.response?.data?.message);
        console.error("There was an error making the request!", error);
      });
  };

  // start new chant
  const handleStartNewChat = () => {
    if (pathName.trim().slice(0, 9) == "/sharable") {
      navigate.push("/signIn");
    } else {
      if (true) {
        //usedCode.length > 0
        dispatch(chat_out());
        dispatch(loading_chat(true));
        dispatch(loading_chat_action(true));

        axios
          .post(
            `${config.api}create_thread`,
            {
              // file_ids: usedCode.join(),
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
            dispatch(getChatCode(response.data?.data));
            dispatch(loading_chat_action(false));
            dispatch(loading_chat(false));
          })
          .catch((error) => {
            dispatch(loading_chat(false));
            dispatch(loading_chat_action(false));
            console.error("There was an error making the request!", error);
            if (error.response?.data?.error) {
              dispatch(error_start_chat(error.response.data.error));
            } else if (error.response.data.message) {
              dispatch(error_start_chat(error.response.data.message));
            }
            setTimeout(() => dispatch(error_start_chat(null)), 2000);
          });
      } else {
        // dispatch(
        //   set_code_error('You cant start new chat without mentioning "CODE"')
        // );
        // setTimeout(() => dispatch(clear_code_error()), 1000);
      }
    }
  };
  dispatch(action_done(true));

  const pattern = /SBC\s+(.*?)\s*\/\//g;

  const textHandler = (item) => {
    let data = item;
  
    if (data.match(pattern)) {
      const matches = data.match(pattern);
      matches.forEach((match) => {
        data = data.replaceAll(match, "");
      });
    }
  
    return (
      <span
        dangerouslySetInnerHTML={{
          __html: data,
        }}
      />
    );
  };
  
  

  // Scroll to the bottom function
  const scrollToBottom = () => {
    const element = document.getElementById("chat");
    if (element) {
      setTimeout(() => {
        element.scrollTop = element.scrollHeight - element.clientHeight;
      }, 100); // Adjust delay if needed
    }
  };
  // start handle scroll bottom action
  useEffect(() => {
    scrollToBottom();
  }, [conversation, chatData]);
  // end handle scroll bottom action
  // start handle starter card
  function handleShowStart() {
    if (chatCode) {
      return false;
    } else if (conversation && Object.entries(conversation).length === 0) {
      return true;
    }
  }
  // end handle starter card
  // start question card
  let questionCard = useCallback((item) => {
    return (
      <div className="bg-sky-900 text-white rounded px-5 py-2 my-2 relative chat_card question">
        <span
          style={{
            textAlign: `${isEnglish(item.question) ? "left" : "right"}`,
          }}
          className="block"
          dir={"auto"}
          dangerouslySetInnerHTML={{
            __html: item.question.replaceAll("\n", "<br/>"),
          }}
        />
      </div>
    );
  }, []);
  // end question card
  // start question card
  let answerCard = useCallback((item) => {
    return (
      <MathJaxContext
        version={3}
        options={{
          loader: { load: ["input/asciimath", "output/chtml"] },
          tex: { tags: "ams" },
        }}
      >
        <MathJax>
          <span
            style={{
              overflowX: "auto",
              textAlign: `${isEnglish(item.answer) ? "left" : "right"}`,
            }}
            className="block chat_box"
            dir={"auto"}
          >
            {textHandler(item.answer)}
          </span>

          <div className="mt-4 text-xs">
            <hr className="my-2" />
            {/*  BYLD Documentation - Page 12 */}
            {item?.answer?.includes("//") && item.answer.match(pattern)
              ? item.answer
                  .match(pattern)
                  ?.map((item2, i) => <li key={i}>📘 Reference: {item2}</li>)
              : "No Reference"}
          </div>
        </MathJax>
      </MathJaxContext>
    );
  });
  // end question card
  // start chat space
  let chatSpace = useMemo(() => {
    return (
      <li
        ref={chatRef}
        id="chat-zeft"
        className="clearfix2 mt-4 px-10 w-full"
        style={{ paddingTop: "90px" }}
      >
        {chatData &&
          conversation &&
          (conversation.userChats ||
            conversation.user_chats ||
            chatData.length > 0) &&
          chatData.map((item, i) => (
            <React.Fragment key={i}>
              <div className="flex justify-end relative w-full my-4">
                <div>
                  <div className="chat_userName_2 text-right">{name}</div>
                  <div className="flex justify-end">
                    {/* answer */}
                    {questionCard(item)}
                  </div>
                  <div
                    className="flex mb-3 justify-end"
                    style={{ height: "20px" }}
                  >
                    {!copyIcon ? (
                      <i
                        class="bx bx-copy cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
                        style={{ transition: "none" }}
                        onClick={(e) => {
                          handleCopyText(item.question, i);
                          const svgElement = e.currentTarget;
                          if (svgElement) {
                            svgElement.classList.add("action-icon");
                            setTimeout(() => {
                              if (svgElement) {
                                svgElement.classList.remove("action-icon");
                              }
                            }, 500);
                          }
                        }}
                      ></i>
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
                <div>
                  <div className="chat_userName">
                    <img src={Logo.src} style={{ width: "30px" }} alt="logo" />
                  </div>
                  <div className="w-full flex justify-start">
                    <div className="rounded px-5 py-2 my-2 relative chat_card">
                      {item?.answer ? (
                        // answer card
                        answerCard(item)
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
                    </div>
                  </div>
                  {item?.answer &&
                  !item.answer.includes(
                    "Sorry there is an ERROR please try again"
                  ) ? (
                    <div className="flex mb-3">
                      <i
                        style={{ transition: "none" }}
                        onClick={(e) => {
                          handleReadText(item.answer, i); // Execute your copy function
                          const svgElement = e.currentTarget; // Store the reference
                          if (svgElement) {
                            // Check if svgElement is not null
                            svgElement.classList.add("action-icon"); // Add the class for styling
                            setTimeout(() => {
                              if (svgElement) {
                                // Ensure svgElement is still available
                                svgElement.classList.remove("action-icon");
                              }
                            }, 500); // Remove the class after 500ms
                          }
                        }}
                        className="bx bx-volume-low cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
                      ></i>

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
                        <i
                          className="bx bx-copy ms-2 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
                          style={{ transition: "none" }}
                          onClick={(e) => {
                            handleCopyText(item.answer, i);
                            const svgElement = e.currentTarget; // Store the reference
                            if (svgElement) {
                              // Check if svgElement is not null
                              svgElement.classList.add("action-icon"); // Add the class for styling
                              setTimeout(() => {
                                if (svgElement) {
                                  // Ensure svgElement is still available
                                  svgElement.classList.remove("action-icon");
                                }
                              }, 500); // Remove the class after 500ms
                            }
                          }}
                        ></i>
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
                        permissionsData &&
                        permissionsData.includes("openai.dislike_message") && (
                          <i
                            class="bx bx-dislike ms-2 cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
                            style={{ transition: "none" }}
                            onClick={(e) => {
                              dislikeToggle(item.id);

                              if (item.answer?.match(pattern)) {
                                setFileId(
                                  item.answer?.match(pattern) &&
                                    item.answer
                                      ?.match(pattern)[0]
                                      ?.slice(18, -1)
                                );
                              } else if (item.answer?.match(pattern)) {
                                setFileId(
                                  item.answer?.match(pattern) &&
                                    item.answer
                                      ?.match(pattern)[0]
                                      ?.match(/\[file_id:([^\]]+)\]/)[0]
                                      ?.slice(9, -1)
                                );
                              } else if (item.answer.match(file_id_pattern_4)) {
                                setFileId(
                                  item.answer?.match(file_id_pattern_4) &&
                                    item.answer
                                      ?.match(file_id_pattern_4)[0]
                                      ?.slice(1, -1)
                                );
                              } else {
                                setFileId();
                              }
                              const svgElement = e.currentTarget;
                              if (svgElement) {
                                svgElement.classList.add("action-icon");
                                setTimeout(() => {
                                  if (svgElement) {
                                    svgElement.classList.remove("action-icon");
                                  }
                                }, 500);
                              }
                            }}
                          ></i>
                        )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
      </li>
    );
  }, [chatData, windowWidth, chatData?.question, isSpeaking]);
  // end chat space

  return (
    <div className={`relative`}>
      {!loadingchat ? (
        <>
          <div
            className="w-full log-bannar-2"
            style={{ paddingTop: "100px", height: "100vh" }}
          >
            <div
              className="w-full"
              id="chat"
              style={{
                height: "calc(100vh - 120px)",
                width: "100vw",
                position: "absolute",
                right: 0,
                top: 0,
                overflowY: "scroll",
              }}
            >
              {/* relative */}
              <div className="max-w-4xl mx-auto">
                {loadingchat ? (
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
                      <div className="pt-[200px]">
                        <div className="text-center">
                          {/* Logo without box shadow */}
                          <div className="m-auto mb-4 w-[200px] transition-transform duration-500 hover:scale-105">
                            <img
                              src={StartLogo.src}
                              alt="Start Logo"
                              className="w-full rounded-lg"
                            />
                          </div>

                          {/* Subheading text */}
                          <p className="mt-4 text-sm leading-7 text-gray-600 animate-fade-in">
                            You can start a new session or choose a previous
                            chat.
                          </p>

                          {/* Button or Loader */}
                          <div className="mt-8 flex items-center justify-center gap-x-6">
                            {loading_actions ? (
                              <div className="flex gap-1 animate-pulse">
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                              </div>
                            ) : (
                              permissionsData?.includes(
                                "openai.create_thread"
                              ) && (
                                <button
                                  onClick={handleStartNewChat}
                                  className="relative px-4 py-2 rounded-full bg-[#1E293B] text-white text-lg font-semibold shadow-lg hover:bg-[#1E293B] hover:shadow-xl hover:scale-105 transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E293B]"
                                >
                                  <span className="inline-block mr-2">🚀</span>
                                  Start Chat
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      // chat space
                      chatSpace
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
              {permissionsData &&
                permissionsData.includes("openai.ask_question") && (
                  <ChatInput />
                )}
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <Loading_chat />
      )}
      {dislike && (
        <Dislike
          fileId={fileId}
          errorMessage={errorMessage}
          loading_actions={loading_actions}
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
