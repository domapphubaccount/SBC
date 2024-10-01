"use client";

import { Provider } from "react-redux";
import { store } from "./Store";
import { SnackbarProvider } from "notistack"; // Import SnackbarProvider
import { useRouter } from "next/navigation";

export default function StoreProvider({ children }) {
  const navigate = useRouter();

  return (
    <SnackbarProvider maxSnack={3}> {/* Add SnackbarProvider here */}
      <Provider store={store}>
        {children}
        
      </Provider>
    </SnackbarProvider>
  );
}
