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
    if (!loading && (token || user)) {
      navigate("/");
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
navigate("/verify-otp", {
  state: {
    email: form.email,  
    purpose: "login",
  },
});
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="form d-flex flex-column">
        {notice && <div className="alert alert-success">{notice}</div>}

        <h1 className="title">Login</h1>

        <input
          className="form-control"
          name="email"
          placeholder="Email"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        {submitted && validate().email && (
          <div className="text-danger small">{validate().email}</div>
        )}

        <div className="password-wrapper">
          <input
            className="form-control"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {submitted && validate().password && (
          <div className="text-danger small">{validate().password}</div>
        )}

        <button type="submit" className="signin">
          Submit
        </button>

        <div className="login-links" 
        style={{marginTop: "15px", display: "flex", 
        justifyContent: "space-between"}}>

         <Link to="/forgot-password"
          style={{color: "chocolate",
            textDecoration: "none",
            fontWeight: "500",
            
          }}>
            Forgot Password?
        </Link>

        <Link to="/register" 
        style={{ 
         color: "chocolate",
         textDecoration: "none",
          fontWeight: "500",
        
         }}>
          Sign Up</Link>

        </div>

      </form>
      </div>
  );
}
