import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./Login.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
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

      //  AuthContext 
      const res = await forgotPassword(email);

      setMessage(res?.data?.message || "Password reset OTP sent to your email");

      // redirect after few seconds
      setTimeout(() => {
        navigate("/verify-otp", {
  state: {
    email,
    purpose: "reset",
  },
});

      }, 2000);

    } catch (err) {
      setMessage(
        err?.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="form d-flex flex-column">
        <h4 className="title">Forgot Password</h4>

        {message && <div className="alert alert-success">{message}</div>}

        <input
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {submitted && validate() && (
          <div className="text-danger small">{validate()}</div>
        )}

        <button type="submit" className="signin" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <div
          className="login-links"
          style={{ marginTop: "20px", marginRight: "280px" }}
        >
          <Link
            to="/login"
            style={{
              color: "chocolate",
              textDecoration: "none",
              fontWeight: "400",
            }}
          >
            Back to Login👈
          </Link>
        </div>
      </form>
    </div>
  );
}
