import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Userlist from "./pages/userlist";
import BILLSRECORD from "./pages/BillRecords.jsx";
import ClientList from "./pages/ListClient";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/listClient" element={<ClientList />} />
          <Route path="/bills" element={<BILLSRECORD />} />
          <Route path="/userList" element={<Userlist />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
