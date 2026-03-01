import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { FaTachometerAlt, FaUsers, FaPaintBrush, FaClipboardList, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const confirmLogout = () => {
    logout();
    setShowPopup(false);
    navigate("/login");
  };

  const links = [
    { to: "/admin/dashboard",    label: "Dashboard",         icon: <FaTachometerAlt /> },
    { to: "/admin/users",        label: "Manage Users",      icon: <FaUsers /> },
    { to: "/admin/crafts",       label: "Manage Crafts",     icon: <FaPaintBrush /> },
    { to: "/admin/submissions",  label: "Submissions",       icon: <FaClipboardList /> },
    { to: "/admin/purchases",    label: "Purchases",         icon: <FaClipboardList /> },
  ];

  return (
    <>
      <div className="as-mobile-bar">
        <span className="as-mobile-brand">CraftMate <em>Admin</em></span>
        <button className="as-hamburger" onClick={() => setMobileOpen(true)}>
          <FaBars size={18} />
        </button>
      </div>

      <div
        className={`as-backdrop ${mobileOpen ? 'as-backdrop--open' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside className={`as-sidebar ${mobileOpen ? 'as-sidebar--open' : ''}`}>

        <div className="as-brand">
          <div className="as-brand-text">
            <span className="as-brand-name">CraftMate</span>
            <span className="as-brand-tag">Admin Panel</span>
          </div>
          <button className="as-close" onClick={() => setMobileOpen(false)}>
            <FaTimes size={16} />
          </button>
        </div>

        {user && (
          <div className="as-user">
            <div className="as-avatar">
              {user.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="as-user-name">{user.name}</p>
              <p className="as-user-role">Administrator</p>
            </div>
          </div>
        )}

        <div className="as-divider" />

        <nav className="as-nav">
          <span className="as-nav-label">Navigation</span>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `as-link ${isActive ? 'as-link--active' : ''}`
              }
              onClick={() => setMobileOpen(false)}
            >
              <span className="as-link-icon">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="as-divider" />

        <button className="as-logout" onClick={() => setShowPopup(true)}>
          <span className="as-link-icon"><FaSignOutAlt /></span>
          Logout
        </button>

      </aside>

      {showPopup && (
        <div className="as-popup-overlay">
          <div className="as-popup">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout of the admin panel?</p>
            <div className="as-popup-actions">
              <button className="as-popup-no"  onClick={() => setShowPopup(false)}>Cancel</button>
              <button className="as-popup-yes" onClick={confirmLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}