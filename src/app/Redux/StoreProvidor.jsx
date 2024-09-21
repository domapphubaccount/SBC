"use client";

import { Provider } from "react-redux";
import { store } from "./Store";
import { useRouter } from "next/navigation";

export default function StoreProvider({ children }) {
  const navigate = useRouter();

  


  return (
    <>
      <Provider store={store}>{children}</Provider>
    </>
  );
}
