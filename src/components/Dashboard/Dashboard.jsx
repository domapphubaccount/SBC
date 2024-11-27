"use client";
import React from "react";
import Users from "./DashContent/Users";
import Users_comments from "./DashContent/Users_comments";
import Users_chat from "./DashContent/Users_chat";
import Pdfs from "./DashContent/Pdfs";
import Sections from "./DashContent/Sections";
import Roles from "./DashContent/Roles";
import Permmisions from "./DashContent/permissions";
import DashboardData from "./DashContent/Dashboard";
import ReviewerAdmin from "./DashContent/Reviewer";
import { useSelector } from "react-redux";

function Dashboard({ page, setPage }) {
  const permissions = {
    9: "analysis",
    1: "users.index",
    2: "chat_user_dislikes.get",
    4: "files.index",
    5: "sections.index",
    6: "roles.index",
    8: "reviews.index",
  };
  const permissionsData = useSelector(
    (state) => state.profileSlice.permissions
  );

  function handlePage() {
    const showDashboard = permissionsData.some((item) => item == "analysis");

    const validPermission = Object.entries(permissions).find((item) =>
      permissionsData.includes(item[1])
    );

    // Fallback based on the first valid permission
    switch (page || (showDashboard && 9) || Number(validPermission[0])) {
      case 8:
        return <ReviewerAdmin />; //done 4
      case 1:
        return <Users />; //done 1
      case 2:
        return <Users_comments />; //done 2
      case 3:
        return <Users_chat />;
      case 4:
        return <Pdfs />; //done 5
      case 5:
        return <Sections />; //done 6
      case 6:
        return <Roles />; //done 7
      case 7:
        return <Permmisions />;
      case 9:
        return <DashboardData setPage={setPage} />; //done 8
      default:
        // Fallback if no matching permission is found
        return <DashboardData setPage={setPage} />;
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
