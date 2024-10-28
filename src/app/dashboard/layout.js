
import Header from '@/layout/Header/Header';
import React from 'react'
import Navbar from '@/layout/Header/Navbar';

export const metadata = {
  title: "Dashboard",
  description: "dashboard for admin bannal",
};

function layout({children}) {
  return (
    <div>
        {/* <Header path="profile"/> */}
        <Navbar />
        {children}
    </div>
  )
}

export default layout