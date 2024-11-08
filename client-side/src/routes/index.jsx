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
import OnePopularPage from "../pages/ClientPages/OnePopularPage/OnePopularPage";
import CartPage from "../pages/ClientPages/CartPage/CartPage";
import PaymentPage from "../pages/ClientPages/PaymentPage/PaymentPage";
import FoodItemsPage from "../pages/ClientPages/FoodItemsPage/FoodItemsPage";
import HouseholdPage from "../pages/ClientPages/HouseholdPage/HouseholdPage";
import ClothingPage from "../pages/ClientPages/ClothingPage/ClothingPage";
import OfficeItemsPage from "../pages/ClientPages/OfficeItemsPage/OfficeItemsPage";
import ElectronicsPage from "../pages/ClientPages/ElectronicsPage/ElectronicsPage";
import HealthItemsPage from "../pages/ClientPages/HealthItemsPage/HealthItemsPage";
import AdminOrdersPage from "../pages/AdminPages/AdminOrdersPage/AdminOrdersPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/verify-passotp" element={< VerifypassOtpPage />} />
        <Route path="/admin-dashboard" element={< AdminDashboardPage />} />
        <Route path="/item-management" element={< ItemManagementPage />} />
        <Route path="/popular/:popular" element={<OnePopularPage />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/payment" element={<PaymentPage/>} />
        <Route path="/food" element={<FoodItemsPage/>} />
        <Route path="/household" element={<HouseholdPage/>} />
        <Route path="/clothing" element={<ClothingPage/>} />
        <Route path="/office" element={<OfficeItemsPage/>} />
        <Route path="/electronics" element={<ElectronicsPage/>} />
        <Route path="/health" element={<HealthItemsPage/>} />
        <Route path="/admin-orders" element={<AdminOrdersPage/>} />






      </Routes>
    </Router>
  );
}

export default AppRoutes;
