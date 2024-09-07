"use client"
import Profile from '@/components/Profile/Profile'
import { redirect } from 'next/navigation';
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';

function page() {
  const isLogged = useSelector((state) => state.loginSlice.logged);

  useLayoutEffect(() => {
    if (!isLogged) {
      redirect("/signIn");
    }
  }, [isLogged]);

  return (
    <div className="bg-sky-950">
        <Profile />
    </div>
  )
}

export default page