import React from "react";
import loadingImg from "@/assets/logo/loading_icon.gif";


function Loading_chat() {
  return (
    <section className="h-screen w-full loading_main_chat">
      <div className="h-full w-full flex items-center justify-center">
        <div>
          <div className="text-center">
            <img
              src={loadingImg.src}
              alt="loading"
              className="w-20 loading_logo inline"
            />
            <div className="font-semibold">Loading..</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Loading_chat;
