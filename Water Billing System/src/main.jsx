import React from "react";
import ReactDOM from "react-dom/client";

import USER from "./pages/userlist.jsx";
import LOGIN from "./pages/login.jsx";
import REGISTER from "./pages/register.jsx";
import BILL from "./pages/BillRecords.jsx";
import BCDETAILS from "./pages/BillingDetails.jsx";
import PAYBILL from "./pages/Paybill.jsx";
import CLIENT from "./pages/ListClient.jsx";
import Sidebar from "./components/Sidebar.jsx";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
