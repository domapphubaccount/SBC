"use client";

import { Provider } from "react-redux";
import { store } from "./Store";
import { SnackbarProvider } from "notistack"; // Import SnackbarProvider

export default function StoreProvider({ children }) {

  return (
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        {children}
      </Provider>
    </SnackbarProvider>
  );
}
