"use client"
import React, { useEffect, useRef, useState } from 'react';

function MultipleSelect() {
  const [selectedOptions, setSelectedOptions] = useState(false);
  const dropdownRef = useRef(null);



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

  return (
    <>
        <div className="relative inline-block text-left" ref={dropdownRef}>
        <div>
            <button type="button" onClick={()=>setSelectedOptions(!selectedOptions)} className="inline-flex justify-center w-full text-sm font-medium " id="options-menu" aria-haspopup="true" aria-expanded="true">
            CODE
            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            </button>
        </div>
        {selectedOptions &&
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex" role="menuitem"><input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" mr-3/><div className='px-3'>Option 1</div></span>
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex" role="menuitem"><input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" mr-3/><div className='px-3'>Option 1</div></span>
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex" role="menuitem"><input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" mr-3/><div className='px-3'>Option 1</div></span>
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex" role="menuitem"><input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" mr-3/><div className='px-3'>Option 1</div></span>
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex" role="menuitem"><input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" mr-3/><div className='px-3'>Option 1</div></span>
                <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex" role="menuitem"><input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" mr-3/><div className='px-3'>Option 1</div></span>

            </div>
        </div>
}
        </div>

        {/* <div className="mt-4">
        <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
            <span className="ml-2 text-gray-700">Checkbox 1</span>
        </label>
        <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
            <span className="ml-2 text-gray-700">Checkbox 2</span>
        </label>
        <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
            <span className="ml-2 text-gray-700">Checkbox 3</span>
        </label>
        <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
            <span className="ml-2 text-gray-700">Checkbox 4</span>
        </label>
        <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
            <span className="ml-2 text-gray-700">Checkbox 5</span>
        </label>
        </div> */}
    </>

  );
}

export default MultipleSelect;
