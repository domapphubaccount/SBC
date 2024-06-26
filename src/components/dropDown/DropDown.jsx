"use client";

import React from 'react';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";


function DropDown() {

    return (
        <div className="relative inline-block text-left">
            <Menu placement="bottom-end">
                <MenuHandler>
                    <Button className='px-3'>Abdulrahman</Button>
                </MenuHandler>
                <MenuList className='text_blue p-0 w-36'>
                    <MenuItem className='hover:bg-slate-200 py-3 px-4'>Profile</MenuItem>
                    <MenuItem className='hover:bg-slate-200 py-3 px-4'>Sign out</MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
}

export default DropDown;
