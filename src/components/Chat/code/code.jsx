"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "flowbite-react";
import { set_stored_code } from "@/app/Redux/Features/Code/CodeSlice";

function MultipleSelect({ setStoredCode, storedCode }) {
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
    dispatch(set_stored_code(itemName))
    // console.log(itemName);


    // setStoredCode((prevState) => {
    //   if (prevState.includes(itemName)) {
    //     return prevState.filter((item) => item !== itemName);
    //   } else {
    //     return [...prevState, itemName];
    //   }
    // });
  };

  return (
    <>
      <Dropdown label="CODE" dismissOnClick={false} className="code_card">
        {code &&
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
                      checked={state.includes(item.id)}
                      onChange={() => {
                        handleCheckboxChange(item.id);
                      }}
                    />
                    <label for={i + "-11"}>{item.name}</label>

                    <div className="px-3">
                      <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                      </ul>
                    </div>
                  </div>
                </Dropdown.Item>
              ))}
            </>
          ))}
      </Dropdown>
    </>
  );
}

export default MultipleSelect;
