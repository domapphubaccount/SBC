import Header from '@/layout/Header/Header';
import React from 'react'

export const metadata = {
  title: "LogIn",
  description: "LogIn to your account on SBC",
};

function layout({children}) {
  return (
    <div>
        {children}
    </div>
  )
}

export default layout