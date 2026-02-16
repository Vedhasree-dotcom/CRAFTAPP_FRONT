import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../Services/api";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location?.state?.email;

  if (!email) {
    return <p>Invalid session. Please try again.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(otp)) {
      return alert("OTP must be a 6 digit number");
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/verify-reset-otp", {
        email,
        otp,
      });

      alert(res.data.message);

      navigate("/reset-password", { state: { email } });

    } catch (err) {
      alert(err?.response?.data?.message || "Invalid or expired OTP");
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
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </form>
  );
}
