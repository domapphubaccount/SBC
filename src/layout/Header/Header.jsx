"use client";
import MultipleSelect from "@/components/Chat/code/code";
import Archive from "@/components/archive/Archive";
import DropDown from "@/components/dropDown/DropDown";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { redirect, usePathname } from "next/navigation";
import { choseChate, get_chat } from "@/app/Redux/Features/Chat/ChatSlice";
import { useDispatch } from "react-redux";
import { loading_chat } from "@/app/Redux/Features/Update/UpdateSlice";
import Logo from "/public/logo.png";
import { historyAction } from "@/app/Redux/Slices/HistorySlice/HistorySlice";
import { codeAction } from "@/app/Redux/Slices/CodeSlice/CodeSlice";

import { Drawer, Sidebar, TextInput } from "flowbite-react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";

import { Button, Navbar } from "flowbite-react";

function Header({ path }) {
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getItem("data")) {
      const token = JSON.parse(localStorage.getItem("data")).token;
    } else {
      if (pathname.slice(0, 9) != "/sharable") {
        redirect("/signIn");
      }
    }

    if (localStorage.getItem("data")) {
      setUserName(JSON.parse(localStorage.getItem("data")).name);
    }
  }, []);

  const handleStartNewChat = () => {
    dispatch(loading_chat(true));
    const token = JSON.parse(localStorage.getItem("data")).token;
    axios
      .get("https://sbc.designal.cc/api/start-chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          chat_id: "",
          share_name: "1",
        },
      })
      .then((response) => {
        dispatch(choseChate(response.data.data.id));
        dispatch(loading_chat(false));
        localStorage.setItem("chat", response.data.data.id);
      })
      .catch((error) => {
        dispatch(loading_chat(false));
        console.error("There was an error making the request!", error);
      });
  };

  useEffect(() => {
    dispatch(historyAction());
    dispatch(codeAction());
  }, []);

  return (
    <>
      <nav>
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
                <div>
                  <MultipleSelect />
                </div>
              ) : (
                <div>PROFILE</div>
              )}
              <div>
                <div className="flex list-none ml-auto items-center">
                  <div className="mr-3 relative" title="timeline">
                    <Archive />
                  </div>
                  <div className="history_profile">
                    {/* start start new chat */}
                    <div
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
                    </div>
                    {/* end start new chat */}
                    <div title="profile">
                      <DropDown userName={userName} />
                    </div>
                  </div>
                </div>
              </div>

              <NavToggle />
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Header;

export function NavToggle() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <label class="container_nav_box">
        <input
          onClick={() => setIsOpen(true)}
          checked={isOpen}
          type="checkbox"
        />
        <div class="checkmark">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </label>
      <Drawer open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <div className="pb-3 md:hidden">
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
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item>
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 mr-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        Profile
                      </div>
                    </Sidebar.Item>
                    <Sidebar.Item>
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6 mr-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                          />
                        </svg>
                        Sign out
                      </div>
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
