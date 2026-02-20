import React, { useState, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "../Services/api";

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputsRef = useRef([]);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location?.state?.email;

  if (!email) {
    return (
      <div className="vo-page" style={{ minHeight: "100vh", background: "#f5f0eb" }}>
        <div className="vo-invalid">
          <span className="vo-invalid-icon">◈</span>
          <h3>Invalid Session</h3>
          <p>Please start the password reset process again.</p>
          <Link to="/forgot-password" className="vo-invalid-btn">Go Back</Link>
        </div>
      </div>
    );
  }

  const handleChange = (val, index) => {
    if (!/^\d?$/.test(val)) return;
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);
    setError("");
    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const updated = [...otp];
    pasted.split("").forEach((char, i) => { updated[i] = char; });
    setOtp(updated);
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpStr = otp.join("");

    if (!/^\d{6}$/.test(otpStr)) {
      setError("Please enter all 6 digits of your OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await api.post("/auth/verify-reset-otp", { email, otp: otpStr });
      alert(res.data.message);
      navigate("/reset-password", { state: { email } });
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const maskedEmail = email.replace(/(.{2}).+(@.+)/, "$1•••$2");

  return (
    <div className="vo-page" style={{ minHeight: "100vh", background: "#f5f0eb" }}>

      <div className="vo-left">
        <div className="vo-left-inner">
          <Link to="/" className="vo-brand">CraftMate</Link>
          <p className="vo-brand-tag">Your creative community</p>

          <div className="vo-decor">
            <div className="vo-decor-boxes">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="vo-decor-box" />
              ))}
            </div>
            <div className="vo-decor-lines">
              <div className="vo-decor-line" />
              <div className="vo-decor-line vo-line-short" />
              <div className="vo-decor-line" />
            </div>
          </div>

          <div className="vo-left-footer">
            <p>"Creativity takes courage.<br />Keep going."</p>
          </div>
        </div>
      </div>

      <div className="vo-right">
        <div className="vo-form-wrap">

          <Link to="/forgot-password" className="vo-back">← Back</Link>

          <span className="vo-eyebrow">Verification</span>
          <h1 className="vo-title">Enter <em>OTP</em></h1>
          <p className="vo-subtitle">
            We sent a 6-digit code to<br />
            <strong>{maskedEmail}</strong>
          </p>

          {error && (
            <div className="vo-error-box">
              <span>✕</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="vo-form">

            <div className="vo-otp-row" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  className={`vo-otp-box ${digit ? 'vo-otp-box--filled' : ''} ${error ? 'vo-otp-box--error' : ''}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                />
              ))}
            </div>

            <button
              type="submit"
              className={`vo-submit ${loading ? 'vo-submit--loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <><span className="vo-spinner" /> Verifying...</>
              ) : (
                "Verify OTP →"
              )}
            </button>

          </form>

          <p className="vo-help">
            Didn't receive a code?{" "}
            <Link to="/forgot-password" className="vo-link">Resend OTP</Link>
          </p>

        </div>
      </div>

    </div>
  );
}