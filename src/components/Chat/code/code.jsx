"use client";

import { remove_code, set_code } from "@/app/Redux/Features/Code/CodeSlice";
import { Accordion } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MultipleSelect() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [showTooltip, setShowTooltip] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown open/close state
  const code = useSelector((state) => state.codeSlice.value); // Assuming you are fetching this from Redux
  const [showCodeOptions, setShowCodeOptions] = useState(true);
  const dispatch = useDispatch();
  const storedCode = useSelector((state) => state.codeSlice.storedCode);

  // Handle checkbox changes
  const handleCheckboxChange = (itemName) => {
    if (storedCode.length < 5) {
      dispatch(set_code(itemName));
    } else {
      setShowCodeOptions(false);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2500);
    }
  };

  useEffect(() => {
    if (storedCode.length) {
      localStorage.setItem("code", JSON.stringify(storedCode));
    }
    setTimeout(() => setShowCodeOptions(false), 7000);
  }, [storedCode]);

  const filteredCode = Array.isArray(code)
    ? code.reduce((acc, item) => {
        const matchedPdfs = item.pdfs.filter((pdf) =>
          pdf.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (matchedPdfs.length > 0) {
          acc.push({ ...item, pdfs: matchedPdfs });
        }
        return acc;
      }, [])
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setDropdownOpen(false); // Close dropdown when clicking outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container relative w-80">
      {/* Dropdown button */}
      <button
        onClick={() => setDropdownOpen((prevState) => !prevState)}
        className="w-full p-2 bg-transparent text-white rounded-lg focus:outline-none"
      >
        CODE
      </button>

      {/* Dropdown content */}
      {dropdownOpen && (
        <div className="absolute z-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-2 w-full">
          {/* Tooltip */}
          {showTooltip && (
            <div className="p-2 bg-yellow-200 text-black text-sm rounded-lg shadow-md mb-2">
              You can only select up to 5 codes.
            </div>
          )}
          {showCodeOptions && (
            <div className="p-2 bg-yellow-200 text-black text-sm rounded-lg shadow-md mb-2">
              You can not change the code after starting new chat.
            </div>
          )}

          {/* Search input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="block color-black text-black w-full p-2 mb-2 border border-gray-300 rounded-lg dark:bg-gray-600 dark:text-white dark:border-gray-500"
          />

          {/* /* Dropdown items */}
          <ul className="max-h-48 overflow-y-auto text-sm text-gray-700 dark:text-gray-200">
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
                      {item.pdfs
                        .slice()
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((pdfItem, j) => (
                          <li key={j}>
                            <div className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md">
                              <input
                                type="checkbox"
                                id={`checkbox-item-${pdfItem.id}`}
                                checked={storedCode.includes(pdfItem.id)}
                                onChange={() =>
                                  handleCheckboxChange(pdfItem.id)
                                }
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
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
              ))
            )}
          </ul>

          {/* Clear Selections */}
          <a
            href="#"
            className="block p-2 mt-2 text-sm text-red-600 dark:text-red-500 hover:bg-gray-200 dark:hover:bg-gray-600"
            onClick={() => dispatch(remove_code())}
          >
            Clear Selections
          </a>
        </div>
      )}
    </div>
  );
}

export default MultipleSelect;
