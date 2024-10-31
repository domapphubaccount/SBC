import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { config } from "@/config/config";
import { loading_chat_action } from "@/app/Redux/Features/Chat/ChatActionsSlice";
import {
  delete_module,
  rename_module,
} from "@/app/Redux/Features/Chat_History/historySlice";
import { update_archive } from "@/app/Redux/Features/Update/UpdateSlice";
import ShareChatLink from "../../Chat/shareChatLink/ShareChatLink";

function ArchiveAction({
  setSharableChat,
  sharableChat,
  handleChat,
  setHandleChat,
  setShareToggle,
  token,
  shareToggle,
}) {
  const renameToggle = useSelector((state) => state.historySlice.rename_module);
  const deleteToggle = useSelector((state) => state.historySlice.delete_module);
  const [shareName, setShareName] = React.useState("0");
  const [inputName, setInputName] = React.useState("");

  const [ErrorMSG, setError] = useState("");

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.chatActionsSlice.loading);
  const disabledAction = useSelector((state) => state.chatActionsSlice.loading);

  const handleRename = () => {
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
          dispatch(update_archive());
          dispatch(loading_chat_action(false));
          dispatch(rename_module(false));
          setOpen(false);
          setAction(true);
          setTimeout(() => setAction(false), 1500);
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
        setTimeout(() => setError(""), 1500);
        dispatch(loading_chat_action(false));
        console.error("There was an error making the request!", error);
      });
    window.MathJax && window.MathJax.typeset();
  };
  const handleDeleteChate = (handleChat) => {
    dispatch(loading_chat_action(true));
    axios
      .post(
        `${config.api}archive-chat`,
        {
          chat_id: handleChat.id,
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
          dispatch(delete_module(false));

          if (handleChat.id === conversation.id) {
            localStorage.removeItem("chat");
            setHandleChat({});
            dispatch(choseChate(null));
            dispatch(getConversation([]));
          }
          dispatch(update_archive());
          setOpen(false);
          setAction(true);
          setTimeout(() => setAction(false), 1500);
        }
      })
      .catch((error) => {
        dispatch(loading_chat_action(false));
        setError(error.response.data.message);
        setTimeout(() => setError(""), 1500);
        console.error("There was an error making the request!", error);
      });
    window.MathJax && window.MathJax.typeset();
  };
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
  return (
    <>
      {renameToggle && handleChat && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {ErrorMSG && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error!</span> {ErrorMSG}
            </div>
          )}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          {ErrorMSG && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error!</span> {ErrorMSG}
              </div>
            )}
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
                    onClick={handleRename}
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary-color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500	 sm:ml-3 sm:w-auto"
                  >
                    Rename
                  </button>
                  <button
                    onClick={() => dispatch(rename_module(false))}
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
            {ErrorMSG && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span className="font-medium">Error!</span> {ErrorMSG}
              </div>
            )}
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
                    onClick={() => dispatch(delete_module(false))}
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
    </>
  );
}

export default ArchiveAction;
