import React, { useEffect, useRef, useState } from 'react';
import ArchiveAccordion from './ArchiveAccordions';

function Archive({ dashboardData, setUpdate, update, setInsideChat, setCatchChat, setLoading }) {
    const [archiveToggle, setArchiveToggle] = useState(false);
    const archiveRef = useRef(null);

    const handleClickOutside = (event) => {
        if (archiveRef.current && !archiveRef.current.contains(event.target)) {
            setArchiveToggle(false);
        }
    };

    useEffect(() => {
        if (archiveToggle) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [archiveToggle]);

    return (
        <>
            <svg
                style={{color:'#fff !important'}}
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => setArchiveToggle(!archiveToggle)}
                width={25}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 cursor-pointer"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {archiveToggle && (
                <div
                    ref={archiveRef}
                    className="absolute right-0 z-10 mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        <ArchiveAccordion
                            setLoading={setLoading}
                            setCatchChat={setCatchChat}
                            dashboardData={dashboardData}
                            setUpdate={setUpdate}
                            update={update}
                            setInsideChat={setInsideChat}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default Archive;
