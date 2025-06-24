import React from "react";
import ReactDOM from "react-dom";

// core styles
import "./scss/volt.scss";

// vendor styles
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>,
  document.getElementById("root")
);