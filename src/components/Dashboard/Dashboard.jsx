"use client";
import React, { useState } from "react";
import Users from "./DashContent/Users";
import Users_comments from "./DashContent/Users_comments";
import Users_chat from "./DashContent/Users_chat";
import Pdfs from "./DashContent/Pdfs";
import Sections from "./DashContent/Sections";
import Roles from "./DashContent/Roles";
import Permmisions from "./DashContent/permissions";
import DashboardData from "./DashContent/Dashboard";
import ReviewerAdmin from "./DashContent/Reviewer";

function Dashboard({ page }) {
  function handlePage() {
    switch (page) {
      case 8:
        return <ReviewerAdmin />;
      case 1:
        return <Users/>;
      case 2:
        return <Users_comments />;
      case 3:
        return <Users_chat />;
      case 4:
        return <Pdfs />;
      case 5:
        return <Sections />;
      case 6:
        return <Roles />;
      case 7:
        return <Permmisions />;
      default:
        return <Users/>;
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
