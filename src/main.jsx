import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DeviceSizeProvider } from "./context/DeviceSizeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DeviceSizeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DeviceSizeProvider>
  </React.StrictMode>
);
