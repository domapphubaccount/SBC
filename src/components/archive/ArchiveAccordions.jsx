import React, { useEffect, useState } from "react";
import ArchiveSettings from "./ArchiveSettings";
import ShareChatLink from "../Chat/shareChatLink/ShareChatLink";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loading_chat,
  updateSlice,
  update_archive,
} from "@/app/Redux/Features/Update/UpdateSlice";
import {
  choseChate,
  getChatHistory,
  getConversation,
  loading_main_chat,
} from "@/app/Redux/Features/Chat/ChatSlice";
import Logo from "@/assets/logo/icon.png";
import { config } from "@/config/config";
import {
  getHistoryAction,
  loading_get_chat_history,
} from "@/app/Redux/Features/Chat_History/historySlice";
import { loading_chat_action } from "@/app/Redux/Features/Chat/ChatActionsSlice";
import loadingImg from "@/assets/logo/loading_icon.gif";
import { useSnackbar } from "notistack";

function TailwindAccordion() {
  const [open, setOpen] = useState(null);
  const [renameToggle, setRenameToggle] = useState(false);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [handleChat, setHandleChat] = useState({});
  const [actionAlert, setActionAlert] = useState(false);
  const [inputName, setInputName] = useState("");
  const [shareName, setShareName] = useState("0");
  const [shareToggle, setShareToggle] = useState(false);
  const [sharableChat, setSharableChat] = useState([]);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const dashboardData = useSelector((state) => state.historySlice.chat_history);
  const updateDashboard = useSelector((state) => state.updateSlice.archive);
  const updates = useSelector((state) => state.updateSlice.state);
  const loading = useSelector((state) => state.chatActionsSlice.loading);
  const loadingHistory = useSelector((state) => state.historySlice.loading);
  const dispatch = useDispatch();
  const chatid = useSelector((state) => state.chatSlice.get_chat);
  const conversation = useSelector((state) => state.chatSlice.conversation);
  const disabledAction = useSelector((state) => state.chatActionsSlice.loading);
  const [action , setAction] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (action) {
      enqueueSnackbar("This action has been done successfully", { variant: "success" });
    }
  }, [action]);

  useEffect(() => {
    dispatch(getHistoryAction({ token }));
  }, [updates, updateDashboard, token]);

  const handleAction = () => {
    setActionAlert(true);
    setTimeout(() => setActionAlert(false), 4000);
    window.MathJax && window.MathJax.typeset();
  };
  // mark name sharable
  const handleCopyShare = (toggleItem) => {
    axios
      .post(
        "https://sbc.designal.cc/api/mark-name-sharable",
        {
          chat_id: handleChat.id,
          share_name: toggleItem,
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
        if (response.data.success) {
          // console.log(response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error making the request!", error);
      });
  };
  const toggle = (id) => {
    setOpen((prevId) => (prevId === id ? null : id));
  };
  const handleRename = (handleChat) => {
    dispatch(loading_chat_action(true));
    axios
      .post(
        `${config.api}rename-chat`,
        {
          chat_id: handleChat.id,
          new_name: inputName,
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
        if (response.data) {
          setHandleChat({});
          handleAction();
          dispatch(update_archive());
          dispatch(loading_chat_action(false));
          setRenameToggle(false);
          setOpen(false);
          setAction(true)
          setTimeout(()=>setAction(false),1500)
        }
      })
      .catch((error) => {
        dispatch(loading_chat_action(false));
        console.error("There was an error making the request!", error);
      });
    window.MathJax && window.MathJax.typeset();
  };


  const handleGetChat = (chat_id, share_name) => {
    if (chatid != chat_id) {
      dispatch(choseChate(chat_id));
      dispatch(loading_main_chat(true));
      // dispatch(loading_chat(true));
      dispatch(loading_get_chat_history(true));
      localStorage.setItem("chat", chat_id);
    }
  };
  const handleDeleteChate = (handleChat) => {
    dispatch(loading_chat_action(true));
    axios
      .post(
        `${config.api}archive-chat`,
        {
          chat_id: handleChat.id,
          // archive: handleChat.is_archive,
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
        if (response.data) {
          dispatch(loading_chat_action(false));
          setDeleteToggle(false);

          if (handleChat.id === conversation.id) {
            localStorage.removeItem("chat");
            setHandleChat({});
            dispatch(choseChate(null));
            dispatch(getConversation([]));
          }
          dispatch(update_archive());
          setOpen(false);
          setAction(true);
          setTimeout(()=>setAction(false),1500);
        }
      })
      .catch((error) => {
        dispatch(loading_chat_action(false));
        console.error("There was an error making the request!", error);
      });
    window.MathJax && window.MathJax.typeset();
  };

  return (
    <div className="history_card w-full h-full bg-gray-50 rounded-lg shadow-lg p-2 ">
      <div className="accordion h-full">
        {dashboardData?.chat_history &&
        Object.entries(dashboardData.chat_history).length >= 1 ? (
          Object.entries(dashboardData.chat_history).map((item, i) => (
            <div className="border-b border-gray-200" key={item[0]}>
              <div
                className="cursor-pointer py-4 flex justify-between items-center"
                onClick={() => toggle(i)}
              >
                <span className="text-sm font-bold text-gray-800">
                  {item[0]}
                </span>
                {item[1]?.id && (
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      open === 2 ? "rotate-180" : "rotate-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </div>
              {open === i && (
                <div className="pb-2 text-sm font-bold text-gray-700">
                  <ul>
                    {item[1] &&
                      Object.entries(item[1]).map((item, i) => (
                        <li
                          key={i}
                          className="px-4 mb-3 hover:bg-slate-200 flex justify-between cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleGetChat(item[1].id, item[1].share_name);
                          }}
                        >
                          --{" "}
                          {item[1].id
                            ? item[1].name
                            : 
                              item[1].name}
                          <ArchiveSettings
                            item={item[1]}
                            setRenameToggle={setRenameToggle}
                            setDeleteToggle={setDeleteToggle}
                            setHandleChat={setHandleChat}
                            setShareToggle={setShareToggle}
                          />
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (loadingHistory ||
            typeof dashboardData?.chat_history === "undefined") ||(
          loadingHistory ) ? (
          <div className="text-center">
            <img
              src={loadingImg.src}
              alt="loading"
              className="w-20 loading_logo inline"
            />
            <div className="font-semibold">Loading..</div>
          </div>
        ) : (
          ( dashboardData.chat_history &&
            Object.entries(dashboardData.chat_history).length === 0) && (
            <>
              <div className="h-full w-full text-black flex justify-center items-center">
                <div className="text-center">
                  <img className="w-20 inline" src={Logo.src} alt="logo" />
                  <div className="font-semibold	">No History Yet</div>
                </div>
              </div>
            </>
          )
        )}
      </div>

      {renameToggle && handleChat && (
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
                  <div className=" sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Rename Chat
                      </h3>
                      <div className="mt-2">
                        <div className="relative h-10 w-full">
                          <input
                            style={{ color: "black" }}
                            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            defaultValue={handleChat.name}
                            onChange={(e) => setInputName(e.target.value)}
                          />
                          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Rename
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    disabled={loading || disabledAction}
                    onClick={() => handleRename(handleChat)}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary-color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500	 sm:ml-3 sm:w-auto"
                  >
                    Rename
                  </button>
                  <button
                    onClick={() => setRenameToggle(false)}
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
      {deleteToggle && handleChat && (
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
                  <div className="sm:flex sm:items-start">
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
                      <h3
                        className="text-base font-semibold leading-6 text-gray-900"
                        id="modal-title"
                      >
                        Delete Chat
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete this chat? All of your
                          data will be permanently removed. This action cannot
                          be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    onClick={() => handleDeleteChate(handleChat)}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary-color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    disabled={disabledAction}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeleteToggle(false)}
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
      {shareToggle && (
        <ShareChatLink
          setSharableChat={setSharableChat}
          sharableChat={sharableChat}
          handleChat={handleChat}
          handleCopyShare={handleCopyShare}
          setShareToggle={setShareToggle}
          token={token}
          shareToggle={shareToggle}
          setShareName={setShareName}
          shareName={shareName}
        />
      )}
    </div>
  );
}

export default TailwindAccordion;
