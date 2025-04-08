"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { chat_out } from "@/app/Redux/Features/Chat/ChatSlice";
import styles from "@/style/header.module.css";
import { Dropdown } from "flowbite-react";

function DropDown({ userName }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(chat_out());
    router.push("/signIn");
  };



  return (
    <Dropdown
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <div className={styles.profile}>
          {userName?.substring(0, 2).toUpperCase()}
        </div>
      )}
    >
      <div>
        <ul className={styles.profile_list}>
          <li>
            <button className="text-gray-700 block w-full px-1 text-left text-s flex w-full" onClick={()=> router.push("/profile")}>
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
              <div> Profile</div>
            </button>
          </li>
          <hr />
          <li>
            <button
              type="submit"
              onClick={handleLogout}
              className="text-gray-700 block w-full px-1 text-left text-sm"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-3"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </Dropdown>
  );
}

export default DropDown;
