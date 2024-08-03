import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Userlist from "./pages/userlist";
import BILLSRECORD from "./pages/BillRecords.jsx";
import ClientList from "./pages/ListClient";
export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" />
          <Route path="/listClient" element={<ClientList />} />
          <Route path="/bills" element={<BILLSRECORD />} />
          <Route path="/records" />
          <Route path="/userList" element={<Userlist />} />
          <Route path="/settings" />
        </Routes>
      </Router>
    </>
  );
}
