
import Header from '@/layout/Header/Header';
import React from 'react'

export const metadata = {
  title: "Dashboard",
  description: "dashboard for admin bannal",
};

function layout({children}) {
  return (
    <div>
        <Header path="profile"/>
        {children}
    </div>
  )
}

export default layout