"use client"

import { chose_code, get_code } from '@/store/Features/Code/Code';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MultipleSelect() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null)
  const chosen_code = useSelector(state => state.codeSlice.chosen_code)
  const token = useSelector(state => state.authSlice.userData.token)
  const codes = useSelector(state => state.codeSlice.codes)
  let codeArray = [...chosen_code]
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  console.log(state)

  useEffect(()=>{
      axios.get('https://sbc.designal.cc/api/sections',{
          headers: {
            Authorization: `Bearer ${token}`
          }}).then(res => 
            {
              if(res.data.success){
                dispatch(get_code(res.data.data))
              }
            }
          ).catch(e => console.log(e))
  },[])

  const handleChoseCode = (item) => {
      let codeArray = [...chosen_code]

      if (codeArray.includes(item)) {
          codeArray = codeArray.filter(code => code !== item)
      } else {
          codeArray.push(item)
      }
      dispatch(chose_code(codeArray))
  }
  const handleChoseAllCode = (checked,item) => {
      let idsArray = []
      if(checked === true){
          item.map(item => idsArray.push(item.id))
      }else if(checked === false){
          idsArray = []
      }
      dispatch(chose_code(idsArray))
  }

      // start dropdown toggle
    const handleToggleDropdown = () => {
      console.log('dsfsdf')
      setDropdownOpen(!dropdownOpen)
    }
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])
    // end dropdown toggle

  return (
    <>
      <div className="relative inline-block text-left">
      <div className=" relative inline-block text-left dropdown-code">
        <div>
          <div onClick={handleToggleDropdown} className="codeInButton">
            <p className="codeInButtonText semibold">CODE</p>
          </div>
        </div>
        {dropdownOpen && (
          <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
            <div className="absolute right-0 w-72 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
              <div className="px-4 py-3">  
              {
                codes.length > 0 ? codes.map((item,index)=>(
                                <p key={index} className="text-sm leading-5">
                                    <div className='flex justify-between'>
                                        <div className='text_blue'>{item.name}</div>
                                        <div>
                                            <label className="checkbox" >
                                                <input type="checkbox" onChange={(e)=> {e.target.checked ? handleChoseAllCode(true , item.pdfs) : handleChoseAllCode(false) } }/>
                                                <svg viewBox="0 0 21 18">
                                                    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 18" id="tick-path">
                                                        <path stroke-linejoin="round" stroke-linecap="round" stroke-width="2.25" fill="none" d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69"></path>
                                                    </symbol>
                                                    <defs>
                                                        <mask id="tick">
                                                            
                                                        </mask>
                                                    </defs>
                                                    
                                                    <path d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z" mask="url(#tick)" fill="white"></path>
                                                </svg>
                                                <svg viewBox="0 0 11 11" className="lines">
                                                    <path d="M5.88086 5.89441L9.53504 4.26746"></path>
                                                    <path d="M5.5274 8.78838L9.45391 9.55161"></path>
                                                    <path d="M3.49371 4.22065L5.55387 0.79198"></path>
                                                </svg>
                                            </label>
                                        </div>
                                    </div> 
                                    <ul>
                                        {item.pdfs.map((item2,index)=>(
                                        <li key={index}>
                                            <div className="checkbox-wrapper-11">
                                                <input value={index}  checked={chosen_code.includes(item2.id)} name="r" onChange={(e)=>{ handleChoseCode(item2.id)}} type="checkbox" id={'02-'+index} />
                                                <label for={'02-'+index}>{item2.name}</label>
                                            </div>
                                        </li>
                                        ))}
                                    </ul>
                                </p>
                            ))
                         :                                 
                         <div className="loader m-auto py-3">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                        </div> 
                        }
                </div>
              </div>
            </div>
        )}
        </div>
      </div>
    </>
  );
}

export default MultipleSelect;
