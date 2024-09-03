import { checkCodeAction } from "@/app/Redux/Features/Auth/AuthSlice";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";

function Check_code() {
  const dispatch = useDispatch()
  const [otp, setOtp] = useState("");

  function handleSubmit () {
    dispatch(checkCodeAction({code: otp}))
  }

  return (
    <div className="flex justify-center">
      <div>
        <div className="relative h-px bg-gray-300 mb-12">
          <div className="absolute left-0 top-0  w-full -mt-2">
            <span className="bg-white px-4 text-xs text-gray-500 uppercase">
              we have sent you an otp code
            </span>
          </div>
        </div>
        <OtpInput
          value={otp}
          inputStyle={{
            backgroundColor: "rgb(247 245 245)",
            border: "1px solid gray",
            width: "50px",
            height: "50px",
            borderRadius: "5px",
            color: "#000",
            fontWeight: "800",
          }}
          placeholder=""
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
        />

        <div className="flex w-full mt-12">
          <button
            onClick={handleSubmit}
            type="submit"
            className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-primary-color hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
          >
            <span className="mr-2 uppercase">Send</span>
            <span>
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Check_code;
