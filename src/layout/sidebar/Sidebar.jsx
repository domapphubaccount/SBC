import React, { useState } from "react";
import styles from "@/style/sidebar.module.css";
import Code from "./supplies/Code";
import History from "./supplies/History";
import Profile from "./supplies/Profile";

const Sidebar = ({ setAside, aside }) => {
  const [tab, setTab] = useState("tab1");

  const heads = [
    { id: "tab1", name: "CODE", component: <Code /> },
    { id: "tab2", name: "HISTORY", component: <History /> },
    { id: "tab3", name: "PROFILE", component: <Profile /> },
  ];

  return (
    <aside className={`${styles.sidebar} ${aside && styles.aside_open}`}>
      {/* Header */}
      <div className="flex justify-between p-5 bg-primary text-white">
        <div>DASHBOARD</div>
        <div
          className="hover:bg-slate-900 cursor-pointer"
          onClick={() => setAside(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.dashboard}>
        <ul className={styles.head}>
          {heads.map(({ id, name }) => (
            <li key={id} onClick={() => setTab(id)}>
              <label htmlFor={id}>{name}</label>
              <input type="radio" id={id} name="checked" checked={tab === id} readOnly />
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        <div className={styles.body}>
          {heads.find((item) => item.id === tab)?.component}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
