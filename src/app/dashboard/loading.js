import React from 'react'
import loadingImg from "@/assets/logo/loading.gif"

function Loading() {
  return (
<div className="inset-0 bg-gray-800 fixed flex w-full h-full items-center justify-center duration-300 transition-opacity"
 style={{zIndex: "6000"}}>
  <div className="flex-col">
    <img src={loadingImg.src} alt='loading' className='loading_logo'/>
  </div>
</div>
  )
}

export default Loading