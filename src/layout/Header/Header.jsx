"use client";
import MultipleSelect from "@/components/Chat/code/code";
import Archive from "@/components/archive/Archive";
import DropDown from "@/components/dropDown/DropDown";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { chat_out } from "@/app/Redux/Features/Chat/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import Logo from "/public/logo.png";
import { Tooltip } from "flowbite-react";
import { set_direct_code } from "@/app/Redux/Features/Code/CodeSlice";
import {
  drawer_toggle,
  sidar_toggle,
} from "@/app/Redux/Features/Dashboard/SideBarSlice";
import Joyride from "react-joyride";

function Header({ path }) {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );

  const handleStartNewChat = () => {
    dispatch(chat_out());
    dispatch(set_direct_code([]));
  };
  const [run, setRun] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (localStorage.getItem("hints")) {
    } else {
      setRun(true);
    }
  }, []);

  const steps = [
    {
      target: "#code",
      content: (
        <div className="text-sm">
          You can select up to 5 relevant codes here.
          <br />
          Once selected, they cannot be changed during this session until a new
          session is started.
        </div>
      ),
      disableBeacon: true,
      placement: "bottom",
      spotlightClicks: true,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      title: "CODE",
    },
    // Additional steps can go here if needed
  ];

  return (
    <>
      {isClient && (
        <>
          <Joyride
            steps={steps}
            run={run}
            continuous={false}
            showSkipButton={false}
            disableOverlayClose
            styles={{
              options: {
                primaryColor: "#172d59",
              },
            }}
            locale={{
              next: "OK",
              skip: "close",
            }}
            callback={(data) => {
              if (data.action === "skip" || data.status === "finished") {
                setRun(false);
                localStorage.setItem("hints", true);
              }
            }}
          />

          <nav
            style={{ zIndex: 50 }}
            className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between navbar-expand-lg bg-darkBlue"
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
                    permissionsData &&
                    permissionsData.includes(12) && (
                      <div id="code" className="hidden sm:block">
                        <MultipleSelect />
                      </div>
                    )
                  ) : (
                    <></>
                  )}

                  <div className="flex items-center shadow-none  bg-darkBlue">
                    <ul className="flex justify-between list-none ml-auto items-center">
                      {pathname.trim().slice(0, 8) === "/profile" ||
                      pathname.trim().slice(0, 10) === "/dashboard" ? (
                        ""
                      ) : (
                        <>
                          {permissionsData && permissionsData.includes(7) && (
                              <li className="mr-3 relative" title="timeline">
                                <Archive />
                              </li>
                          )}
                          {/* start start new chat */}
                          {permissionsData && permissionsData.includes(3) && (
                            <Tooltip
                              content="Start new chat"
                              placement="bottom"
                            >
                              <li
                                title="start new chat"
                                className="mr-3 hidden sm:block"
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
                          )}
                          {/* end start new chat */}
                        </>
                      )}

                      <Tooltip content="Profile" placement="left">
                        <li title="profile">
                          <DropDown />
                        </li>
                      </Tooltip>

                      {pathname.trim().slice(0, 10) === "/" ? (
                        <div className="rounded">
                          <button
                            data-drawer-target="default-sidebar"
                            data-drawer-toggle="default-sidebar"
                            onClick={() => dispatch(drawer_toggle())}
                            aria-controls="default-sidebar"
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                          >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                              className="w-6 h-6"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                      {pathname.trim().slice(0, 10) === "/dashboard" ? (
                        <div className="rounded">
                          <button
                            data-drawer-target="default-sidebar"
                            data-drawer-toggle="default-sidebar"
                            onClick={() => dispatch(sidar_toggle())}
                            aria-controls="default-sidebar"
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                          >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                              className="w-6 h-6"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </nav>
        </>
      )}
    </>
  );
}

export default Header;
