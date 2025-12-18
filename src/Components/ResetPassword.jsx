import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../Services/api";

export default function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // email passed from VerifyOTP
  const email = location?.state?.email;

  if (!email) {
    return <p>Invalid reset session. Please try again.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      return alert("OTP must be a 6 digit number");
    }

    if (!newPassword || newPassword.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);

      await api.post("/api/auth/reset-password", {
        email,
        otp,               
        newPassword,       // backend expects this key
      });

      alert("Password reset successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err?.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter OTP"
        value={otp}
        maxLength={6}
        onChange={(e) =>
          setOtp(e.target.value.replace(/\D/g, ""))
        }
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
}
