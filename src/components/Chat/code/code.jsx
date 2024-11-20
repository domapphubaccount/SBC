"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion } from "flowbite-react";
import {
  clear_code_error,
  set_code_error,
  set_direct_code,
  set_stored_code,
} from "@/app/Redux/Features/Code/CodeSlice";

function MultipleSelect() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCodeOptions, setShowCodeOptions] = useState(false);
  const dispatch = useDispatch();

  const code = useSelector((state) => state.codeSlice.value);
  const storedCode = useSelector((state) => state.codeSlice.storedCode);
  const available = useSelector((state) => state.chatSlice.chat_code);

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
    if (!available) {
      dispatch(set_direct_code([]));
    }
  };

  // start search bar logic
  const filteredCode =
    code && available.length == 0
      ? code.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.pdfs.some((pdf) =>
              pdf.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
      : code && code.map((item) => item);
   // end search bar logic

  return (
    <div className="dropdown-container relative w-60">
      <button
        onClick={() => setDropdownOpen((prevState) => !prevState)}
        className="w-full p-2 bg-transparent text-white rounded-lg focus:outline-none"
      >
        CODE
      </button>

      {dropdownOpen && (
        <div className="absolute z-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-2 w-full">
          {showTooltip && (
            <div className="p-2 bg-yellow-200 text-black text-sm rounded-lg shadow-md mb-2">
              You can only select up to 5 codes.
            </div>
          )}
          {showCodeOptions && (
            <div className="p-2 bg-yellow-200 text-black text-sm rounded-lg shadow-md mb-2">
              You cannot change the code after starting a new chat.
            </div>
          )}

          {!available && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="block w-full p-2 mb-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:text-white dark:border-gray-500"
            />
          )}
          <ul className="max-h-48 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
            {/* code before selections */}

            {available.length <= 0 ? (
              <>
                {filteredCode.length === 0 ? (
                  <li className="p-2 text-gray-500">No results found</li>
                ) : (
                  filteredCode.map((item, i) => (
                    <Accordion key={i} className="p-2">
                      <Accordion.Panel className="p-2">
                        <Accordion.Title className="p-2">
                          {item.name}
                        </Accordion.Title>
                        <Accordion.Content className="p-2">
                          {item.pdfs.length > 0 ? (
                            item.pdfs.map((pdfItem, j) => (
                              <li key={j}>
                                <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">
                                  <input
                                    type="checkbox"
                                    id={`checkbox-item-${pdfItem.id}`}
                                    checked={storedCode.includes(
                                      pdfItem.chatgpt_file_id
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        pdfItem.chatgpt_file_id
                                      )
                                    }
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                                    disabled={available}
                                  />
                                  <label
                                    htmlFor={`checkbox-item-${pdfItem.id}`}
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    {pdfItem.name}
                                  </label>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li className="p-2 text-gray-500">No Code found</li>
                          )}
                        </Accordion.Content>
                      </Accordion.Panel>
                    </Accordion>
                  ))
                )}
              </>
            ) : (
              <>
                {available.length > 0 &&
                  filteredCode.length > 0 &&
                  filteredCode
                    .filter((item) =>
                      item.pdfs.some((pdfItem) =>
                        storedCode.includes(pdfItem.chatgpt_file_id)
                      )
                    )
                    .map((item, i) => (
                      <Accordion key={i} className="p-2">
                        <Accordion.Panel className="p-2">
                          <Accordion.Title className="p-2">
                            {item.name}
                          </Accordion.Title>
                          <Accordion.Content className="p-2">
                            {item.pdfs
                              .filter((pdfItem) =>
                                storedCode.includes(pdfItem.chatgpt_file_id)
                              )
                              .map((pdfItem, j) => (
                                <li key={j}>
                                  <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">
                                    <input
                                      type="checkbox"
                                      id={`checkbox-item-${pdfItem.id}`}
                                      checked={storedCode.includes(
                                        pdfItem.chatgpt_file_id
                                      )}
                                      onChange={() =>
                                        handleCheckboxChange(
                                          pdfItem.chatgpt_file_id
                                        )
                                      }
                                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                                      disabled={available}
                                    />
                                    <label
                                      htmlFor={`checkbox-item-${pdfItem.id}`}
                                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
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

          {!available && (
            <a
              href="#"
              className="block p-2 mt-2 text-sm text-red-600 dark:text-red-500 hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={removeStoredCode}
            >
              Clear Selections
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default MultipleSelect;
