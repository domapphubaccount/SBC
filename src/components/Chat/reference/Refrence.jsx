"use client";
import React, { useEffect, useRef, useState } from "react";

function Refrence({ setElementWidth }) {
  const colRef = useRef();

  useEffect(() => {
    window.onresize = () => {
      setElementWidth(colRef.current?.offsetWidth);
      window.MathJax && window.MathJax.typeset();
    };
  }, []);

  return (
    <div
      ref={colRef}
      id="refContainer"
      className="col-span-1  bg-gray-100 border-r border-gray-300	relative"
    >
      <ul
        id="listRef"
        className="overflow-auto h-screen "
        style={{ paddingTop: "100px" }}
      >
        <h2
          className="ml-2 mb-2 text-gray-600 text-lg my-2 absolute"
          style={{
            top: "80px",
            fontSize: "1rem",
            fontWeight: "bold",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Reference
        </h2>
        <li>
          <div
            className="mx-auto absolute bottom-2.5 w-full text-black text-center footer-text text-xs	"
            style={{ color: "#545454" }}
          >
            <span style={{ fontSize: "10px" }}>Powered By</span>{" "}
            <span
              className="font-bold"
              style={{ fontFamily: "Alef, sans-serif", letterSpacing: "-1px" }}
            >
              <span style={{ color: "#162C4C" }}>CPV</span>
              <span style={{ color: "#2C518E" }}>ARABIA</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Refrence;
