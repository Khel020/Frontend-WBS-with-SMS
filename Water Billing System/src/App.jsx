import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//layouts
import VisitorLayout from "./layouts/VisitorLayout.jsx";
import ClientLayout from "./layouts/ClientLayout.jsx";
import BillerLayout from "./layouts/BillerLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

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
import BillerDash from "./pages/BillMngr/BillerDash.jsx";

//TODO: Admin Pages
import AdminDash from "./pages/Admin/AdminDash.jsx";
import Userlist from "./pages/Admin/userlist.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      //TODO: VISITOR ROUTES
      <Route path="/" element={<VisitorLayout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUS />} />
        <Route path="contact-us" element={<ContactUS />} />
        <Route path="services" element={<Services />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      //TODO: Client ROUTES
      <Route path="clientdash" element={<ClientLayout />}>
        <Route index element={<DashClient />} />
      </Route>
      //TODO: Biller ROUTES
      <Route path="bill-dashboard" element={<BillerLayout />}>
        <Route index element={<BillerDash />} />
        <Route path="billing-reports" element={<Reports />} />
        <Route path="billing-details" element={<BillingDetails />} />
        <Route path="payments" element={<Payments />} />
        <Route path="paybill" element={<PayBill />} />
      </Route>
      <Route path="listclient" element={<BillerLayout />}>
        <Route index element={<ListClient />} />
        <Route path="billing-records" element={<BillRecords />} />
      </Route>
      //TODO: Admin ROUTES
      <Route path="admin-dashboard" element={<AdminLayout />}>
        <Route index element={<AdminDash />} />
        <Route path="userlist" element={<Userlist />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
