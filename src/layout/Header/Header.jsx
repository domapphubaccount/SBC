"use client"
import MultipleSelect from '@/components/Chat/code/code'
import Archive from '@/components/archive/Archive'
import DropDown from '@/components/dropDown/DropDown'
import Link from 'next/link'
import React from 'react'

function Header({path}) {
  return (
    <>       
    <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css" />
    <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css" />


    <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-darkBlue">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">

        <div className="relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start ">
          <Link className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="/">SBC</Link>
          {/* <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" onClick="toggleNavbar('example-collapse-navbar')">
            <i className="text-white fas fa-bars"></i>
          </button> */}
        </div>
        {
          !path ?

                <div>
                  <MultipleSelect />
                </div>
        :
        <div>PROFILE</div>
        }

        <div className="flex  items-center shadow-none  bg-darkBlue" >
          
          <ul className="flex justify-between list-none ml-auto items-center">
            <li className='mr-3'>
              <Archive />
            </li>
            <li className='mr-3'>
              <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width={25} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
            </div>
            </li>
            <li >
              <DropDown />
            </li>

          </ul>
        </div>
      </div>
    </nav>

    </>
  )
}

export default Header