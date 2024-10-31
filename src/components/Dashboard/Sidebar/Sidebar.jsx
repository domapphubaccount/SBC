"use client";

import { Tooltip } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export function Sidebar({ children, handlePage }) {
  const profileData = useSelector((state) => state.profileSlice.profile);
  const aside = useSelector(state => state.asideSlice.open);
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );



  return (
    <>


      {permissionsData && (
        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 w-32 h-screen transition-transform ${
            aside ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 mt-4`}
          aria-label="Sidebar"
          style={{ paddingTop: "60px" }}
        >
          <div
            className="scroll-bar-aside relative h-full pattern"
            style={{
              width: "130px",
              overflowY: "auto",
              overflowX: "hidden",
              transform: "scale(0.85)",
            }}
          >
            <nav className="z-20 bg-white absolute flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 p-2.5 shadow-lg fixed left-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border">
              {profileData &&
                profileData.roles &&
                profileData.roles[0].id == "1" && (
                  <Tooltip content="Dashbaord" style="dark" placement="top">
                    <a
                      href="#"
                      className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 dark:bg-sky-900 dark:text-sky-50"
                      onClick={() => handlePage(9)}
                    >
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
                          d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                        />
                      </svg>

                      <small className="text-center text-xs font-medium">
                        Dashbaord
                      </small>
                    </a>
                  </Tooltip>
                )}
              {permissionsData && permissionsData.includes(25) && (
                <Tooltip content="Users" style="dark" placement="top">
                  <a
                    href="#"
                    className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 dark:bg-sky-900 dark:text-sky-50"
                    onClick={() => handlePage(1)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 shrink-0"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>

                    <small className="text-center text-xs font-medium">
                      {" "}
                      Users{" "}
                    </small>
                  </a>
                </Tooltip>
              )}
              {permissionsData && permissionsData.includes(39) && (
                  <Tooltip
                    content="User's Dislikes"
                    style="dark"
                    placement="top"
                  >
                    <a
                      href="#"
                      className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 dark:bg-sky-900 dark:text-sky-50"
                      onClick={() => handlePage(2)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                        />
                      </svg>

                      <small className="text-center text-xs font-medium">
                        User's Dislikes
                      </small>
                    </a>
                  </Tooltip>
                )}
              {permissionsData && permissionsData.includes(48) && (
                <Tooltip content="Reviewer" style="dark" placement="top">
                  <a
                    onClick={() => handlePage(8)}
                    href="#"
                    className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                      />
                    </svg>

                    <small className="text-center text-xs font-medium">
                      Reviewer
                    </small>
                  </a>
                </Tooltip>
              )}

              {profileData &&
                profileData.roles &&
                profileData.roles[0].id == "1" && (
                  <Tooltip
                    content="Master User's Chat"
                    style="dark"
                    placement="top"
                  >
                    <a
                      href="#"
                      className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
                      onClick={() => handlePage(3)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                        />
                      </svg>

                      <small className="text-center text-xs font-medium">
                        Master User's Chat
                      </small>
                    </a>
                  </Tooltip>
                )}
              {permissionsData && permissionsData.includes(13) && (
                <Tooltip content="Building Code" style="dark" placement="top">
                  <a
                    onClick={() => handlePage(4)}
                    href="#"
                    className="flex h-16 w-16 flex-col items-center justify-center gap-1 text-fuchsia-900 dark:text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
                      />
                    </svg>

                    <small className="text-xs text-center font-medium">
                      Building Code
                    </small>
                  </a>
                </Tooltip>
              )}
              {permissionsData && permissionsData.includes(8) && (
                <Tooltip content="Sections" style="dark" placement="top">
                  <a
                    href="#"
                    onClick={() => handlePage(5)}
                    className="flex h-16 w-16 flex-col items-center justify-center gap-1 text-fuchsia-900 dark:text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                      />
                    </svg>

                    <small className="text-xs font-medium">Sections</small>
                  </a>
                </Tooltip>
              )}
              {permissionsData && permissionsData.includes(30) && (
                <Tooltip content="ٌRoles" style="dark" placement="top">
                  <a
                    href="#"
                    onClick={() => handlePage(6)}
                    className="flex h-16 w-16 flex-col items-center justify-center gap-1 text-fuchsia-900 dark:text-gray-400"
                  >
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
                        d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
                      />
                    </svg>

                    <small className="text-xs font-medium">Roles</small>
                  </a>
                </Tooltip>
              )}
            </nav>
          </div>
        </aside>
      )}

      <div className="p-4 sm:ml-32">{children}</div>
    </>
  );
}
