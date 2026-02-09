import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Crafts from "./Pages/Crafts";
import CraftDetails from './Pages/CraftDetails';
import TutorialStep from './Components/tutorials/TutorialStep'
import AllCrafts from './Pages/AllCrafts'
import Paper from './Pages/Paper'
import Homedecor from './Pages/Homedecor'
import Knitting from './Pages/Knitting'
import FindCraft from './Pages/FindCraft';
import Register from './Components/Register'
import Login from './Components/Login';
import VerifyOTP from './Components/VerifyOtp';
import ForgotPassword from './Components/ForgotPassword'
import ResetPassword from './Components/ResetPassword';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute';
import AdminProtectedRoute from './Components/Admin/AdminProtectedRoute';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function AppContent() {

   const location = useLocation();

  const hideLayoutRoutes = ['/login', '/register', '/verify-otp', '/forgot-password', '/reset-password'];
  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);


  return (
    <>
      {!shouldHideLayout && <Navbar/>}

      <Routes>
        <Route path="/" element={
          <Home/>
         } />

        <Route path="/about" element={
          <ProtectedRoute>
          <About />
          </ProtectedRoute>
        } />
        
        <Route path="/crafts" element={
          <ProtectedRoute>
            <Crafts />
            </ProtectedRoute> 
          } >
          <Route index element={<AllCrafts />} />
          <Route path="paper" element={<Paper/>} />
          <Route path="home-decor" element={<Homedecor />} />
          <Route path="knitting" element={<Knitting />} />
          {/* <Route path="painting" element={<Painting />} />
          <Route path="clay" element={<Clay />} />  */}

        </Route>

        <Route path='/crafts/:id' element={
          <ProtectedRoute>
           <CraftDetails /> 
          </ProtectedRoute>
        } />

       <Route path="/crafts/:id/tutorial" element={<TutorialStep />} />

         
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

       {/* Admin routes */}
       <Route path="/admin/dashboard" element={
             <AdminProtectedRoute>
               <AdminDashboard />
            </AdminProtectedRoute>
        } />
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
