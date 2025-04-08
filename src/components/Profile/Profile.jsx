"use client";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import ProfileSection from "@/layout/sidebar/supplies/Profile";

function Profile() {
  const [timer, setTimer] = useState(3);
  const [actionToggle, setActionToggle] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    if (actionToggle) {
      const handleTimer = () => {
        setTimer((prev) => (prev = timer - 1));
        setTimeout(() => {
          localStorage.removeItem("data");
          router.push("/signIn");
        }, 3000);
      };
      setTimeout(handleTimer, 1000);
    }
  };
  if (localStorage && localStorage.getItem("data")) {
    redirect("/");
  }
  useEffect(() => {
    handleLogout();
  }, [actionToggle]);

  return (
    <div className="h-screen">
      <ProfileSection />
    </div>
  );
}

export default Profile;
