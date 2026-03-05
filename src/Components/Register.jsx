import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register, user, token, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (token || user)) navigate("/");
  }, [loading, token, user, navigate]);

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    else if (!form.email.includes("@")) errs.email = "Invalid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (!form.phone) errs.phone = "Phone is required";
    else if (!/^\+\d{10,15}$/.test(form.phone)) errs.phone = "Use E.164 format e.g. +911234567890";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate();
    if (Object.keys(errs).length) return;
    try {
      const res = await register(form);
      alert(res.data.message);
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  };

  const errs = validate();

  return (
    <div className="rg-page" style={{ minHeight: "100vh", background: "#f5f0eb" }}>

      <div className="rg-left">
        <div className="rg-left-inner">
          <Link to="/" className="rg-brand">CraftMate</Link>
          <p className="rg-brand-tag">Your creative community awaits</p>

          <div className="rg-decor-pins">
            <div className="rg-pin rg-pin-1" />
            <div className="rg-pin rg-pin-2" />
            <div className="rg-pin rg-pin-3" />
            <div className="rg-pin rg-pin-4" />
          </div>

          <div className="rg-left-footer">
            <p>"The desire to create is one of the deepest yearnings of the human soul."</p>
          </div>
        </div>
      </div>

      <div className="rg-right">
        <div className="rg-form-wrap">

          <span className="rg-eyebrow">Get Started</span>
          <h1 className="rg-title">Create an <em>Account</em></h1>
          <p className="rg-subtitle">Join thousands of crafters on CraftMate.</p>

          <form onSubmit={handleSubmit} className="rg-form">

            <div className="rg-field">
              <label className="rg-label">Full Name</label>
              <input
                className={`rg-input ${submitted && errs.name ? 'rg-input--error' : ''}`}
                name="name"
                type="text"
                placeholder="Your full name"
                onChange={(e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
              />
              {submitted && errs.name && <span className="rg-error">✕ {errs.name}</span>}
            </div>

            <div className="rg-field">
              <label className="rg-label">Email</label>
              <input
                className={`rg-input ${submitted && errs.email ? 'rg-input--error' : ''}`}
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={(e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
              />
              {submitted && errs.email && <span className="rg-error">✕ {errs.email}</span>}
            </div>

            <div className="rg-field">
              <label className="rg-label">Password</label>
              <div className="rg-password-wrap">
                <input
                  className={`rg-input ${submitted && errs.password ? 'rg-input--error' : ''}`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                />
                <button
                  type="button"
                  className="rg-eye"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {submitted && errs.password && <span className="rg-error">✕ {errs.password}</span>}
            </div>

            <div className="rg-field">
              <label className="rg-label">Phone</label> 
              <input
                  className={`rg-input ${submitted && errs.phone ? 'rg-input--error' : ''}`}
                  name="phone"
                  type="tel"
                  placeholder="+911234567890"
                  onChange={(e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))}
              />
              {submitted && errs.phone && <span className="rg-error">✕ {errs.phone}</span>}
          </div>

            <button type="submit" className="rg-submit">
              Create Account →
            </button>

            <div className="rg-divider">
              <span />
              <p>Already have an account?</p>
              <span />
            </div>

            <Link to="/login" className="rg-signin-btn">
              Sign In
            </Link>

          </form>
        </div>
      </div>

    </div>
  );
}