"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearData } from "./Chat/ChatSlice";
import { clearHistory } from "./Chat_History/historySlice";
import { logout } from "./Auth/AuthSlice";
import { removeData } from "./Dashboard/Pagination/Pagination";
import { removeData as usersData } from "./Dashboard/UsersSlice";
import { removeData as pdfsData } from "./Dashboard/PdfsSlice";
import { removeData as rolesData } from "./Dashboard/RolesSlice";

function RemoveAuth() {
  const dispatch = useDispatch()
  console.log('**************',useDispatch(clearData()))
  
  useEffect(() => {
    console.log("test");
    dispatch(clearData());
    dispatch(clearHistory());
    dispatch(logout());
    dispatch(removeData());
    dispatch(usersData());
    dispatch(pdfsData());
    dispatch(rolesData());
  }, [dispatch]);
  return <></>;
}

export default RemoveAuth;
