import React, { useState, useEffect } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/Firebase.config";
import { useStateProvider } from "@/context/StateContext";
import axios from 'axios';
import { useRouter } from "next/router";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";

function Main() {
  const router = useRouter();
  const [{userInfo}, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);

  useEffect(() => {
    if (redirectLogin) router.push("/login");
  })
  onAuthStateChanged(firebaseAuth, async(currentUser) => {
    if (!currentUser) setRedirectLogin(true);
    if (!userInfo && !userInfo?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser?.email
      })
      if (!data.status) {
        router.push("/login");
      }
      if (data?.data) {
        const { id, email, name, profileImage, status } = data?.data;
        dispatch({
          type: reducerCases.SET_USER_INFO,
          userInfo: {
            id,
            email,
            name,
            profileImage,
            status
          }
        });
      }
      
    }
    
    
  })
  return <>
  <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full over">
    <ChatList />
    {/* <Empty /> */}
    <Chat />
  </div>
  </>
}

export default Main;
