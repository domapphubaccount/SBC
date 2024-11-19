
import Header from '@/layout/Header/Header';
import React from 'react'

export const metadata = {
  title: "Profile",
  description: "profile ai and make account on SBC",
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