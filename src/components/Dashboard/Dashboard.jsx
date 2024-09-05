"use client";
import React, { useState } from "react";
import Users from "./DashContent/Users";
import Users_comments from "./DashContent/Users_comments";
import Users_chat from "./DashContent/Users_chat";

function Dashboard({ page }) {
  function handlePage() {
    switch (page) {
      case 1:
        return <Users />;
      case 2:
        return <Users_comments />;
      case 3:
        return <Users_chat />;
      default:
        return <Users />;
    }
  }

  return (
    <>
      <div className="text-gray-900 border-0 dashboard pt-20">
        <div className="container w-100 m-auto">{handlePage()}</div>
      </div>
    </>
  );
}

export default Dashboard;
