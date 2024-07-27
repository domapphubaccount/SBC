"use client";
import {
  choseAllCode,
  choseCode,
} from "@/app/Redux/Slices/CodeSlice/CodeSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "flowbite-react";



function MultipleSelect() {
  const [selectedOptions, setSelectedOptions] = useState(false);
  // const [selectAll, setSelectAll] = useState(false);
  const dropdownRef = useRef(null);
  const code = useSelector((state) => state.CodeSlice.data);
  const storedCode = useSelector((state) => state.CodeSlice.chosen);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

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

  const handleCheckboxChange = (item) => {
    console.log(item);
    dispatch(choseCode(item));
  };

  const handleSelectAllChange = (e) => {
    console.log(e.target.checked);
    dispatch(choseAllCode(e.target.checked));
  };

  return (
    <>
      <Dropdown label="CODE" dismissOnClick={false}>
        {code[0] && (
          <>
            <Dropdown.Item className="p-1">
              <div className="flex items-center ps-2 text-black px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                <div class="checkbox-wrapper-11">
                  <input
                    value="2"
                    name="r"
                    type="checkbox"
                    id="02-11"
                    onChange={handleSelectAllChange}
                  />
                  <label for="02-11">{code[0].name}</label>
                </div>
              </div>
            </Dropdown.Item>
            {code[0].pdfs.map((item, i) => (
              <Dropdown.Item key={i} className="p-1">
                <div class="checkbox-wrapper-11">
                  <input
                    value={i}
                    name={i + "r"}
                    type="checkbox"
                    id={i + "-11"}
                    checked={storedCode.includes(item.id)}
                    onChange={() => {
                      handleCheckboxChange(item.id);
                    }}
                  />
                  <label for={i + "-11"}>{item.name}</label>
                </div>
              </Dropdown.Item>
            ))}
          </>
        )}
      </Dropdown>
    </>
  );
}

export default MultipleSelect;
