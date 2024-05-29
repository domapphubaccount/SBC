"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function DropDown({userName}) {
    const [dropDownToggle , setDropDownToggle] = useState(false)
    const router = useRouter()

    const handleDropDown = () => {
        setDropDownToggle(!dropDownToggle)
    }   

    const handleLogout = () => {
        localStorage.removeItem("data")
        router.push('/signIn')
    }

  return (
        <div className="relative inline-block text-left">
            <div>
                <button type="button" onClick={handleDropDown} style={{fontSize:'.6rem', width:'23px',height:"23px"}} className="inline-flex w-full justify-center text-sm gap-x-1.5 rounded-full font-semibold shadow-sm hover:bg-gray-950 text-white border-2 border-sky-500 rounded-full" id="menu-button" aria-expanded="true" aria-haspopup="true">
                {userName.substring(0,2).toUpperCase()}
                {/* <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg> */}
                </button>
            </div>
            {dropDownToggle &&
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div className="py-1" role="none">
                <Link href="/profile" className="text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200" role="menuitem" tabindex="-1" id="menu-item-0">Profile</Link>
                <button type="submit" onClick={handleLogout} className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-200" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                </div>
            </div>
            }
        </div>

  )
}

export default DropDown