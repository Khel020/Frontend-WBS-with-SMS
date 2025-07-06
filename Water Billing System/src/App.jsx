import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//TODO: layouts
import VisitorLayout from "./layouts/VisitorLayout.jsx";
import ClientLayout from "./layouts/ClientLayout.jsx";
import BillerLayout from "./layouts/CashierLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import StaffLayout from "./layouts/dataEntryLayout.jsx";
import ITLayout from "./layouts/InfoLayout.jsx";
import CSOfficer from "./layouts/CS_Layout.jsx";
import AdminCSLayout from "./layouts/Admin&CSLayout.jsx";
import CashierCSLayout from "./layouts/CashierCSLayout.jsx";
// TODO: Visitor Pages
import AboutUS from "./pages/Visitors/About.jsx";
import ContactUS from "./pages/Visitors/ContactUs.jsx";
import Home from "./pages/Visitors/Home.jsx";
import Login from "./pages/Visitors/login.jsx";
import Register from "./pages/Visitors/register.jsx";
import OrgLogin from "./pages/Visitors/OrgLogin.jsx";
import Landing from "./pages/Visitors/landing.jsx";

//TODO: Portal Pages
import DashClient from "./pages/Portal/ClientDash.jsx";
import PaymentHisto from "./pages/Portal/PaymentHisto.jsx";
import Profile from "./pages/Portal/Profile.jsx";
import YourBills from "./pages/Portal/YourBills.jsx";
// TODO: Imported Page for Bill MNGR
import BillerDash from "./pages/Cashiers/BillerDash.jsx";
import BillingDetails from "./pages/Cashiers/BillingDetails.jsx";
import BillRecords from "./pages/Cashiers/BillRecords.jsx";
import Bills from "./pages/Cashiers/ListBills.jsx";
import ListClient from "./pages/Cashiers/ListClient.jsx";
import ReceivePayments from "./pages/Cashiers/PaymentHistory.jsx";
import Balance from "./pages/Cashiers/Balance.jsx";
import ForDC from "./pages/Cashiers/ForDisconnect.jsx";

//TODO: Admin Pages
import AdminDash from "./pages/Admin/AdminDash.jsx";
import Userlist from "./pages/Admin/userlist.jsx";
import Settings from "./pages/Admin/Settings.jsx";

import CustomersProfile from "./pages/Admin/CustomerProf.jsx";
import Customers from "./pages/Admin/Customers.jsx";
import CusReport from "./pages/Admin/customerReports.jsx";
import Collections from "./pages/Admin/Collections.jsx";
import BillSummary from "./pages/Admin/BillsSummary.jsx";
import Logs from "./pages/Admin/Logs.jsx";

//TODO: Data Entry Staff Pages
import DashboardStaff from "./pages/Data_Uploader/DataEntryDash.jsx";
import Page404 from "./pages/Visitors/404.jsx";

//TODO:CS OFFICER
import CS_CustomerList from "./pages/CS_Officer/ListofConsumers.jsx";
import CS_Dashboard from "./pages/CS_Officer/CS_Dashboard.jsx";
import CS_BillMonitoring from "./pages/CS_Officer/BillMonitoring.jsx";
import CS_NewApplicant from "./pages/CS_Officer/newApplicant.jsx";
//TODO: IT
import IT_Dashboard from "./pages/IT/Dashboard.jsx";
import IT_Userlist from "./pages/IT/userlist.jsx";
import IT_Content from "./pages/IT/webContent.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      //TODO: admin and cs officer
      <Route
        path="customer/:acc_number/:accountName"
        element={<AdminCSLayout />}
      >
        <Route index element={<CustomersProfile />} />
      </Route>
      <Route path="bill-summary" element={<AdminCSLayout />}>
        <Route index element={<BillSummary />} />
      </Route>
      //TODO: CASHIERCS
      <Route path="new-applicant" element={<CashierCSLayout />}>
        <Route index element={<CS_NewApplicant />} />
      </Route>
      //TODO: Customer Service OFFICER
      <Route path="cs-consumers" element={<CSOfficer />}>
        <Route index element={<CS_CustomerList />} />
      </Route>
      <Route path="cs-dashboard" element={<CSOfficer />}>
        <Route index element={<CS_Dashboard />} />
      </Route>
      <Route path="bill-monitoring" element={<CSOfficer />}>
        <Route index element={<CS_BillMonitoring />} />
      </Route>
      <Route path="balances" element={<CSOfficer />}>
        <Route index element={<Balance />} />
      </Route>
      <Route path="disconnection" element={<CSOfficer />}>
        <Route index element={<ForDC />} />
      </Route>
      //TODO: VISITOR ROUTES
      <Route path="/" element={<VisitorLayout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUS />} />
        <Route path="contact-us" element={<ContactUS />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cwd-login" element={<OrgLogin />} />
        <Route path="index" element={<Landing />} />
        <Route path="contents" element={<IT_Content />} />
      </Route>
      //TODO: Client ROUTES
      <Route path="clientdash/:accountName" element={<ClientLayout />}>
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
      <Route
        path="receive-payments/:acc_num/:accountName"
        element={<BillerLayout />}
      >
        <Route index element={<ReceivePayments />} />
      </Route>
      <Route path="cus_reports" element={<BillerLayout />}>
        <Route index element={<CusReport />} />
      </Route>
      <Route path="collections" element={<BillerLayout />}>
        <Route index element={<Collections />} />
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
      <Route path="customers" element={<AdminLayout />}>
        <Route index element={<Customers />} />
      </Route>
      <Route path="logs" element={<AdminLayout />}>
        <Route index element={<Logs />} />
      </Route>
      <Route path="staff-dashboard" element={<StaffLayout />}>
        <Route index element={<DashboardStaff />} />
      </Route>
      {/* TODO: IT ROUTES */}
      <Route path="it-dashboard" element={<ITLayout />}>
        <Route index element={<IT_Dashboard />} />
      </Route>
      <Route path="it-users" element={<ITLayout />}>
        <Route index element={<IT_Userlist />} />
      </Route>
      <Route path="*" element={<Page404 />} />
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
