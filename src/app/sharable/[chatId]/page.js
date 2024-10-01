// pages/sharable/[chatId].js
"use client"
import { getChatData, getConversation } from "@/app/Redux/Features/Chat/ChatSlice";
import { config } from "@/config/config";
import DashLayout from "@/layout/DashLayout/DashLayout";
import Header from "@/layout/Header/Header";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "../../loading"

export default function Home() {
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    
    axios.get(`${config.api}sharable/${pathname.slice(10)}`,{
      headers:{
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
      .then(response => {
        if(response.data){
        dispatch(getConversation(response.data[0]));
        dispatch(getChatData(response.data[0].user_chats));
        setLoading(false)
      }})
      .catch(e => {console.log(e) ; setLoading(false)});
  }, [update]);

  return (
    <>
    {loading ? <Loading /> :
    <main>
      <Header setUpdate={setUpdate} update={update} />
      <DashLayout setUpdate={setUpdate} update={update} loading={loading}/>
    </main>
}

    </>
  );
}
