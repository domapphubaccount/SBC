"use client";
import MultipleSelect from "@/components/Chat/code/code";
import DropDown from "@/components/dropDown/DropDown";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "/public/logo.png";
import Image from "next/image";
import Archive from "@/components/archive/Archive";
import { StartNew } from "./supplies/New";
import Sidebar from "../sidebar/Sidebar";
import { usePathname } from "next/navigation";
import styles from "../../style/header.module.css";

function Header() {
  const [userName, setUserName] = useState("");
  const [aside, setAside] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getItem("data")) {
      setUserName(JSON.parse(localStorage.getItem("data")).name);
    }
  }, []);

  return (
    <>
      <nav className={styles.nav}>
        <div>
          {/* start logo */}
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
          {/* end logo */}

          {/* start code selector */}
          <div className={`hidden ${pathname !== "/profile" && "md:block"} `}>
            <MultipleSelect />
          </div>
          {/* end code selector */}

          <div className="flex items-center shadow-none bg-primary hidden md:block">
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

          {/* start mobe settings */}
          <div
            className="text-white hover:bg-gray-900 cursor-pointer md:hidden"
            onClick={() => setAside(true)}
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
                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
              />
            </svg>
          </div>
          {/* end mobe settings */}
        </div>
      </nav>
      <Sidebar setAside={setAside} aside={aside} />
    </>
  );
}

export default Header;
