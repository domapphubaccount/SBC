import React, { useState } from 'react';
import ArchiveSettings from './ArchiveSettings';
import ShareChatLink from '../Chat/shareChatLink/ShareChatLink';
import axios from 'axios';

function TailwindAccordion({dashboardData,setUpdate,update,setInsideChat, setCatchChat}) {
  const [open, setOpen] = useState(null);
  const [renameToggle, setRenameToggle] = useState(false)
  const [deleteToggle, setDeleteToggle] = useState(false)
  const [handleChat,setHandleChat] = useState({})
  const [modal, setModal] = useState(false);
  const [actionAlert,setActionAlert] = useState(false)
  const [inputName,setInputName] = useState("")
  const token = JSON.parse(localStorage.getItem("data")).token

  const handleAction = () => {
    setActionAlert(true)
    setTimeout(()=> setActionAlert(false) , 4000)
  }
  const toggleShare = () => setModal(!modal);
  const toggle = (id) => {
    setOpen((prevId) => (prevId === id ? null : id));
  };
  const handleRename = (handleChat) => {
    axios.post(
      "https://sbc.designal.cc/api/rename-chat",
      {
        chat_id: handleChat.id,
        new_name: inputName
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      if(response.data.success){
        setRenameToggle(false)
        setHandleChat({})
        handleAction()
        setUpdate(!update)
        setOpen(false)
      }
    })
    .catch(error => {
      console.error('There was an error making the request!', error);
    });
  }
  const handleGetChat = (chat_id,share_name) => {
    axios.get(`https://sbc.designal.cc/api/get-chat/${chat_id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        chat_id: chat_id,
        share_name: share_name
    }
    })
    .then(response => {
      console.log(response.data);
      setInsideChat(response.data.data[0])
      setCatchChat(chat_id)
    })
    .catch(error => {
      console.error('There was an error making the request!', error);
    })
  }
  const handleDeleteChate = (handleChat) => {
    axios.post(
      "https://sbc.designal.cc/api/delete-chat",
      {
        chat_id: handleChat.id,
        archive: handleChat.is_archive
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => {
      if(response.data.success){
        setDeleteToggle(false)
        setHandleChat({})
        handleAction()
        setUpdate(!update)
        setOpen(false)
      }
    })
    .catch(error => {
      console.error('There was an error making the request!', error);
    });
  }

  return (
    <div className="w-full bg-gray-50 rounded-lg shadow-lg p-2 " style={{maxHeight:'80vh',overflowY:'auto'}}>
      <div className="accordion">
        {dashboardData.chat_history &&
        Object.entries(dashboardData.chat_history).map((item,i) => (
        <div className="border-b border-gray-200" key={item[0]}>
          <div
            className="cursor-pointer py-4 flex justify-between items-center"
            onClick={() => toggle(i)}
          >
            <span className="text-sm font-bold text-gray-800">{item[0]}</span>
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
          {open === i && (
            <div className="pb-2 text-sm font-bold text-gray-700">
                <ul>
                  {item[1].map((item,i)=>(
                    <li key={i} className='px-4 hover:bg-slate-200 flex justify-between cursor-pointer' onClick={()=>handleGetChat(item.id,item.share_name)}>-- {item.name} <ArchiveSettings item={item} setRenameToggle={setRenameToggle} setDeleteToggle={setDeleteToggle} setHandleChat={setHandleChat} toggleShare={toggleShare}/></li>
                  ))}
                  </ul>
            </div>
          )}
        </div>
        ))
        }
      </div>

    {renameToggle &&
      handleChat &&
          <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class=" sm:items-start">
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Rename Chat</h3>
                      <div class="mt-2">
                      <div className="relative h-10 w-full">
                            <input
                                style={{color:"black"}}
                                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                placeholder=" "
                                onChange={(e)=>setInputName(e.target.value)}
                                />
                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Rename
                                </label>
                            </div>
                        </div>                      
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button onClick={()=>handleRename(handleChat)} type="button" class="inline-flex w-full justify-center rounded-md bg-indigo-800	 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500	 sm:ml-3 sm:w-auto">Rename</button>
                  <button onClick={()=>setRenameToggle(false)} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
                </div>
              </div>
            </div>
          </div>
          </div>
    }
    {deleteToggle &&
    handleChat &&
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Delete Chat</h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">Are you sure you want to delete this chat? All of your data will be permanently removed. This action cannot be undone.</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button onClick={()=> handleDeleteChate(handleChat)} type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
              <button onClick={()=> setDeleteToggle(false)} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    }
    {
      modal &&
      <ShareChatLink modal={modal} toggleShare={toggleShare}/>
    }
    {actionAlert &&
          <div class="flex bg-green-100 rounded-lg p-4 mb-4 text-sm text-green-700" role="alert">
            <svg class="w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <div>
                <span class="font-medium">Success!</span> Your action happened successfully.
            </div>
          </div>
    }
    </div>
  );
}

export default TailwindAccordion;
