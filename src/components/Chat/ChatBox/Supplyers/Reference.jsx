import React from 'react'

function Reference() {
  return (
    <div className='code' style={{width: (elementWidth - 40)+'px'}}>
    {item?.answer?.includes('//') && <span className="hover:bg-gray-100 border border-gray-300 px-3 py-2  flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
        <div className="w-full pb-2">
          <div className="flex justify-between">
            {/* <span className="block ml-2 font-semibold text-base text-gray-600">SBC</span> */}
            {/* <span className="block ml-2 text-sm text-gray-600">5 minutes</span> */}
          </div>
           <span className="block ml-2 text-sm text-gray-600  font-semibold">
            {item.answer.match(pattern) ?
              item.answer.match(pattern)?.map((item3,i) => (
                <p className='w-100 my-3' key={i}>{item3}</p>
              ))
              :
              <div>No Reference</div>
            }
            </span>
        </div>
      </span>}
    </div>
  )
}

export default Reference