"use client";
import MultipleSelect from "@/components/Chat/code/code";
import Archive from "@/components/archive/Archive";
import DropDown from "@/components/dropDown/DropDown";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import {
  chat_out,
  choseChate,
  error_start_chat,
  get_chat,
  getChatCode,
  loading_main_chat,
} from "@/app/Redux/Features/Chat/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { loading_chat } from "@/app/Redux/Features/Update/UpdateSlice";
import Logo from "/public/logo.png";
import { config } from "@/config/config";
import { loading_chat_action } from "@/app/Redux/Features/Chat/ChatActionsSlice";
import { Tooltip } from "flowbite-react";

function Header({ path }) {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const pathname = usePathname();

  const handleStartNewChat = () => {
    dispatch(chat_out());
    dispatch(loading_chat_action(true));
    dispatch(loading_chat(true));
    dispatch(loading_main_chat(true));

    axios
      .post(
        `${config.api}create_thread`,
        {},
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(getChatCode(response.data.data[0]));
        dispatch(loading_chat_action(false));
        dispatch(loading_chat(false));
        dispatch(loading_main_chat(false));

        // localStorage.setItem("chat_code", response.data.data[0]);
      })
      .catch((error) => {
        console.error("There was an error making the request!", error);
        dispatch(loading_chat_action(false));
        dispatch(loading_chat(false));
        dispatch(loading_main_chat(false));
        if (error.response.data.error) {
          dispatch(error_start_chat(error.response.data.error));
        } else if (error.response.data.message) {
          dispatch(error_start_chat(error.response.data.message));
        }
        setTimeout(() => dispatch(error_start_chat(null)), 2000);
      });
  };

  return (
    <>
      <nav
        style={{zIndex:3}}
        className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between navbar-expand-lg bg-darkBlue"
      >
        <div className="w-full mx-auto flex flex-wrap items-center justify-between">
          <div className="relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start ">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="/"
            >
              <img
                width={100}
                height={100}
                quality={100}
                src={Logo.src}
                alt="logo"
              />
            </Link>
          </div>
          {pathname.trim().slice(0, 9) === "/sharable" ? (
            ""
          ) : (
            <>
              {!path ? (
                <div id="code">
                  <Tooltip content="Code" placement="left">
                    <MultipleSelect />
                  </Tooltip>
                </div>
              ) : (
                <div className="text-white">
                  {pathname.trim().slice(0, 8) === "/profile"
                    ? "PROFILE"
                    : pathname.trim().slice(0, 10) === "/dashboard"
                    ? "DASHBOARD"
                    : ""}
                </div>
              )}
              <div className="break_nav w-full"></div>

              <div className="flex items-center shadow-none  bg-darkBlue">
                <ul className="flex justify-between list-none ml-auto items-center">
                  {pathname.trim().slice(0, 8) === "/profile" ||
                  pathname.trim().slice(0, 10) === "/dashboard" ? (
                    ""
                  ) : (
                    <>
                      <Tooltip content="Chat History" placement="left" onClick={(e)=>e.stopPropagation()}>
                        <li className="mr-3 relative" title="timeline">
                          <Archive />
                        </li>
                      </Tooltip>
                      {/* start start new chat */}
                      <Tooltip content="Start new chat" placement="bottom">
                        <li
                          title="start new chat"
                          className="mr-3"
                          onClick={handleStartNewChat}
                        >
                          <div>
                            <div tabIndex="0" className="plusButton">
                              <svg
                                className="plusIcon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 30 30"
                              >
                                <g mask="url(#mask0_21_345)">
                                  <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </li>
                      </Tooltip>
                      {/* end start new chat */}
                    </>
                  )}

                  <Tooltip content="Profile" placement="bottom">
                    <li title="profile">
                      <DropDown userName={userName} />
                    </li>
                  </Tooltip>
                </ul>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;
