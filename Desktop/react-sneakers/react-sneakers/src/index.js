import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.scss";
import "macro-css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <Router>
      <Routes>
        <Route> */}
    <App />
    {/* </Route>
      </Routes>
    </Router> */}
  </React.StrictMode>
);
