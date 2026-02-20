import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../Services/api";

export default function ResetPassword() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email;

  if (!email) {
    return (
      <div className="rp-page" style={{ minHeight: "100vh", background: "#f5f0eb" }}>
        <div className="rp-invalid">
          <span>◈</span>
          <h3>Invalid Session</h3>
          <p>Please restart the password reset process.</p>
          <Link to="/forgot-password" className="rp-invalid-btn">Go Back</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{6}$/.test(otp)) return setError("OTP must be a 6 digit number");
    if (!newPassword || newPassword.length < 6) return setError("Password must be at least 6 characters");
    if (newPassword !== confirmPassword) return setError("Passwords do not match");

    try {
      setLoading(true);
      await api.post("/auth/reset-password", { email, otp, newPassword });
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data?.message || "Reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rp-page" style={{ minHeight: "100vh", background: "#f5f0eb" }}>

      <div className="rp-left">
        <div className="rp-left-inner">
          <Link to="/" className="rp-brand">CraftMate</Link>
          <p className="rp-brand-tag">Your creative community</p>
          <div className="rp-decor">
            <div className="rp-lock-shackle" />
            <div className="rp-lock-body"><div className="rp-lock-dot" /></div>
            <div className="rp-decor-lines">
              <div className="rp-decor-line" />
              <div className="rp-decor-line rp-line-short" />
              <div className="rp-decor-line" />
            </div>
          </div>
          <div className="rp-left-footer">
            <p>"A strong password is the<br />first step to safe creating."</p>
          </div>
        </div>
      </div>

      <div className="rp-right">
        <div className="rp-form-wrap">

          <Link to="/verify-otp" className="rp-back">← Back</Link>

          <span className="rp-eyebrow">Final Step</span>
          <h1 className="rp-title">Reset <em>Password</em></h1>
          <p className="rp-subtitle">Enter your OTP and choose a new password.</p>

          {error && (
            <div className="rp-error-box"><span>✕</span> {error}</div>
          )}

          <form onSubmit={handleSubmit} className="rp-form">

            <div className="rp-field">
              <label className="rp-label">OTP Code</label>
              <input
                className="rp-input"
                placeholder="Enter 6-digit OTP"
                value={otp}
                maxLength={6}
                inputMode="numeric"
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              />
            </div>

            <div className="rp-field">
              <label className="rp-label">New Password</label>
              <div className="rp-pw-wrap">
                <input
                  className="rp-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="button" className="rp-eye" onClick={() => setShowPassword(p => !p)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="rp-field">
              <label className="rp-label">Confirm Password</label>
              <div className="rp-pw-wrap">
                <input
                  className="rp-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {confirmPassword && newPassword === confirmPassword && (
                <span className="rp-match">✦ Passwords match</span>
              )}
            </div>

            <button type="submit" className={`rp-submit ${loading ? 'rp-submit--loading' : ''}`} disabled={loading}>
              {loading ? <><span className="rp-spinner" /> Resetting...</> : "Reset Password →"}
            </button>

          </form>

          <p className="rp-help">
            Remembered it? <Link to="/login" className="rp-link">Sign in</Link>
          </p>

        </div>
      </div>
    </div>
  );
}