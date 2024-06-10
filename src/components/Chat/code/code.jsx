"use client"
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

function MultipleSelect({ setStoredCode, storedCode }) {
  const [selectedOptions, setSelectedOptions] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const dropdownRef = useRef(null);
  const code = useSelector(state => state.codeSlice.value)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelectedOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleCheckboxChange = (itemName) => {
    setStoredCode(prevState => {
      if (prevState.includes(itemName)) {
        // Remove the item if it's already selected
        return prevState.filter(item => item !== itemName);
      } else {
        // Add the item if it's not already selected
        return [...prevState, itemName];
      }
    });
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      // Deselect all items
      setStoredCode(prevState => prevState.filter(item => !code[0].pdfs.map(pdf => pdf.id).includes(item)));
    } else {
      // Select all items
      setStoredCode(prevState => [...new Set([...prevState, ...code[0].pdfs.map(pdf => pdf.id)])]);
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    // Check if all items are selected
    if (code[0]) {
      const allSelected = code[0].pdfs.every(pdf => storedCode.includes(pdf.id));
      setSelectAll(allSelected);
    }
  }, [storedCode, code]);

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div>
          <button type="button" style={{ color: '#fff !important' }} onClick={() => setSelectedOptions(!selectedOptions)} className="inline-flex justify-center w-full text-sm font-medium text-white" id="options-menu" aria-haspopup="true" aria-expanded="true">
            CODE
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        {selectedOptions && code[0] &&
          <div className="origin-top-right absolute right-0 mt-2 w-80	 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <div className="flex items-center ps-2 text-black px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 mr-2 rounded"
                  onChange={handleSelectAllChange}
                  checked={selectAll}
                />
                <div>{code[0].name}</div>
              </div>
              <div>
                {code[0].pdfs.map((item, i) => (
                  <span key={i} className="block px-4 ml-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex" role="menuitem">
                    <input
                      style={{ borderRadius: '7px' }}
                      onChange={() => { handleCheckboxChange(item.id) }}
                      checked={storedCode.includes(item.id)} type="checkbox" className="form-checkbox h-3 w-3 text-indigo-600 mr-1" />
                    <div className='px-2'>{item.name}</div>
                  </span>
                ))}
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default MultipleSelect;
