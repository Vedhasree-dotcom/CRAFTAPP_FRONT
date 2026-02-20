import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, user, token, loading } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("verified")) {
      setNotice("Email verified successfully. You can now login.");
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  useEffect(() => {
    if (!loading && token && user) {
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [loading, token, user, navigate]);

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    else if (!form.email.includes("@")) errs.email = "Invalid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate();
    if (Object.keys(errs).length) return;
    try {
      await login(form);
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  };

  const errs = validate();

  return (
    <div className="lg-page" style={{ minHeight: "100vh", background: "#f5f0eb" }}>

      <div className="lg-left">
        <div className="lg-left-inner">
          <Link to="/" className="lg-brand">CraftMate</Link>
          <p className="lg-brand-tag">Where every craft tells a story</p>

          <div className="lg-decor-pins">
            <div className="lg-pin lg-pin-1" />
            <div className="lg-pin lg-pin-2" />
            <div className="lg-pin lg-pin-3" />
          </div>

          <div className="lg-left-footer">
            <p>"Creativity is not a talent.<br />It is a way of operating."</p>
          </div>
        </div>
      </div>

      <div className="lg-right">
        <div className="lg-form-wrap">

          <span className="lg-eyebrow">Welcome back</span>
          <h1 className="lg-title">Sign <em>In</em></h1>
          <p className="lg-subtitle">Log in to access your saved crafts and tutorials.</p>

          {notice && (
            <div className="lg-notice">
              <span>✦</span> {notice}
            </div>
          )}

          <form onSubmit={handleSubmit} className="lg-form">

            <div className="lg-field">
              <label className="lg-label">Email</label>
              <input
                className={`lg-input ${submitted && errs.email ? 'lg-input--error' : ''}`}
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
              />
              {submitted && errs.email && (
                <span className="lg-error">✕ {errs.email}</span>
              )}
            </div>

            <div className="lg-field">
              <label className="lg-label">Password</label>
              <div className="lg-password-wrap">
                <input
                  className={`lg-input ${submitted && errs.password ? 'lg-input--error' : ''}`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                />
                <button
                  type="button"
                  className="lg-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {submitted && errs.password && (
                <span className="lg-error">✕ {errs.password}</span>
              )}
            </div>

            <div className="lg-forgot-row">
              <Link to="/forgot-password" className="lg-link">Forgot password?</Link>
            </div>

            <button type="submit" className="lg-submit">
              Sign In →
            </button>

            <div className="lg-divider">
              <span />
              <p>Don't have an account?</p>
              <span />
            </div>

            <Link to="/register" className="lg-signup-btn">
              Create an Account
            </Link>

          </form>
        </div>
      </div>

    </div>
  );
}