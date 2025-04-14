import React from "react";
import { useSelector } from "react-redux";

function ModuleProgress() {
    const progress = useSelector((state) => state.progressSlice.progress);
    console.log(progress)

  return (
    <>
      {progress.open === true && (
        <div
          className="w-full bg-gray-300	rounded-full dark:bg-gray-700 relative"
          style={{ zIndex: 1000 }}
        >
          <div
            className=" text-xs bg-cyan-600 font-medium rounded-full text-blue-100 text-center p-0.5 leading-none"
            style={{ width: `${progress.value}%` }}
          >
            {progress.value}%
          </div>
        </div>
      )}
    </>
  );
}

export default ModuleProgress;
