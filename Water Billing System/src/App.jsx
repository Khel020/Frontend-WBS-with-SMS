import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Header.jsx";

// TODO: Imports for Client Side pages
import AboutUS from "./pages/Client/About.jsx";
import DashClient from "./pages/Client/ClientDash.jsx";
import ContactUS from "./pages/Client/ContactUs.jsx";
import Home from "./pages/Client/Home.jsx";
import Login from "./pages/Client/login.jsx";
import PayHistory from "./pages/Client/PaymentHisto.jsx";
import Profile from "./pages/Client/Profile.jsx";
import Register from "./pages/Client/register.jsx";
import Services from "./pages/Client/Services.jsx";
import ViewBill from "./pages/Client/ViewBill.jsx";

// TODO: Imported Page for Bill MNGR
import BillingDetails from "./pages/BillMngr/BillingDetails.jsx";
import BillRecords from "./pages/BillMngr/BillRecords.jsx";
import ListClient from "./pages/BillMngr/ListClient.jsx";
import PayBill from "./pages/BillMngr/Paybill.jsx";
import Payments from "./pages/BillMngr/Payments.jsx";
import Reports from "./pages/BillMngr/Reports.jsx";

const App = () => {
  const location = useLocation();
  // Define paths where Navbar should not be displayed
  const noNavbarPaths = ["/bills", "/users", "/listClient", "/clientdash"];
  // Determine if Navbar should be shown
  const shouldShowNavbar = !noNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about-us" element={<AboutUS />} />
        <Route path="/contact-us" element={<ContactUS />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/your-bills" element={<ViewBill />} />
        <Route path="/clientdash" element={<DashClient />} />
        <Route path="/listClient" element={<ListClient />} />
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
