"use client";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/logo/icon.png";
import { config } from "@/config/config";

function Example({
  shareName,
  setShareName,
  setShareToggle,
  setSharableChat,
  sharableChat,
  shareToggle,
  handleCopyShare,
  handleChat,
  token,
}) {
  const [copyAction, setCopyAction] = useState(false);
  // name toggle
  const toggleShare = () => {
    axios
      .get(`${config.api}sharable/${handleChat.sharable_link}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data) {
          setSharableChat(res.data);
          console.log(res.data.data);
        }
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    toggleShare();
  }, []);

  const copyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.href}sharable/${handleChat.sharable_link}`)
      .then(() => {
        setCopyAction(true);
        setTimeout(() => setCopyAction(false), 1000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  console.log(sharableChat);
  return (
    <div>
      <div className="fixed z-10 inset-0 overflow-y-auto" x-cloak>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            style={{ backgroundColor: "rgb(0 0 0 / 17%)" }}
            className="py-12 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0 W-57"
            id="modal"
          >
            <div
              role="alert"
              style={{ maxWidth: "700px" }}
              className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
            >
              <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
                <div className="w-full flex justify-start text-gray-600 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-wallet"
                    width="52"
                    height="52"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                    <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
                  </svg>
                </div>
                {sharableChat.length >= 1 && (
                  <>
                    <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
                      {sharableChat[0].name}
                    </h1>
                    <div
                      id="chat"
                      className="w-full p-10 relative rounded-1"
                      style={{
                        height: "400px",
                        overflowY: "auto",
                        boxShadow: "inset 1px 1px 20px 0px #cccccc75",
                      }}
                    >
                      <ul>
                        <li className="clearfix2 mt-4">
                          {sharableChat[0].user_chats.map((item, i) => (
                            <React.Fragment key={i}>
                              <div className="flex justify-end relative">
                                {/* <div className='code'></div> */}
                                <div>
                                  <div className="chat_userName_2 text-right">
                                    {
                                      JSON.parse(localStorage.getItem("data"))
                                        .name
                                    }
                                  </div>
                                  <div className="flex justify-end">
                                    <div
                                      className="bg-sky-900 text-white rounded px-5 py-2 my-2 relative"
                                      style={{ maxWidth: "300px" }}
                                    >
                                      <span
                                        className="block"
                                        dangerouslySetInnerHTML={{
                                          __html: item.question,
                                        }}
                                      />
                                      <span
                                        className="block text-xs text-right"
                                        style={{ fontSize: "0.5rem" }}
                                      >
                                        {item.created_at.slice(11, 16)}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="relative flex">
                                <div>
                                  <div className="chat_userName">
                                    <img
                                      src={Logo.src}
                                      style={{ width: "30px" }}
                                      alt="logo"
                                    />
                                  </div>
                                  <div className="w-full flex justify-start">
                                    <div
                                      className="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"
                                      style={{ maxWidth: "300px" }}
                                    >
                                      <MathJaxContext>
                                        <MathJax dynamic>
                                          <span
                                            className="block text-left"
                                            dangerouslySetInnerHTML={{
                                              __html: item.answer,
                                            }}
                                          />
                                        </MathJax>
                                      </MathJaxContext>
                                      {/* <span className="block text-right" style={{fontSize:'0.5rem'}}>10:30pm</span> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </React.Fragment>
                          ))}
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 text-start text-black px-4 mb-4">
                      {JSON.parse(localStorage.getItem("data")).name} at{" "}
                      {sharableChat[0].created_at.slice(0, 10)}
                    </div>
                    <div className="flex items-center justify-between w-full">
                      {/* <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          id="switch"
                          type="checkbox"
                          className="peer sr-only"
                          defaultChecked
                          onChange={(e) => {
                            e.target.checked
                              ? handleCopyShare("yes")
                              : handleCopyShare("no");
                          }}
                        />{" "}
                        <label for="switch" className="hidden"></label>
                        <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                        <span className="text-black fw-bold ml-3">
                          Share your name
                        </span>
                      </label> */}

                      <button
                        onClick={copyLink}
                        className="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                            />
                          </svg>
                        </span>
                        <span>
                          {copyAction ? "copied successfully" : "Copy Link"}
                        </span>
                      </button>
                    </div>
                  </>
                )}
                <button
                  onClick={() => setShareToggle(false)}
                  className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
                  onclick="modalHandler()"
                  aria-label="close modal"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Example;
