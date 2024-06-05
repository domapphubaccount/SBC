"use client";
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

function DropDown({ userName }) {
    const [dropDownToggle, setDropDownToggle] = useState(false);
    const router = useRouter();
    const dropdownRef = useRef(null);

    const handleDropDown = () => {
        setDropDownToggle(!dropDownToggle);
    };

    const handleLogout = () => {
        localStorage.removeItem("data");
        router.push('/signIn');
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropDownToggle(false);
        }
    };

    useEffect(() => {
        if (dropDownToggle) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropDownToggle]);

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={handleDropDown}
                    style={{ fontSize: '.8rem', width: '25px', height: "25px" }}
                    className="inline-flex items-center w-full justify-center text-sm gap-x-1.5 rounded-full font-semibold shadow-sm hover:bg-gray-950 text-white border-2 border-sky-500 rounded-full"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                >
                    {userName.substring(0, 2).toUpperCase()}
                </button>
            </div>
            {dropDownToggle && (
                <div
                    ref={dropdownRef}
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        <Link href="/profile" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200" role="menuitem" tabIndex="-1" id="menu-item-0">Profile</Link>
                        <button
                            type="submit"
                            onClick={handleLogout}
                            className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-200"
                            role="menuitem"
                            tabIndex="-1"
                            id="menu-item-3"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DropDown;
