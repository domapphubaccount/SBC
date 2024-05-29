import React, { useState } from 'react';
import ArchiveSettings from './ArchiveSettings';
import ShareChatLink from '../Chat/shareChatLink/ShareChatLink';

function TailwindAccordion() {
  const [open, setOpen] = useState(null);
  const [renameToggle, setRenameToggle] = useState(false)
  const [deleteToggle, setDeleteToggle] = useState(false)
  const [modal, setModal] = useState(false);

  const toggleShare = () => setModal(!modal);

  const toggle = (id) => {
    if (open === id) {
      setOpen(null); // Close the accordion if it's already open
    } else {
      setOpen(id); // Open the clicked accordion
    }
  };



  return (
    <div className="w-full bg-gray-50 rounded-lg shadow-lg p-2 " style={{maxHeight:'80vh',overflowY:'auto'}}>
      <div className="accordion">

        <div className="border-b border-gray-200">
          <div
            className="cursor-pointer py-4 flex justify-between items-center"
            onClick={() => toggle(2)}
          >
            <span className="text-sm font-bold text-gray-800">Yesterday</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${open === 2 ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {open === 2 && (
            <div className="pb-2 text-sm font-bold text-gray-700">
                <ul>
                    <li className='px-4 hover:bg-slate-200 flex justify-between'>-- A144844 <ArchiveSettings setRenameToggle={setRenameToggle} setDeleteToggle={setDeleteToggle} toggleShare={toggleShare}/></li>
                    <li className='px-4 hover:bg-slate-200 flex justify-between'>-- A144844 <ArchiveSettings setRenameToggle={setRenameToggle} setDeleteToggle={setDeleteToggle} toggleShare={toggleShare}/></li>
                    <li className='px-4 hover:bg-slate-200 flex justify-between'>-- A144844 <ArchiveSettings setRenameToggle={setRenameToggle} setDeleteToggle={setDeleteToggle}/></li>
                    <li className='px-4 hover:bg-slate-200 flex justify-between'>-- A144844 <ArchiveSettings setRenameToggle={setRenameToggle} setDeleteToggle={setDeleteToggle}/></li>
                    <li className='px-4 hover:bg-slate-200 flex justify-between'>-- A144844 <ArchiveSettings setRenameToggle={setRenameToggle} setDeleteToggle={setDeleteToggle}/></li>
                </ul>
            </div>
          )}
        </div>

        <div>
          <div
            className="cursor-pointer py-4 flex justify-between items-center"
            onClick={() => toggle(3)}
          >
            <span className="text-sm font-bold text-gray-800">Previous 7 days</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${open === 3 ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {open === 3 && (
            <div className="pb-2 text-sm font-bold text-gray-700">
            <ul>
                <li className='pl-3 hover:bg-slate-200'>-- A144844 <ArchiveSettings setRenameToggle={setRenameToggle} setDeleteToggle={setDeleteToggle}/></li>
            </ul>
        </div>
          )}
        </div>
        <div className="border-b border-gray-200">
          <div
            className="cursor-pointer py-4 flex justify-between items-center"
            onClick={() => toggle(2)}
          >
            <span className="text-sm font-bold text-gray-800">Yesterday</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${open === 2 ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {open === 2 && (
            <div className="pb-2 text-sm font-bold text-gray-700">
            <ul>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
            </ul>
        </div>
          )}
        </div>

        <div>
          <div
            className="cursor-pointer py-4 flex justify-between items-center"
            onClick={() => toggle(3)}
          >
            <span className="text-sm font-bold text-gray-800">Previous 7 days</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${open === 3 ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {open === 3 && (
            <div className="pb-2 text-sm font-bold text-gray-700">
            <ul>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
            </ul>
        </div>
          )}
        </div>


      </div>


    {renameToggle &&
          <div className="fixed z-10 inset-0 overflow-y-auto" x-cloak>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width={64} height={64} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                    </svg>
                    </div>
                    <div className="w-full mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline"> Enter new name</h3>
                      <div className="mt-2">
                        {/* <p className="text-sm text-gray-500"> Enter your email to subscribe to our newsletter. </p> */}
                        <div className="relative h-10 w-full min-w-[200px]">
                            <input
                                style={{color:"black"}}
                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                                />
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Rename
                                </label>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button onClick={()=>setRenameToggle(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"> Subscribe </button>
                  <button  onClick={()=>setRenameToggle(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> Cancel </button>
                </div>
              </div>
            </div>
          </div>
    }
    {deleteToggle &&

          <div  className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg width="64px" height="64px" className="h-6 w-6 text-red-600" stroke="currentColor" fill="none" viewBox="0 0 24.00 24.00" xmlns="http://www.w3.org/2000/svg"  stroke-width="0.45600000000000007">
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25Z" fill="#ef4444"></path>
                        <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" fill="#ef4444"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.2944 4.47643C9.36631 3.11493 10.5018 2.25 12 2.25C13.4981 2.25 14.6336 3.11493 15.7056 4.47643C16.7598 5.81544 17.8769 7.79622 19.3063 10.3305L19.7418 11.1027C20.9234 13.1976 21.8566 14.8523 22.3468 16.1804C22.8478 17.5376 22.9668 18.7699 22.209 19.8569C21.4736 20.9118 20.2466 21.3434 18.6991 21.5471C17.1576 21.75 15.0845 21.75 12.4248 21.75H11.5752C8.91552 21.75 6.84239 21.75 5.30082 21.5471C3.75331 21.3434 2.52637 20.9118 1.79099 19.8569C1.03318 18.7699 1.15218 17.5376 1.65314 16.1804C2.14334 14.8523 3.07658 13.1977 4.25818 11.1027L4.69361 10.3307C6.123 7.79629 7.24019 5.81547 8.2944 4.47643ZM9.47297 5.40432C8.49896 6.64148 7.43704 8.51988 5.96495 11.1299L5.60129 11.7747C4.37507 13.9488 3.50368 15.4986 3.06034 16.6998C2.6227 17.8855 2.68338 18.5141 3.02148 18.9991C3.38202 19.5163 4.05873 19.8706 5.49659 20.0599C6.92858 20.2484 8.9026 20.25 11.6363 20.25H12.3636C15.0974 20.25 17.0714 20.2484 18.5034 20.0599C19.9412 19.8706 20.6179 19.5163 20.9785 18.9991C21.3166 18.5141 21.3773 17.8855 20.9396 16.6998C20.4963 15.4986 19.6249 13.9488 18.3987 11.7747L18.035 11.1299C16.5629 8.51987 15.501 6.64148 14.527 5.40431C13.562 4.17865 12.8126 3.75 12 3.75C11.1874 3.75 10.4379 4.17865 9.47297 5.40432Z" fill="#ef4444"></path>
                      </g>
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline"> Delete Item </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500"> Are you sure you want to delete <span className="font-bold">Sample Item</span>? This action cannot be undone. </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={()=> setDeleteToggle(false)} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"> Delete </button>
                <button onClick={()=> setDeleteToggle(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> Cancel </button>
              </div>
            </div>
          </div>
          </div>
    }
  {
    modal &&
    <ShareChatLink modal={modal} toggleShare={toggleShare}/>
  }


    </div>
  );
}

export default TailwindAccordion;
