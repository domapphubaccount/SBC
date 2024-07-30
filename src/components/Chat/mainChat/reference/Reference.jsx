"use client"
import React, { useState } from "react";

export default function Reference({data}) {
  const [ref,setRef] = useState(false)

  const handleCheck = () => {
    setRef(!ref)
  }
  return (
    <>
      {/* <label class="switch_ref" id="ref_switch">
        <input class="chk" type="checkbox" onChange={handleCheck} />
        <div class="slider">#</div>
      </label>
      {ref && */}
      <div className="ref_answer" data-aos="zoom-in">
        {data}
      </div>
      
    </>
  );
}
