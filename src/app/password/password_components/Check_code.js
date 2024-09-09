import { checkCodeAction, storedCode } from "@/app/Redux/Features/Auth/AuthSlice";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";

function Check_code({set_stored_code}) {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const errorMessage = useSelector((state) => state.loginSlice.password.error);

  function handleSubmit() {
    // dispatch(storedCode(otp))
    set_stored_code(otp)
    dispatch(checkCodeAction({ code: otp }));
  }

  return (
    <div>
      {errorMessage && (
        <div
          className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700 mb-4"
          role="alert"
        >
          <svg
            className="w-100 h-5 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <div>
            <span className="font-medium">ERROR! {errorMessage}</span>
          </div>
        </div>
      )}
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
    </div>
  );
}

export default Check_code;
