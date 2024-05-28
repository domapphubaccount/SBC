import React from 'react'

function Refrence() {
  return (
    <div className="col-span-1 bg-gray-100 border-r border-gray-300	">
    {/* <div className="my-3 mx-3">
      <div className="relative text-gray-600 focus-within:text-gray-400">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-gray-500"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </span>
        <input
          aria-placeholder="Busca tus amigos o contacta nuevos"
          placeholder="Busca tus amigos"
          className="py-2 pl-10 block w-full rounded bg-gray-100 outline-none focus:text-gray-700"
          type="search"
          name="search"
          required
          autoComplete="search"
        />
      </div>
    </div> */}
{/* side bar */}
    <ul className="overflow-auto h-screen " style={{paddingTop:'100px' }}>
      <h2 className="ml-2 mb-2 text-gray-600 text-lg my-2">Chats</h2>
      <li>
        <a className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
          {/* <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            alt="username"
          /> */}
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 font-semibold text-base text-gray-600">Jhon C</span>
              <span className="block ml-2 text-sm text-gray-600">5 minutes</span>
            </div>
            <span className="block ml-2 text-sm text-gray-600">Hello world!!</span>
          </div>
        </a>
        <a className="bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
          {/* <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            alt="username"
          /> */}
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 font-semibold text-base text-gray-600">Eduard</span>
              <span className="block ml-2 text-sm text-gray-600">15 minutes</span>
            </div>
            <span className="block ml-2 text-sm text-gray-600">I am fine</span>
          </div>
        </a>
        <a className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
          {/* <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://images.pexels.com/photos/6238133/pexels-photo-6238133.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
            alt="username"
          /> */}
          <div className="w-full pb-2">
            <div className="flex justify-between">
              <span className="block ml-2 font-semibold text-base text-gray-600">Celia</span>
              <span className="block ml-2 text-sm text-gray-600">1 hour</span>
            </div>
            <span className="block ml-2 text-sm text-gray-600">Last message</span>
          </div>
        </a>
      </li>
    </ul>

  </div>
  )
}

export default Refrence