import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import api from "../Services/api";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const { pendingEmail, user, verifyOTP } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Email and purpose passed via state or AuthContext
  const email = location?.state?.email || pendingEmail;
  const purpose = location?.state?.purpose || "login"; // "login" or "reset"

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      return alert("OTP must be a 6 digit number");
    }

    try {
      setLoading(true);

      if (purpose === "login") {
        // Login OTP verification
        const res = await verifyOTP(email, otp);
        alert(res.data.message);
        setVerified(true);

      } else {
        // Forgot-password OTP verification → redirect to ResetPassword
        // We just verify OTP without changing password yet
        const res = await api.post("/api/auth/verify-reset-otp", { email, otp });
        alert(res.data.message || "OTP verified. Please reset your password");
        navigate("/reset-password", { state: { email, otp } });
      }
    } catch (err) {
      alert(err?.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Redirect after login OTP verified
  useEffect(() => {
    if (verified && user) {
      if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/");
    }
  }, [verified, user, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter OTP"
        value={otp}
        maxLength={6}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} // digits only
      />
      <button type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
  );
}
