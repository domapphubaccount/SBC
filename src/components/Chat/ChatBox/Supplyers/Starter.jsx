import React from 'react'

function Starter() {
  return (
    <div className='pt-4' style={{paddingTop:'200px'}}>
    <div className="text-center">
      <div className='m-auto' style={{width:'200px'}}><img src={MessageImg.src} className='w-100' alt=''  /></div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">No Chat yet !</h1>
      <p className="mt-6 text-lg leading-8 text-gray-600">you can start new session or chose previous chat.</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        {/* <Button  variant="gradient">Start Chat</Button> */}
        <button onClick={handleStartNewChat} className="learn-more start">
          <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
          </span>
          <span className="button-text">Start Chat</span>
        </button>
        {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a> */}
      </div>
    </div>
  </div>
  )
}

export default Starter