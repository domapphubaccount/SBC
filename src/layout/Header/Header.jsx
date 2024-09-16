"use client";
import MultipleSelect from "@/components/Chat/code/code";
import Archive from "@/components/archive/Archive";
import DropDown from "@/components/dropDown/DropDown";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import { chat_out, choseChate, get_chat, getChatCode } from "@/app/Redux/Features/Chat/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { loading_chat } from "@/app/Redux/Features/Update/UpdateSlice";
import Logo from "/public/logo.png";
import { config } from "@/config/config";
import { loading_chat_action } from "@/app/Redux/Features/Chat/ChatActionsSlice";

function Header({ path }) {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const pathname = usePathname();

  const handleStartNewChat = () => {
    dispatch(chat_out())
    dispatch(loading_chat_action(true))
    dispatch(loading_chat(true));
    axios
      .post(
        `${config.api}create_thread`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch(getChatCode(response.data.data[0]));
        dispatch(loading_chat_action(false))
        dispatch(loading_chat(false));
        
        // localStorage.setItem("chat_code", response.data.data[0]);
      })
      .catch((error) => {
        dispatch(loading_chat_action(false))
        dispatch(loading_chat(false));
        console.error("There was an error making the request!", error);
      });
  };

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between navbar-expand-lg bg-darkBlue">
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
          {pathname.slice(0, 9) == "/sharable" ? (
            ""
          ) : (
            <>
              {!path ? (
                <div id="code">
                  <MultipleSelect />
                </div>
              ) : (
                <div className="text-white">PROFILE</div>
              )}
              <div className="break_nav w-full"></div>
              <div className="flex items-center shadow-none  bg-darkBlue">
                <ul className="flex justify-between list-none ml-auto items-center">
                  <li className="mr-3 relative" title="timeline">
                    <Archive />
                  </li>
                  {/* start start new chat */}
                  <li
                    title="start new chat"
                    className="mr-3"
                    onClick={handleStartNewChat}
                  >
                    <div>
                      <div tabindex="0" className="plusButton">
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
                  {/* end start new chat */}
                  <li title="profile">
                    <DropDown userName={userName} />
                  </li>
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
