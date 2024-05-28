import React, { useState } from 'react';
import ArchiveSettings from './ArchiveSettings';

function TailwindAccordion() {
  const [open, setOpen] = useState(null);

  const toggle = (id) => {
    if (open === id) {
      setOpen(null); // Close the accordion if it's already open
    } else {
      setOpen(id); // Open the clicked accordion
    }
  };

  return (
    <div className="w-full bg-gray-50 rounded-lg shadow-lg p-2 " style={{maxHeight:'80vh',overflowY:'auto'}}>
      <div className="accordion">

        <div className="border-b border-gray-200">
          <div
            className="cursor-pointer py-4 flex justify-between items-center"
            onClick={() => toggle(2)}
          >
            <span className="text-sm font-bold text-gray-800">Yesterday</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${open === 2 ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {open === 2 && (
            <div className="pb-2 text-sm font-bold text-gray-700">
                <ul>
                    <li className='px-4 hover:bg-slate-200 flex justify-between'>-- A144844 <ArchiveSettings /></li>
                    <li className='px-4 hover:bg-slate-200 flex justify-between'>-- A144844 <ArchiveSettings /></li>
                    <li className='px-4 hover:bg-slate-200 flex justify-between'>-- A144844 <ArchiveSettings /></li>
                    <li className='px-4 hover:bg-slate-200 flex justify-between'>-- A144844 <ArchiveSettings /></li>
                    <li className='px-4 hover:bg-slate-200 flex justify-between'>-- A144844 <ArchiveSettings /></li>
                </ul>
            </div>
          )}
        </div>

        <div>
          <div
            className="cursor-pointer py-4 flex justify-between items-center"
            onClick={() => toggle(3)}
          >
            <span className="text-sm font-bold text-gray-800">Previous 7 days</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${open === 3 ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {open === 3 && (
            <div className="pb-2 text-sm font-bold text-gray-700">
            <ul>
                <li className='pl-3 hover:bg-slate-200'>-- A144844 <ArchiveSettings /></li>
            </ul>
        </div>
          )}
        </div>
        <div className="border-b border-gray-200">
          <div
            className="cursor-pointer py-4 flex justify-between items-center"
            onClick={() => toggle(2)}
          >
            <span className="text-sm font-bold text-gray-800">Yesterday</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${open === 2 ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {open === 2 && (
            <div className="pb-2 text-sm font-bold text-gray-700">
            <ul>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
            </ul>
        </div>
          )}
        </div>

        <div>
          <div
            className="cursor-pointer py-4 flex justify-between items-center"
            onClick={() => toggle(3)}
          >
            <span className="text-sm font-bold text-gray-800">Previous 7 days</span>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${open === 3 ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {open === 3 && (
            <div className="pb-2 text-sm font-bold text-gray-700">
            <ul>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
                <li className='pl-3 hover:bg-slate-200'>-- A144844</li>
            </ul>
        </div>
          )}
        </div>


      </div>
    </div>
  );
}

export default TailwindAccordion;
