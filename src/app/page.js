"use client";

import SnackbarTooltip from "@/components/Snackbar/Snackbar";
import SnackbarError from "@/components/Snackbar/SnackbarError";
import SnackbarTime from "@/components/Snackbar/SnackbarTime";
import DashLayout from "@/layout/DashLayout/DashLayout";
import Header from "@/layout/Header/Header";
import { redirect, usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const isLogged = useSelector((state) => state.loginSlice.logged);
  const loading = useSelector((state) => state.historySlice.loading);
  const loading_actions = useSelector(
    (state) => state.chatActionsSlice.loading
  );
  const error = useSelector((state) => state.chatSlice.error);

  useLayoutEffect(() => {
    if (isLogged == false) {
      redirect("/signIn");
    }
  }, [isLogged]);

  return (
    <main>
      <Header />
      <DashLayout />
      {/* start loading change chat from history */}
      {loading && <SnackbarTooltip />}
      {/* end loading change chat from history */}
      {/* start loading change chat from actions */}
      {loading_actions && <SnackbarTooltip />}
      {/* end loading change chat from actions */}
      {error && <SnackbarError />}
      {/* <SnackbarTime /> */}
    </main>
  );
}
