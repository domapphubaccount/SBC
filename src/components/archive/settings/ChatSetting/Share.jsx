import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { loading_comp } from "@/app/Redux/Features/Loading/LoadingSlice";
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { get_conversations, get_hash, open_share } from "@/app/Redux/Features/Share/ShareSlice";
// import Logo from "@/app/Assets/Logo/Light-Logo.png"
// import BlackLogo from "@/app/Assets/Logo/Logo.png"
import { alertData, closeAlert } from "@/app/Redux/Features/Alerts/AlertsSlice";
 
export function Share() {
  const themeState = useSelector(state => state.theme.mode)
  const open = useSelector(state => state.ShareSlice.open)
  const chatId = useSelector(state => state.ShareSlice.chatId)
  const chatConversation = useSelector(state => state.ShareSlice.chatConversation)
  const chatHash = useSelector(state => state.ShareSlice.chatHash)
  const token = useSelector(state => state.authSlice.userData.token )
  const state = useSelector(state => state)
  const pattern = /SBC.*?\/\//g;
  const dispatch = useDispatch()

  useEffect(()=>{
      if(chatId){
          axios.get(`https://sbc.designal.cc/api/get-chat/${chatId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              },
              params: {
                chat_id: chatId,
                share_name: "1"
              }
            })
            .then(response => {
              if(response.data.success){
                  dispatch(get_conversations(response.data))
              }
            })
            .catch(error => {
              console.error('There was an error making the request!', error);
        })
      }
      window.MathJax && window.MathJax.typeset();
  },[chatId])

  const textHandler = (item) => {
      if (item.match(pattern)) {
          let dataArray = item.match(pattern);
          let data = item;
  
          dataArray.forEach(item2 => {
              data = data.replaceAll(item2, '<br/>');
          });
        return data;
      }
      return item; // Return the original item if no match is found
  }
 
  const handleOpen = () => dispatch(open_share({open: false}));

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.href}shareAiChat/${chatHash}`).then(() => {
        dispatch(get_hash(''))
        dispatch(alertData({open:true , type: 'Success' , content: 'Copy link completed successfully'}))
        setTimeout(() => dispatch(closeAlert({ open: false, type: '', content: '' })), 3000);
        handleOpen()
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
};
 
  return (
    <>
      <Dialog
        open={open}
        size={"lg"}
        handler={true}
      >
        <DialogHeader>Share Chat Link.</DialogHeader>
        <DialogBody>
          <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col" style={{maxHeight:'500px'}}>
                    <div className="grid grid-cols-12 gap-y-2">
                      {Object.entries(chatConversation).length > 0 && chatConversation.data[0].user_chats?.map((item,index)=>(
                      <>
                        <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                            <div
                            className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0 client-icon"
                            >
                            {state.authSlice.userData.name[0].toUpperCase()}
                            </div>
                            <div
                            className="relative mr-3 text-sm py-2 px-4 shadow rounded-xl client-chat"
                            >
                            <div>
                                {item.question}
                                {console.log(item)}
                            </div>
                            </div>
                        </div>
                        </div>

                        {/* <div className="col-start-1 col-end-4 text reference-card">
                          {item.answer.match(pattern) ?
                            item.answer.match(pattern).map((item3,i) => (
                              <p className='w-100 my-3' key={i}>{item3}</p>
                            )):
                            <p>No Referance</p>
                          }
                        </div> */}

                        <div className="col-start-1 col-end-10 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                            <div className="flex flex-shrink-0 items-center">
                                {/* <img className="h-8 w-auto" src={themeState == "dark" ? Logo.src : BlackLogo.src} alt="Your Company" /> */}
                            </div>
                            <div
                            className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl overflow-x-auto	"
                            >
                              <MathJaxContext>
                                <MathJax dynamic>
                                  <div dangerouslySetInnerHTML={{ __html: textHandler(item.answer)}} />
                                </MathJax>
                              </MathJaxContext>
                            </div>
                        </div>
                        </div>
                      </>
                      ))}
                    </div>
                </div>
            </div>
        </DialogBody>
        <DialogFooter>
            <div className="mr-auto">
                <ShareToggle chatId={chatId} token={token} chatHash={chatHash}/>
            </div>
            <div>
                <Button
                    variant="text"
                    color="red"
                    onClick={() => handleOpen()}
                    className="mr-1"
                    >
                    <span>Cancel</span>
                </Button>
                <Button
                    variant="gradient"
                    color="green"
                    onClick={() => copyLink()}
                    >
                    <span>Copy Link</span>
                </Button>
            </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}

function ShareToggle({chatId,chatHash,token}){ 
  
  const toggleShareName = (check) => { 
        axios.get(`https://sbc.designal.cc/api/get-chat-by-hash/${chatHash}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }            
          ,params: {
            chat_id: chatId,
            share_name: check ? '1' : '0'
        }
        
        }).then(res => 
            {
              if(res.data.success){
                console.log(res.data.data)
              }
            }
          ).catch(e => console.log(e))
      };

    return (
        <div className="checkbox-wrapper-35">
        <input value="private" name="switch" id="switch" type="checkbox" className="switch" onChange={(e)=>toggleShareName(e.target.checked) }/>
        <label for="switch">
            <span className="switch-x-text">Share Name </span>
            <span className="switch-x-toggletext">
            <span className="switch-x-unchecked"><span className="switch-x-hiddenlabel">Unchecked: </span>Off</span>
            <span className="switch-x-checked"><span className="switch-x-hiddenlabel">Checked: </span>On</span>
            </span>
        </label>
        </div>

    )
}