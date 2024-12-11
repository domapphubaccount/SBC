"use client";

import SnackbarTooltip from "@/components/Snackbar/Snackbar";
import SnackbarError from "@/components/Snackbar/SnackbarError";
import Header from "@/layout/Header/Header";
import { redirect, usePathname } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./loading";
import { getProfileAction } from "./Redux/Features/Profile/ProfileSlice";
import SnackbarSendError from "@/components/Snackbar/SnackSendError";
import SnackbarGlobalError from "@/components/Snackbar/SnackGlobalError";
import Drawer from "@/layout/Drawer/Drawer";
import dynamic from "next/dynamic";
import { SuspendedWarn } from "@/components/Warning/Warn";
const DashLayout = dynamic(() => import("@/layout/DashLayout/DashLayout"), { ssr: false })

export default function Home() {
  const isLogged = useSelector((state) => state.loginSlice.logged);
  const loading = useSelector((state) => state.historySlice.loading);
  const loading_out = useSelector((state) => state.loginSlice.loading); 
  const loading_actions = useSelector(
    (state) => state.chatActionsSlice.loading
  ); 
  const error = useSelector((state) => state.chatSlice.error);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profileSlice.profile);
  const token = useSelector((state) => state.loginSlice.auth?.access_token);
  const sendError = useSelector((state) => state.chatActionsSlice.error);
  const codeError = useSelector((state) => state.codeSlice.error);
  const suspended = useSelector(state => state.profileSlice.suspendedModule)


  useEffect(() => {
    dispatch(getProfileAction({ token }));
  }, []);

  useEffect(() => {
    if (isLogged == false && pathname?.slice(0, 9) != "/sharable") {
      redirect("/signIn");
    }
  }, [isLogged]);

  return (
    <Suspense fallback={<Loading />}>
      {pathname.slice(0, 9) !== "/sharable" &&
      Object.entries(profileData).length > 0 ? (
        <main>
          <Header />
          <Suspense fallback={<Loading />}>
            <DashLayout />
          </Suspense>
          <Drawer />
          {/* start warn */}
          {suspended && <SuspendedWarn />}
          {/* end warn */}
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
          {codeError && <SnackbarGlobalError messageError={codeError} />}
          {/* end global error */}
        </main>
      ) : (
        <Loading />
      )}
    </Suspense>
  );
}
