import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import makeLogin from "./permission/login";

const root = ReactDOM.createRoot(document.getElementById("root"));
makeLogin();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
