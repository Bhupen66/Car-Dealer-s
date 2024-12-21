import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Import BrowserRouter for routing
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppProvider>
      {" "}
      {/* Wrap App in BrowserRouter to enable routing */}
      <App />
    </AppProvider>
  </BrowserRouter>
);
