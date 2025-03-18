"use client";
import MultipleSelect from "@/components/Chat/code/code";
import DropDown from "@/components/dropDown/DropDown";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { chat_out } from "@/app/Redux/Features/Chat/ChatSlice";
import Logo from "/public/logo.png";
import Image from "next/image";
import Archive from "@/components/archive/Archive";
import { StartNew } from "./supplies/New";

function Header() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("data")) {
      setUserName(JSON.parse(localStorage.getItem("data")).name);
    }
  }, []);

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between navbar-expand-lg bg-darkBlue">
        <div className="w-full mx-auto flex flex-wrap items-center justify-between">
          <div className="relative">
            <Link className="inline-block mr-4 py-2" href="/">
              <Image
                width={100}
                height={100}
                quality={100}
                src={Logo.src}
                alt="logo"
              />
            </Link>
          </div>

          {/* start code selector */}
          <div>
            <MultipleSelect />
          </div>
          {/* end code selector */}

          <div className="flex items-center shadow-none bg-primary">
            <ul className="flex justify-between list-none ml-auto items-center">
              {/* start history */}
              <li className="mr-3 relative" title="timeline">
                <Archive />
              </li>
              {/* end history */}

              {/* start start new chat */}
              <li title="start new chat" className="mr-3">
                <StartNew />
              </li>
              {/* end start new chat */}

              {/* start profile dropdown */}
              <li title="profile">
                <DropDown userName={userName} />
              </li>
              {/* end profile dropdown */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
