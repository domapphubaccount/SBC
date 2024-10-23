"use client";

import SnackbarTooltip from "@/components/Snackbar/Snackbar";
import SnackbarError from "@/components/Snackbar/SnackbarError";
import SnackbarTime from "@/components/Snackbar/SnackbarTime";
import DashLayout from "@/layout/DashLayout/DashLayout";
import Header from "@/layout/Header/Header";
import { redirect, usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./loading"
import { getProfileAction } from "./Redux/Features/Profile/ProfileSlice";
import SnackbarSendError from "@/components/Snackbar/SnackSendError";
import SnackbarGlobalError from "@/components/Snackbar/SnackGlobalError";

export default function Home() {
  const isLogged = useSelector((state) => state.loginSlice.logged); 
  const loading = useSelector((state) => state.historySlice.loading);    // here i have added the loading of the dashboard slice
  const loading_out = useSelector((state) => state.loginSlice.loading);  // here i have added the loading of loginslice
  const loading_actions = useSelector(
    (state) => state.chatActionsSlice.loading
  );                                                                    // and here is the loading of all chat actions 
  const error = useSelector((state) => state.chatSlice.error);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileSlice.profile);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const sendError = useSelector(state => state.chatActionsSlice.error);
  const codeError = useSelector(state => state.codeSlice.error);
  const state = useSelector( state => state);
  console.log(state)
  
  useLayoutEffect(() => {
    dispatch(getProfileAction({ token }));
  }, []);

  useLayoutEffect(() => {
    if (isLogged == false) {
      redirect("/signIn");
    }
  }, [isLogged]);

  return (
    <>
    {pathname.slice(0,9) !== "/sharable" && Object.entries(profileData).length > 0 ?
    <main>
      <Header />
      <DashLayout />
      {/* start loading change chat from history */}
      {loading && <SnackbarTooltip />}
      {/* end loading change chat from history */}
      {/* start loading change chat from actions */}
      {loading_actions && <SnackbarTooltip />}
      {/* end loading change chat from actions */}
      {/* start loading logout actions */}
      {loading_out && <SnackbarTooltip />}
      {/* end loading logout actions */}
      {error && <SnackbarError />}
      {/* <SnackbarTime /> */}
      {/* end loading logout actions */}
      {sendError && <SnackbarSendError />}
      {/* <SnackbarTime /> */}
      {/* start global error */}
      {codeError && <SnackbarGlobalError messageError={codeError}/>}
      {/* end global error */}
    </main>
    :
    <Loading />
    }
      
    </>
  );
}
