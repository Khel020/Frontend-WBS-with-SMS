import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Header.jsx";
import Userlist from "./pages/userlist";
import BILLSRECORD from "./pages/BillRecords.jsx";
import ClientList from "./pages/ListClient";

// TODO: Imports for Client Side pages
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import Home from "./pages/Home.jsx";
import AboutUS from "./pages/About.jsx";
import ContactUS from "./pages/ContactUs.jsx";
import Services from "./pages/Services.jsx";
import ViewBill from "./pages/ViewBill.jsx";

const App = () => {
  const location = useLocation();

  // Define paths where Navbar should not be displayed
  const noNavbarPaths = ["/bills", "/users", "/listClient"];

  // Determine if Navbar should be shown
  const shouldShowNavbar = !noNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUS />} />
        <Route path="/contact-us" element={<ContactUS />} />
        <Route path="/FAQs" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bills" element={<BILLSRECORD />} />
        <Route path="/users" element={<Userlist />} />
        <Route path="/listClient" element={<ClientList />} />
        <Route path="*" element={<div>Page is not available</div>} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
