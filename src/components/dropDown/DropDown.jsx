"use client";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { chat_out } from "@/app/Redux/Features/Chat/ChatSlice";
import { logoutAction } from "@/app/Redux/Features/Auth/AuthSlice";
import { getProfileAction } from "@/app/Redux/Features/Profile/ProfileSlice";
import { useSnackbar } from "notistack";

function DropDown() {
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileSlice.profile);
  const pathname = usePathname();

  useLayoutEffect(() => {
    dispatch(getProfileAction({ token }));
  }, []);

  const handleDropDown = () => {
    setDropDownToggle(!dropDownToggle);
  };

  const handleLogout = () => {
    dispatch(logoutAction({ token }));
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDownToggle(false);
    }
  };
  useEffect(() => {
    if (dropDownToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDownToggle]);



  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={handleDropDown}
          className="inline-flex p-2 items-center w-full justify-center text-sm gap-x-1.5 rounded-full font-semibold shadow-sm hover:bg-gray-950 text-white border-2 border-sky-500 rounded-full"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </div>
      {dropDownToggle && (
        <div
          ref={dropdownRef}
          className="archive_card  mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {pathname.slice(0, 9) !== "/" && (
              <Link
                href="/"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200 flex"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 mr-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Home
              </Link>
            )}
            <Link
              href="/profile"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200 flex"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Profile
            </Link>
            {/* {profileData && profileData.roles && profileData.roles[0].name && ( */}

            {profileData &&
              profileData.roles &&
              profileData.roles[0].name != "User" && pathname.slice(0,9) !== "/dashboar" && (
                <Link
                  href="/dashboard"
                  className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200 flex"
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                  Dashboard
                </Link>
              )}
            {/* )} */}

            <button
              type="submit"
              onClick={handleLogout}
              className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-200 flex"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="red"
                className="size-5 mr-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDown;
