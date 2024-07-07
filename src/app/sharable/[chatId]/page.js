// pages/sharable/[chatId].js
"use client"
import { getChatData, getConversation } from "@/app/Redux/Features/Chat/ChatSlice";
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
    axios.get(`https://sbc.designal.cc/get-chat-by-hash/${pathname.slice(10)}`)
      .then(response => {
        dispatch(getConversation(response.data.data[0]));
        dispatch(getChatData(response.data.data[0].user_chats));
      })
      .catch(e => console.log(e));
  }, [update]);

  return (
    <main>
      <Header setUpdate={setUpdate} update={update} setLoading={setLoading}/>
      <DashLayout setUpdate={setUpdate} update={update} loading={loading}/>
    </main>
  );
}
