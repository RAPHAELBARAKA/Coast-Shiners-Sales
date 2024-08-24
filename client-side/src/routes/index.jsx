import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/UserPages/LoginPage/LoginPage";
import ResetPasswordPage from "../pages/UserPages/PasswordResetPage/ResetPasswordPage";
import VerifyOTPPage from "../pages/UserPages/VerifyOTPPage/VerifyOTPPage";
import RegisterPage from "../pages/UserPages/RegisterPage/RegisterPage";
import ForgotPasswordPage from "../pages/UserPages/ForgotPasswordPage/ForgotPasswordPage"
import VerifypassOtpPage from '../pages/UserPages/VerifypassOtpPage/VerifypassOtpPage'
import DashboardPage from "../pages/ClientPages/DashboardPage/DashboardPage";
import AdminDashboardPage from "../pages/AdminPages/AdminDashboardPage/AdminDashboardPage";
import ItemManagementPage from "../pages/AdminPages/ItemManagementPage/ItemManagementPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/verify-passotp" element={< VerifypassOtpPage />} />
        <Route path="/admin-dashboard" element={< AdminDashboardPage />} />
        <Route path="/item-management" element={< ItemManagementPage />} />


      </Routes>
    </Router>
  );
}

export default AppRoutes;
