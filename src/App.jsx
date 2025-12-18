import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Pages/Home'
import About from './Components/Pages/About'
import Crafts from './Components/Pages/Crafts';
import FindCraft from './Components/Pages/FindCraft';
import Register from './Components/Register'
import Login from './Components/Login';
import VerifyOTP from './Components/VerifyOtp';
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword';
import Footer from './Components/Footer';
import TutorialStep from './Components/tutorials/TutorialStep'
import ProtectedRoute from './Components/ProtectedRoute';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function AppContent() {

   const location = useLocation();
  const isHome = location.pathname === "/"; 

  const hideLayoutRoutes = ['/login', '/register', '/verify-otp', '/forgot-password', '/reset-password'];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);


  return (
    <>
      {!shouldHideLayout && <Navbar isHome={isHome}  />}

      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
          <Home/>
          </ProtectedRoute>} />

        <Route path="/about" element={
          <ProtectedRoute>
          <About />
          </ProtectedRoute>
        } />
        
        <Route path="/crafts" element={
          <ProtectedRoute>
          <Crafts />
          </ProtectedRoute>} />

        <Route path="/findcraft" element={
          <ProtectedRoute>
          <FindCraft />
          </ProtectedRoute>} />

        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />

        <Route path="/verify-otp" element={<VerifyOTP/>} />

        <Route path="/forgot-password" element={<ForgotPassword/>} />

        <Route path="/reset-password" element={<ResetPassword/>} />

        <Route path="/tutorial" element={<TutorialStep/>} />

      </Routes>

      {!shouldHideLayout && <Footer />}
 

    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
