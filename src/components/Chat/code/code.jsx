"use client"; // Add this directive at the top to ensure client-side rendering

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "flowbite-react";
import {
  clear_code_error,
  set_code_error,
  set_multi_stored_Code,
  set_stored_code,
} from "@/app/Redux/Features/Code/CodeSlice";

function MultipleSelect() {
  const [selectedOptions, setSelectedOptions] = useState(false);
  const dropdownRef = useRef(null);
  const code = useSelector((state) => state.codeSlice.value);
  const storedCode = useSelector((state) => state.codeSlice.storedCode);
  const dispatch = useDispatch();
  const get_chat = useSelector((state) => state.chatSlice.get_chat);
  const available = useSelector((state) => state.chatSlice.chat_code);

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
    if (!available) {
      if (storedCode.length < 9) {
        dispatch(set_stored_code(fileId));
      }else{
        dispatch(set_code_error('You cant check more than 8 files'));
        setTimeout(()=>{dispatch(clear_code_error())} , 1500)
      }
    }
  };
  const handleSelectMultiCode = (filesId) => {
    if (!available) {
      if(filesId.length < 9){
      dispatch(set_multi_stored_Code(filesId));
      }else{
        dispatch(set_code_error('This list has more than 8 files,"you can check 5 files only"'));
        setTimeout(()=>{dispatch(clear_code_error())} , 1500)
      }
    }
  };

  return (
    <Dropdown
      label="CODE"
      dismissOnClick={false}
      className="code_card"
      style={{ minWidth: "150px" }}
    >
      {code.length > 0 ? (
        code.map((item, idx) => (
          <div key={idx}>
            <h5
              className={`px-3 py-2 hover:font-semibold ${
                available ? "" : "cursor-pointer"
              }`}
              onClick={() =>
                handleSelectMultiCode(
                  item.pdfs.map((item) => item.chatgpt_file_id)
                )
              }
            >
              {item.name}
            </h5>
            {item.pdfs.length > 0 ? (
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
                      disabled={available}
                      style={{ opacity: `${get_chat != "" ? 0.5 : 1}` }}
                    />
                    <label htmlFor={`checkbox-${pdf.chatgpt_file_id}`}>
                      {pdf.name}
                    </label>
                  </div>
                </Dropdown.Item>
              ))
            ) : (
              <div className="p-3 pl-5">
                <small>NO Files Yet</small>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="p-3 py-5">...NO CODE YET</div>
      )}
    </Dropdown>
  );
}

export default MultipleSelect;
