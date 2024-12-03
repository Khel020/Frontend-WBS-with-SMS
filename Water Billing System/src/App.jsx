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
import BillerLayout from "./layouts/BillerLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import StaffLayout from "./layouts/dataEntryLayout.jsx";

// TODO: Visitor Pages
import AboutUS from "./pages/Visitors/About.jsx";
import ContactUS from "./pages/Visitors/ContactUs.jsx";
import Home from "./pages/Visitors/Home.jsx";
import Login from "./pages/Visitors/login.jsx";
import Register from "./pages/Visitors/register.jsx";
import OrgLogin from "./pages/Visitors/OrgLogin.jsx";

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
import AdminReports from "./pages/Admin/DetailedReports.jsx";
import CustomersProfile from "./pages/Admin/CustomerProf.jsx";
import Customers from "./pages/Admin/Customers.jsx";
import CusReport from "./pages/Admin/customerReports.jsx";
import Collections from "./pages/Admin/Collections.jsx";
import BillSummary from "./pages/Admin/BillsSummary.jsx";
import Logs from "./pages/Admin/Logs.jsx";
import Registration from "./pages/Admin/Registraion.jsx";

//TODO: Data Entry Staff Pages
import DashboardStaff from "./pages/Data_Uploader/DataEntryDash.jsx";
import Page404 from "./pages/Visitors/404.jsx";

//TODO: CS OFFICER

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      //TODO: VISITOR ROUTES
      <Route path="/" element={<VisitorLayout />}>
        <Route index element={<Home />} />
        <Route path="about-us" element={<AboutUS />} />
        <Route path="contact-us" element={<ContactUS />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="cws-login" element={<OrgLogin />} />
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
      <Route
        path="receive-payments/:acc_num/:accountName"
        element={<BillerLayout />}
      >
        <Route index element={<ReceivePayments />} />
      </Route>
      <Route path="balances" element={<BillerLayout />}>
        <Route index element={<Balance />} />
      </Route>
      <Route path="disconnection" element={<BillerLayout />}>
        <Route index element={<ForDC />} />
      </Route>
      <Route path="cus_reports" element={<BillerLayout />}>
        <Route index element={<CusReport />} />
      </Route>
      <Route path="bill-summary" element={<BillerLayout />}>
        <Route index element={<BillSummary />} />
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
      <Route path="registration" element={<AdminLayout />}>
        <Route index element={<Registration />} />
      </Route>
      <Route path="settings" element={<AdminLayout />}>
        <Route index element={<Settings />} />
      </Route>
      <Route path="reports" element={<AdminLayout />}>
        <Route index element={<AdminReports />} />
      </Route>
      <Route path="customers" element={<AdminLayout />}>
        <Route index element={<Customers />} />
      </Route>
      <Route path="customer/:acc_number/:accountName" element={<AdminLayout />}>
        <Route index element={<CustomersProfile />} />
      </Route>
      <Route path="logs" element={<AdminLayout />}>
        <Route index element={<Logs />} />
      </Route>
      <Route path="staff-dashboard" element={<StaffLayout />}>
        <Route index element={<DashboardStaff />} />
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
