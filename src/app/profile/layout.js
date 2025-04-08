import Header from "@/layout/Header/Header";
import React from "react";

export const metadata = {
  title: "Profile",
  description: "profile ai and make account on SBC",
};

function layout({ children }) {
  return (
    <main>
      <Header path="profile" />
      {children}
    </main>
  );
}

export default layout;
