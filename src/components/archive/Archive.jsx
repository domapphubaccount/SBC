import React, { useEffect, useRef, useState } from "react";
import ArchiveAccordion from "./ArchiveAccordions";

function Archive() {
  const [archiveToggle, setArchiveToggle] = useState(false);
  const archiveRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        archiveRef.current &&
        !archiveRef.current.contains(event.target) &&
        event.target.tagName !== "LI"
      ) {
        setArchiveToggle(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [archiveRef]);

  return (
    <>
      <button
        className="Btn_history"
        onClick={() => setArchiveToggle(!archiveToggle)}
      >
        <div className="svgWrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 42 42"
            className="svgIcon"
          >
            <path
              strokeWidth="5"
              stroke="#fff"
              d="M9.14073 2.5H32.8593C33.3608 2.5 33.8291 2.75065 34.1073 3.16795L39.0801 10.6271C39.3539 11.0378 39.5 11.5203 39.5 12.0139V21V37C39.5 38.3807 38.3807 39.5 37 39.5H5C3.61929 39.5 2.5 38.3807 2.5 37V21V12.0139C2.5 11.5203 2.6461 11.0378 2.91987 10.6271L7.89266 3.16795C8.17086 2.75065 8.63921 2.5 9.14073 2.5Z"
            ></path>
            <rect
              strokeWidth="3"
              stroke="#fff"
              rx="2"
              height="4"
              width="11"
              y="18.5"
              x="15.5"
            ></rect>
            <path strokeWidth="5" stroke="#fff" d="M1 12L41 12"></path>
          </svg>
          <div className="text">History</div>
        </div>
      </button>

      {archiveToggle && (
        <div
          ref={archiveRef}
          className="archive_card mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <ArchiveAccordion />
          </div>
        </div>
      )}
    </>
  );
}

export default Archive;
