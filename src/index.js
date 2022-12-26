import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./components/Store/Store";
import DialogProviders from "./components/Store/Providers/Dialog.provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    
      <BrowserRouter>
        <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
          <DialogProviders>
            <App />
          </DialogProviders>
          
        </SnackbarProvider>
      </BrowserRouter>
    
  </Provider>
);
