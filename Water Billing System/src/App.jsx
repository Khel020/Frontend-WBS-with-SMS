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
import Register from "./pages/Client/register.jsx";
import Services from "./pages/Client/Services.jsx";
import YourBills from "./pages/Client/billingCus.jsx";
import Profile from "./pages/Client/Profile.jsx";
import PaymentHisto from "./pages/Client/PaymentHisto.jsx";

// TODO: Imported Page for Bill MNGR
import BillerDash from "./pages/BillMngr/BillerDash.jsx";
import BillingDetails from "./pages/BillMngr/BillingDetails.jsx";
import BillRecords from "./pages/BillMngr/BillRecords.jsx";
import Bills from "./pages/BillMngr/ListBills.jsx";
import ListClient from "./pages/BillMngr/ListClient.jsx";
import ReceivePayments from "./pages/BillMngr/PaymentHistory.jsx";
import Balance from "./pages/BillMngr/Balance.jsx";
import ForDC from "./pages/BillMngr/ForDisconnect.jsx";

//TODO: Admin Pages
import AdminDash from "./pages/Admin/AdminDash.jsx";
import Userlist from "./pages/Admin/userlist.jsx";
import Settings from "./pages/Admin/Settings.jsx";
import AdminReports from "./pages/Admin/DetailedReports.jsx";
import CustomersProfile from "./pages/Admin/CustomerProf.jsx";
import Customers from "./pages/Admin/Customers.jsx";
import CusReport from "./pages/Admin/customerReports.jsx";
import ConsumptionReport from "./pages/Admin/Consumptions.jsx";
import Collections from "./pages/Admin/Collections.jsx";
import BillSummary from "./pages/Admin/BillsSummary.jsx";

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
      <Route path="yourbills" element={<ClientLayout />}>
        <Route index element={<YourBills />} />
      </Route>
      <Route path="payments" element={<ClientLayout />}>
        <Route index element={<PaymentHisto />} />
      </Route>
      <Route path="profile" element={<ClientLayout />}>
        <Route index element={<Profile />} />
      </Route>
      //TODO: Biller ROUTES
      <Route path="bill-dashboard" element={<BillerLayout />}>
        <Route index element={<BillerDash />} />
      </Route>
      <Route path="bills" element={<BillerLayout />}>
        <Route index element={<Bills />} />
      </Route>
      <Route path="listclient" element={<BillerLayout />}>
        <Route index element={<ListClient />} />
      </Route>
      <Route
        path="billing-records/:acc_number/:accountName"
        element={<BillerLayout />}
      >
        <Route index element={<BillRecords />} />
        <Route path="billing-details" element={<BillingDetails />} />
      </Route>
      <Route path="billing-details/:billNumber" element={<BillerLayout />}>
        <Route index element={<BillingDetails />} />
        <Route path="billing-details" element={<BillingDetails />} />
      </Route>
      <Route path="receive-payments/:acc_num" element={<BillerLayout />}>
        <Route index element={<ReceivePayments />} />
      </Route>
      <Route path="balances" element={<BillerLayout />}>
        <Route index element={<Balance />} />
      </Route>
      <Route path="disconnection" element={<BillerLayout />}>
        <Route index element={<ForDC />} />
      </Route>
      //TODO: Admin ROUTES
      <Route path="admin-dashboard" element={<AdminLayout />}>
        <Route index element={<AdminDash />} />
      </Route>
      <Route path="userlist" element={<AdminLayout />}>
        <Route index element={<Userlist />} />
      </Route>
      <Route path="settings" element={<AdminLayout />}>
        <Route index element={<Settings />} />
      </Route>
      <Route path="reports" element={<AdminLayout />}>
        <Route index element={<AdminReports />} />
      </Route>
      <Route path="reports" element={<AdminLayout />}>
        <Route index element={<AdminReports />} />
      </Route>
      <Route path="cus_reports" element={<AdminLayout />}>
        <Route index element={<CusReport />} />
      </Route>
      <Route path="consumption_rep" element={<AdminLayout />}>
        <Route index element={<ConsumptionReport />} />
      </Route>
      <Route path="bill-summary" element={<AdminLayout />}>
        <Route index element={<BillSummary />} />
      </Route>
      <Route path="collections" element={<AdminLayout />}>
        <Route index element={<Collections />} />
      </Route>
      <Route path="customers" element={<AdminLayout />}>
        <Route index element={<Customers />} />
      </Route>
      <Route path="customer/:acc_number/:accountName" element={<AdminLayout />}>
        <Route index element={<CustomersProfile />} />
      </Route>
      <Route path="*" element={<div>Page is not available</div>} />
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
