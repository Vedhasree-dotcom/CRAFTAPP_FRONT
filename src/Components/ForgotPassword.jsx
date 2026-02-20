import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (!email) return "Email is required";
    if (!email.includes("@")) return "Invalid email";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const error = validate();
    if (error) return;

    try {
      setLoading(true);
      const res = await forgotPassword(email);
      setMessage(res?.data?.message || "Password reset OTP sent to your email.");
      setMessageType("success");
      setTimeout(() => {
        navigate("/verify-otp", { state: { email, purpose: "reset" } });
      }, 2000);
    } catch (err) {
      setMessage(err?.response?.data?.message || "Something went wrong. Try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fp-page" style={{ minHeight: "100vh", background: "#f5f0eb" }}>

      {/* ── LEFT PANEL ── */}
      <div className="fp-left">
        <div className="fp-left-inner">
          <Link to="/" className="fp-brand">CraftMate</Link>
          <p className="fp-brand-tag">Your creative community</p>

          <div className="fp-decor">
            <div className="fp-decor-circle fp-circle-1" />
            <div className="fp-decor-circle fp-circle-2" />
            <div className="fp-decor-line fp-line-1" />
            <div className="fp-decor-line fp-line-2" />
            <div className="fp-decor-line fp-line-3" />
          </div>

          <div className="fp-left-footer">
            <p>"Every expert was once a beginner.<br />Start creating today."</p>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="fp-right">
        <div className="fp-form-wrap">

          {/* back link */}
          <Link to="/login" className="fp-back">
            ← Back to Login
          </Link>

          <span className="fp-eyebrow">Account Recovery</span>
          <h1 className="fp-title">Forgot <em>Password?</em></h1>
          <p className="fp-subtitle">
            No worries! Enter your email address and we'll send you a reset OTP right away.
          </p>

          {/* message */}
          {message && (
            <div className={`fp-message fp-message--${messageType}`}>
              <span>{messageType === "success" ? "✦" : "✕"}</span>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="fp-form">

            <div className="fp-field">
              <label className="fp-label">Email Address</label>
              <input
                className={`fp-input ${submitted && validate() ? 'fp-input--error' : ''}`}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {submitted && validate() && (
                <span className="fp-error">✕ {validate()}</span>
              )}
            </div>

            <button
              type="submit"
              className={`fp-submit ${loading ? 'fp-submit--loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="fp-spinner" />
                  Sending OTP...
                </>
              ) : (
                "Send Reset OTP →"
              )}
            </button>

          </form>

          {/* help text */}
          <p className="fp-help">
            Remembered it?{" "}
            <Link to="/login" className="fp-link">Sign in instead</Link>
          </p>

        </div>
      </div>

    </div>
  );
}