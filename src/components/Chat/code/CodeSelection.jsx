"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion } from "flowbite-react";
import {
  clear_code_error,
  set_code_error,
  set_direct_code,
  set_stored_code,
} from "@/app/Redux/Features/Code/CodeSlice";

function CodeSelectionInterface() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const dispatch = useDispatch();

  const code = useSelector((state) => state.codeSlice.value);
  const storedCode = useSelector((state) => state.codeSlice.storedCode);
  const available = useSelector((state) => state.chatSlice.chat_code);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCheckboxChange = (fileId) => {
    if (!available) {
      if (storedCode.includes(fileId)) {
        dispatch(set_stored_code(fileId));
      } else if (storedCode.length < 5) {
        dispatch(set_stored_code(fileId));
      } else {
        dispatch(set_code_error("You can't select more than 5 codes"));
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
          dispatch(clear_code_error());
        }, 1500);
      }
    }
  };

  const removeStoredCode = () => {
    if (!available) {
      dispatch(set_direct_code([]));
    }
  };

  // Filter codes based on search query
  const filteredCode = code
    ? code
        .map((item) => {
          const matchingPdfs = item.pdfs.filter((pdf) =>
            pdf.name.toLowerCase().includes(searchQuery.toLowerCase())
          );

          const matchesItem =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            matchingPdfs.length > 0;

          if (matchesItem) {
            return {
              ...item,
              pdfs: matchingPdfs,
            };
          }
          return null;
        })
        .filter(Boolean)
    : [];

  return (
    <div className="dropdown-container relative w-full mx-auto">
      {/* Dropdown Button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-full p-3 bg-white border border-gray-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center hover:bg-gray-50"
      >
        <span className="text-sm text-gray-700">
          {storedCode.length === 0
            ? `Select Codes (${storedCode.length}/5)`
            : `${storedCode.length} code${
                storedCode.length !== 1 ? "s" : ""
              } selected`}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {/* Tooltip for max selection */}
          {showTooltip && (
            <div className="mx-3 mt-3 p-2 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded text-xs">
              ⚠️ Maximum 5 codes allowed
            </div>
          )}

          {/* Search Bar */}
          <div className="p-3 border-b rounded-t-lg">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Code List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredCode.length === 0 ? (
              <div className="text-center py-4 text-gray-500 text-sm">
                {code && code.length === 0
                  ? "No codes available"
                  : "No results found"}
              </div>
            ) : (
              filteredCode.map((item, i) => (
                <Accordion key={i} className="p-1">
                  <Accordion.Panel className="p-1">
                    <Accordion.Title className="p-2 hover:bg-gray-50">
                      <span className="text-sm font-semibold">{item.name}</span>
                    </Accordion.Title>
                    <Accordion.Content className="p-1">
                      {item.pdfs.length > 0 ? (
                        item.pdfs.map((pdfItem, j) => (
                          <div
                            key={j}
                            className="flex items-center p-2 hover:bg-gray-100 rounded-md"
                          >
                            <input
                              type="checkbox"
                              id={`checkbox-item-${i}-${j}`}
                              checked={storedCode.includes(pdfItem.name)}
                              onChange={() =>
                                handleCheckboxChange(pdfItem.name)
                              }
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label
                              htmlFor={`checkbox-item-${i}-${j}`}
                              className="ml-2 text-xs font-medium text-gray-900 cursor-pointer"
                            >
                              {pdfItem.name}
                            </label>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-2 text-gray-500 text-xs">
                          No codes found
                        </div>
                      )}
                    </Accordion.Content>
                  </Accordion.Panel>
                </Accordion>
              ))
            )}
          </div>

          {/* Footer with actions */}
          {storedCode.length > 0 && (
            <div className="bg-gray-50 px-3 py-2 border-t rounded-b-lg flex justify-between items-center">
              <button
                onClick={removeStoredCode}
                className="text-red-600 hover:text-red-800 text-xs font-medium"
              >
                Clear All
              </button>
              <div className="text-xs text-gray-600">
                {storedCode.length} selected
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CodeSelectionInterface;
