"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Button } from "flowbite-react";
import {
  clear_code_error,
  confirm_selected_code,
  set_code_error,
  set_direct_code,
  set_stored_code,
} from "@/app/Redux/Features/Code/CodeSlice";
import { handleConfirm } from "@/app/Redux/Features/Dashboard/PdfsSlice";

function MultipleSelect() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  // const [showCodeOptions, setShowCodeOptions] = useState(false);
  const dispatch = useDispatch();

  const code = useSelector((state) => state.codeSlice.value);
  const storedCode = useSelector((state) => state.codeSlice.storedCode);
  const usedCode = useSelector((state) => state.codeSlice.usedCode);
  const available = useSelector((state) => state.chatSlice.chat_code);
  const sss = useSelector((state) => state.codeSlice);

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
    if (available) {
      //!available
      if (storedCode.includes(fileId)) {
        dispatch(set_stored_code(fileId));
      } else if (storedCode.length < 5) {
        dispatch(set_stored_code(fileId));
      } else {
        dispatch(set_code_error("You can't check more than 5 files"));
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
          dispatch(clear_code_error());
        }, 1500);
      }
    }
  };
  const removeStoredCode = () => {
    // Allow clearing selections in both contexts
    dispatch(set_direct_code([]));
  };
  const handleConfirmCode = () => {
    dispatch(confirm_selected_code());
    setDropdownOpen(false);
  };

  // start search bar logic
  const filteredCode =
    code && available.length === 0
      ? code
          .map((item) => {
            // Filter PDFs (li elements) within the Accordion
            const matchingPdfs = item.pdfs.filter((pdf) =>
              pdf.name.toLowerCase().includes(searchQuery.toLowerCase())
            );

            // Check if the Accordion header matches or if any PDFs match
            const matchesItem =
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              matchingPdfs.length > 0;

            if (matchesItem) {
              return {
                ...item,
                pdfs: matchingPdfs, // Include only matching PDFs
              };
            }

            return null;
          })
          .filter(Boolean) // Remove null values (non-matching items)
      : code && code.map((item) => item); // Default behavior when not searching

  // end search bar logic

  // end search bar logic

  return (
    <>
      {available && (
        <div className="dropdown-container relative">
          <button
            id="code-btn"
            onClick={() => setDropdownOpen((prevState) => !prevState)}
            className="w-full py-2 px-4 bg-white border border-gray-300 rounded-lg text-left focus:outline-none flex justify-between items-center"
          >
            <span className="text-sm text-gray-700 flex-1">
              {storedCode.length === 0
                ? `Select Codes (${storedCode.length}/5)`
                : `${storedCode.length} code${
                    storedCode.length !== 1 ? "s" : ""
                  } selected`}
            </span>
            <svg
              className={`w-4 h-4 ml-2 transition-transform duration-200 ${
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

          {dropdownOpen && (
            <div className="absolute z-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-2 w-full">
              {showTooltip && (
                <div className="p-2 bg-yellow-200 text-black text-sm rounded-lg shadow-md mb-2">
                  You can only select up to 5 codes.
                </div>
              )}

              {available && (
                // !available
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="block w-full p-2 mb-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:text-white dark:border-gray-500"
                />
              )}
              <ul className="max-h-60 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
                {/* code before selections */}
                {available ? (
                  <>
                    {filteredCode.length === 0 ? (
                      <li className="p-2 text-gray-500">No results found</li>
                    ) : (
                      filteredCode.map((item, i) => (
                        <Accordion key={i} className="p-1">
                          <Accordion.Panel className="p-1">
                            <Accordion.Title className="p-1">
                              <span
                                style={{ fontSize: "14px", fontWeight: "600" }}
                              >
                                {item.name}
                              </span>
                            </Accordion.Title>
                            <Accordion.Content className="p-1">
                              {item.pdfs.length > 0 ? (
                                item.pdfs.map((pdfItem, j) => (
                                  <li key={j}>
                                    <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">
                                      <input
                                        type="checkbox"
                                        id={`checkbox-item-${pdfItem.name}`}
                                        checked={storedCode.includes(
                                          pdfItem.name
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(pdfItem.name)
                                        }
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                                        // disabled={available}
                                      />
                                      <label
                                        htmlFor={`checkbox-item-${pdfItem.name}`}
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-xs"
                                      >
                                        {pdfItem.name}
                                      </label>
                                    </div>
                                  </li>
                                ))
                              ) : (
                                <li className="p-2 text-gray-500">
                                  No Code found
                                </li>
                              )}
                            </Accordion.Content>
                          </Accordion.Panel>
                        </Accordion>
                      ))
                    )}
                  </>
                ) : (
                  <>
                    {true &&
                      filteredCode.length > 0 &&
                      filteredCode
                        .filter((item) =>
                          item.pdfs.some((pdfItem) =>
                            storedCode.includes(pdfItem.name)
                          )
                        )
                        .map((item, i) => (
                          <Accordion key={i} className="p-1">
                            <Accordion.Panel className="p-1">
                              <Accordion.Title className="p-1">
                                <span
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "600",
                                  }}
                                >
                                  {item.name}
                                </span>
                              </Accordion.Title>
                              <Accordion.Content
                                className="p-1"
                                style={{ fontSize: "8px" }}
                              >
                                {item.pdfs
                                  .filter((pdfItem) =>
                                    storedCode.includes(pdfItem.name)
                                  )
                                  .map((pdfItem, j) => (
                                    <li key={j}>
                                      <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">
                                        <input
                                          type="checkbox"
                                          id={`checkbox-item-${pdfItem.name}`}
                                          checked={storedCode.includes(
                                            pdfItem.name
                                          )}
                                          onChange={() =>
                                            handleCheckboxChange(pdfItem.name)
                                          }
                                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                                          // disabled={available}
                                        />
                                        <label
                                          htmlFor={`checkbox-item-${pdfItem.name}`}
                                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-xs"
                                        >
                                          {pdfItem.name}
                                        </label>
                                      </div>
                                    </li>
                                  ))}
                              </Accordion.Content>
                            </Accordion.Panel>
                          </Accordion>
                        ))}
                  </>
                )}
              </ul>

              {/* Show Clear button regardless of available status when codes are selected */}
              {storedCode.length > 0 && (
                <div className="flex justify-between items-center bg-gray-50 px-3 py-2 border-t">
                  <a
                    href="#"
                    className="text-red-600 hover:text-red-800 text-xs font-medium"
                    onClick={removeStoredCode}
                  >
                    Clear All
                  </a>
                  <div className="text-xs text-gray-600">
                    {storedCode.length} selected
                  </div>

                  {/* Only show confirm button when not available */}
                  {!available && (
                    <div>
                      <Button
                        size="xs"
                        className="ml-2"
                        onClick={handleConfirmCode}
                      >
                        SELECTED
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default MultipleSelect;
