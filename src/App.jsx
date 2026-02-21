import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Crafts from "./Pages/Crafts";
import CraftDetails from "./Pages/CraftDetails";
import TutorialStep from "./Components/tutorials/TutorialStep";
import SubmitProject from "./Pages/SubmitProject";
import ProjectPage from "./Pages/ProjectPage";
import AllCrafts from "./Pages/AllCrafts";
import Paper from "./Pages/Paper";
import Homedecor from "./Pages/Homedecor";
import Knitting from "./Pages/Knitting";
import FindCraft from "./Pages/FindCraft";
import Profile from "./Pages/Profile";
import Register from "./Components/Register";
import Login from "./Components/Login";
import VerifyOTP from "./Components/VerifyOtp";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";

import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminLayout from "./Pages/Layout/AdminLayout";
import ManageCrafts from "./Components/Admin/ManageCrafts";
import AddCraft from "./Components/Admin/Addcraft";
import AdminCraftDetails from "./Components/Admin/AdminCraftDetails";
import EditCraft from "./Components/Admin/EditCraft";
import ManageSubmissions from "./Components/Admin/ManageSubmissions";
import ManageUsers from "./Components/Admin/ManageUsers";

import ProtectedRoute from "./Components/ProtectedRoute";
import AdminProtectedRoute from "./Components/Admin/AdminProtectedRoute";

function App() {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) return null;

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

        <Route
          path="/"
          element={
            user?.role === "admin" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Home />
            )
          }
        />

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
        <Route path="/submit-project" element={<SubmitProject />} />
        <Route path="community-projects" element={
          <ProtectedRoute>
            <ProjectPage />
          </ProtectedRoute>} />

        <Route
          path="/findcraft"
          element={
            <ProtectedRoute>
              <FindCraft />
            </ProtectedRoute>
          }
        />

        <Route path="/profile" element={<Profile/>} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }
        >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="crafts" element={<ManageCrafts />} />
            <Route path="add-craft" element={<AddCraft />} />
            <Route path="crafts/:id" element={<AdminCraftDetails />} />
            <Route path="edit-craft/:id" element={<EditCraft />} />
            <Route path="submissions" element={<ManageSubmissions />} />
            <Route path="users" element={<ManageUsers />} />



        </Route>

      </Routes>

      {!shouldHideLayout && <Footer />}
    </>
  );
}

export default App;
