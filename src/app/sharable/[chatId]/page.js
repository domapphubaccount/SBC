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

// export async function generateStaticParams() {

//   const paths = {
//     params: { chatId: '166828188af0e76.75112215' }
//   }

//   return paths;
// }


export default function Home() {
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
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
        console.log(response.data[0].user_chats)
        if(response.data){
        dispatch(getConversation(response.data[0]));
        dispatch(getChatData(response.data[0].user_chats));
      }})
      .catch(e => console.log(e));
  }, [update]);

  return (
    <main>
      <Header setUpdate={setUpdate} update={update} setLoading={setLoading}/>
      <DashLayout setUpdate={setUpdate} update={update} loading={loading}/>
    </main>
  );
}
