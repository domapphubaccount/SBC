import React, { useEffect, useRef, useState } from 'react';
import ArchiveAccordion from './ArchiveAccordions';
import { Button, Drawer, IconButton, Typography } from '@material-tailwind/react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { chatHistory, get_chat, startChat } from '@/store/Features/Chat/ChatSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ChatSettings } from './settings/ChatSettings';
 
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

function Archive() {
    const [archiveToggle, setArchiveToggle] = useState(false);
    const [openRight, setOpenRight] = React.useState(false);
    const [open, setOpen] = React.useState(0);
    const [dashBoardData,setDashboardData] = useState('')
    const dispatch = useDispatch()
    const handleOpen = (value) => setOpen(open === value ? 0 : value);  
    const archiveRef = useRef(null);

    const handleClickOutside = (event) => {
        if (archiveRef.current && !archiveRef.current.contains(event.target)) {
            setArchiveToggle(false);
        }
    };
    const openDrawerRight = () => setOpenRight(true);
    const closeDrawerRight = () => setOpenRight(false);
    useEffect(() => {
        if (archiveToggle) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [archiveToggle]);
    // start get archive data
    useEffect(()=>{
        if (typeof window !== "undefined" && localStorage.getItem("data")) {
          const storedData = JSON.parse(localStorage.getItem("data"));
          
          axios.get('https://sbc.designal.cc/api/dashboard',{
            headers: {
              Authorization: `Bearer ${storedData.token}`
            }}).then(res => 
              {
                if(res.data.success){
                    dispatch(chatHistory(res.data.data))
                    setDashboardData(res.data.data.chat_history)
                }
              }
            ).catch(e => console.log(e))
        }
      },[])
    // end get archive data
    const handleChat = (chat) => {
        dispatch(get_chat(chat))
        dispatch(startChat(false))
    }
    return (
        <>
            <button className="Btn_history" onClick={openDrawerRight}>
                <div className="svgWrapper">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 42 42"
                    className="svgIcon"
                    >
                    <path
                        stroke-width="5"
                        stroke="#fff"
                        d="M9.14073 2.5H32.8593C33.3608 2.5 33.8291 2.75065 34.1073 3.16795L39.0801 10.6271C39.3539 11.0378 39.5 11.5203 39.5 12.0139V21V37C39.5 38.3807 38.3807 39.5 37 39.5H5C3.61929 39.5 2.5 38.3807 2.5 37V21V12.0139C2.5 11.5203 2.6461 11.0378 2.91987 10.6271L7.89266 3.16795C8.17086 2.75065 8.63921 2.5 9.14073 2.5Z"
                    ></path>
                    <rect
                        stroke-width="3"
                        stroke="#fff"
                        rx="2"
                        height="4"
                        width="11"
                        y="18.5"
                        x="15.5"
                    ></rect>
                    <path stroke-width="5" stroke="#fff" d="M1 12L41 12"></path>
                    </svg>
                    <div className="text">History</div>
                </div>
            </button>
            <Drawer
                placement="right"
                open={openRight}
                onClose={closeDrawerRight}
                className="p-4 "
            >
                <div className="mb-6 flex items-center justify-between">
                      <Button className="rounded-full background_color p-2" onClick={closeDrawerRight}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                      </Button>
                </div>
                <div>
                {Object.entries(dashBoardData).map((item,index)=>(
                <Accordion key={index} open={open === index} icon={<Icon id={1} open={open} />}>
                    <AccordionHeader onClick={() => handleOpen(index)} className='text_blue text-base semibold'>{item[0]}</AccordionHeader>
                    <AccordionBody className="py-2">
                    {
                    item[1].map((item2,index)=>(
                        <>
                            <div key={index} className='m-2 text-sm cursor-pointer' onClick={()=>handleChat(item2)}>
                                <div className='flex text-right chat-tab p-2 px-3'>
                                    <div className='flex justify-between w-full'>
                                        <div className='text_blue'>{item2.name}</div>
                                        <div>
                                            <ChatSettings chatData={item2} index={index}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>        
                    ))}
                    </AccordionBody>
                </Accordion>
                ))}
                </div>
            </Drawer>
        </>
    );
}

export default Archive;
