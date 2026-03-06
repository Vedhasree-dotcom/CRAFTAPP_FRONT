import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../Services/api";

function ProfileEdit() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [initials, setInitials] = useState("?");

  useEffect(() => {
    api.get("/user/profile").then(res => {
      const u = res.data.user;
      setName(u.name || "");
      setPhone(u.phone || "");
      setInitials(u.name ? u.name.charAt(0).toUpperCase() : "?");
    });
  }, []);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    if (phone && !/^\d{10}$/.test(phone)) errs.phone = "Enter a valid 10-digit number";
    if (password && password.length < 6) errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate();
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      await api.put("/user/update-profile", { name, phone, password });
      setSuccess(true);
      setTimeout(() => navigate("/profile"), 1400);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const errs = validate();

  return (
    <div className="pe-page">

      <div className="pe-left">
        <div className="pe-left-inner">

          <Link to="/profile" className="pe-back">
            ← Back to Profile
          </Link>

          <div className="pe-left-center">
            <div className="pe-avatar-wrap">
              <div className="pe-avatar">{initials}</div>
              <div className="pe-avatar-ring" />
            </div>
            <span className="pe-left-eyebrow">Your Account</span>
            <h2 className="pe-left-title">Edit your<br /><em>profile</em></h2>
            <p className="pe-left-sub">
              Keep your details up to date. Changes are saved instantly.
            </p>
          </div>

          <div className="pe-left-footer">
            <p>"The details are not the details.<br />They make the design."</p>
          </div>

        </div>
      </div>

      <div className="pe-right">
        <div className="pe-form-wrap">

          <span className="pe-eyebrow">Update Details</span>
          <h1 className="pe-title">Edit <em>Profile</em></h1>
          <p className="pe-subtitle">Make changes to your name, phone, or password below.</p>

          {success && (
            <div className="pe-success">
              <span>✦</span> Profile updated successfully! Redirecting…
            </div>
          )}

          <form onSubmit={handleSubmit} className="pe-form">

            <div className="pe-field">
              <label className="pe-label">Full Name</label>
              <input
                className={`pe-input${submitted && errs.name ? ' pe-input--error' : ''}`}
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              {submitted && errs.name && <span className="pe-error">✕ {errs.name}</span>}
            </div>

            <div className="pe-field">
              <label className="pe-label">Phone Number</label>
              <input
                className={`pe-input${submitted && errs.phone ? ' pe-input--error' : ''}`}
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
              {submitted && errs.phone && <span className="pe-error">✕ {errs.phone}</span>}
            </div>

            <div className="pe-field">
              <label className="pe-label">New Password <span className="pe-optional">(optional)</span></label>
              <div className="pe-pw-wrap">
                <input
                  className={`pe-input${submitted && errs.password ? ' pe-input--error' : ''}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Leave empty to keep current"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="pe-eye"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label="Toggle password"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
              {submitted && errs.password && <span className="pe-error">✕ {errs.password}</span>}
            </div>

            <div className="pe-actions">
              <Link to="/profile" className="pe-cancel">Cancel</Link>
              <button type="submit" className="pe-submit" disabled={loading || success}>
                {loading
                  ? <><span className="pe-spinner" /> Saving…</>
                  : success
                  ? "✓ Saved!"
                  : "Save Changes →"
                }
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  );
}

export default ProfileEdit;