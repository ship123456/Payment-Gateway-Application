import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import { Navigate } from "react-router-dom";
import Login from "./pages/Authentication/Login/Login";
import SignUp from "./pages/Authentication/Signup/Signup";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/Dashboard/Dashboard";
import NewPayment from "./pages/NewPayment/NewPayment";
import PaymentHistory from "./pages/PaymentHistory/PaymentHistory";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import ContactSupport from "./pages/ContactSupport/ContactSupport";
import SupportTickets from "./pages/SupportTickets/SupportTickets";
import FAQ from "./pages/FAQ/FAQ";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {" "}
          <Route index element={<Dashboard />} />
          <Route path="new-payment" element={<NewPayment />} />
          <Route path="payment-history" element={<PaymentHistory />} />
          <Route path="profile" element={<Profile />} />
          <Route path="change-password" element={<Settings />} />
          <Route path="support/contact" element={<ContactSupport />} />
          <Route path="support/tickets" element={<SupportTickets />} />
          <Route path="support/faq" element={<FAQ />} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}
export default App;
