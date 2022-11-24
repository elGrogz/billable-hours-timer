import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // identifies unsafe lifecycles, unexpected side effects etc
  <React.StrictMode>
    {/* Sets up the app to use routes (basically pages) which are used in the browser (not server side) 
      The page never refreshes, but the URL keeps up to date with the routes 
    */}
    <Router>
      {/* Renders app component */}
      <App />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
