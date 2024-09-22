"use client"; // Add this directive at the top to ensure client-side rendering

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "flowbite-react";
import { set_stored_code } from "@/app/Redux/Features/Code/CodeSlice";
import loadingImg from "@/assets/logo/loading.gif";

function MultipleSelect() {
  const [selectedOptions, setSelectedOptions] = useState(false);
  const dropdownRef = useRef(null);
  const code = useSelector((state) => state.codeSlice.value);
  const storedCode = useSelector((state) => state.codeSlice.storedCode);
  const dispatch = useDispatch();

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
  }, []);

  const handleCheckboxChange = (fileId) => {
    dispatch(set_stored_code(fileId)); // Dispatch the action to update the store
  };

  return (
    <Dropdown label="CODE" dismissOnClick={false} className="code_card" style={{minWidth:'200px'}}>
      {code.length > 0 ? (
        code.map((item, idx) => (
          <div key={idx}>
            <h5 className="px-3 py-2">{item.name}</h5>
            {item.pdfs.length > 0 ?
             item.pdfs.map((pdf, i) => (
              <Dropdown.Item key={pdf.chatgpt_file_id} className="p-1">
                <div className="checkbox-wrapper-11 px-5">
                  <input
                    value={pdf.chatgpt_file_id}
                    name={`checkbox-${pdf.chatgpt_file_id}`}
                    type="checkbox"
                    id={`checkbox-${pdf.chatgpt_file_id}`}
                    checked={storedCode.includes(pdf.chatgpt_file_id)}
                    onChange={() => handleCheckboxChange(pdf.chatgpt_file_id)}
                  />
                  <label htmlFor={`checkbox-${pdf.chatgpt_file_id}`}>{pdf.name}</label>
                </div>
              </Dropdown.Item>
            ))
            : <div className="p-3 pl-5"><small>NO Files Yet</small></div>
          }
          </div>
        ))
      ) : (
        <div className="p-3 py-5">...NO CODE YET</div>
      )}
    </Dropdown>
  );
}

export default MultipleSelect;
