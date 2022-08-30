import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // disabled strict mode because useEffect in react18 runs twice instead of only once
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
