import './App.css';

import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

import Home from './Pages/Home';
import About from './Pages/About';
import Crafts from "./Pages/Crafts";
import CraftDetails from './Pages/CraftDetails';
import TutorialStep from './Components/tutorials/TutorialStep';
import AllCrafts from './Pages/AllCrafts';
import Paper from './Pages/Paper';
import Homedecor from './Pages/Homedecor';
import Knitting from './Pages/Knitting';
import FindCraft from './Pages/FindCraft';

import Register from './Components/Register';
import Login from './Components/Login';
import VerifyOTP from './Components/VerifyOtp';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminLayout from './Pages/Layout/AdminLayout';

import ProtectedRoute from './Components/ProtectedRoute';
import AdminProtectedRoute from './Components/Admin/AdminProtectedRoute';

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const authRoutes = [
    "/login",
    "/register",
    "/verify-otp",
    "/forgot-password",
    "/reset-password",
  ];

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthRoute = authRoutes.includes(location.pathname);

  const shouldHideLayout = isAdminRoute || isAuthRoute;

  return (
    <>
      {!shouldHideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />

        <Route
          path="/crafts"
          element={
            <ProtectedRoute>
              <Crafts />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllCrafts />} />
          <Route path="paper" element={<Paper />} />
          <Route path="home-decor" element={<Homedecor />} />
          <Route path="knitting" element={<Knitting />} />
        </Route>

        <Route
          path="/crafts/:id"
          element={
            <ProtectedRoute>
              <CraftDetails />
            </ProtectedRoute>
          }
        />

        <Route path="/crafts/:id/tutorial" element={<TutorialStep />} />

        <Route
          path="/findcraft"
          element={
            <ProtectedRoute>
              <FindCraft />
            </ProtectedRoute>
          }
        />

        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* 
          <Route path="users" element={<ManageUsers />} />
          <Route path="crafts" element={<ManageCrafts />} />
          <Route path="submissions" element={<ManageSubmissions />} />
          */}
        </Route>
      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
