"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "flowbite-react";
import { set_stored_code } from "@/app/Redux/Features/Code/CodeSlice";
import loadingImg from "@/assets/logo/loading.gif";

function MultipleSelect() {
  const [selectedOptions, setSelectedOptions] = useState(false);
  const dropdownRef = useRef(null);
  const code = useSelector((state) => state.codeSlice.value);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.codeSlice.storedCode);

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
    dispatch(set_stored_code(itemName));
  };

  return (
    <>
      <Dropdown label="CODE" dismissOnClick={false} className="code_card">
        {code ? (
          code.map((item, i) => (
            <>
              <div>
                <h5 className="px-3 py-2">{item.name}</h5>
              </div>
              {item.pdfs.map((item, i) => (
                <Dropdown.Item key={i} className="p-1">
                  <div class="checkbox-wrapper-11 px-5">
                    <input
                      value={i}
                      name={i + "r"}
                      type="checkbox"
                      id={i + "-11"}
                      checked={state.includes(item.chatgpt_file_id)}
                      onChange={() => {
                        console.log(item)
                        handleCheckboxChange(item.chatgpt_file_id);
                      }}
                    />
                    <label for={i + "-11"}>{item.name}</label>
                  </div>
                </Dropdown.Item>
              ))}
            </>
          ))
        ) : (
          <div>
            <img src={loadingImg.src} alt="loading" className="loading_logo" />
          </div>
        )}
      </Dropdown>
    </>
  );
}

export default MultipleSelect;
