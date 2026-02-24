import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { FaUserCircle, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const confirmLogout = async () => {
    await logout();
    setShowPopup(false);
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="nb-nav">

        <Link to="/" className="nb-logo">CraftMate</Link>

        <div className="nb-links">
          <Link to="/" className="nb-link">Home</Link>
          <Link to="/about" className="nb-link">About</Link>
          <Link to="/crafts" className="nb-link">Crafts</Link>
          {user?.role !== "admin" && (
            <Link to="/findcraft" className="nb-link">FindCraft</Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin/dashboard" className="nb-link">Dashboard</Link>
          )}
          <Link to="/community-projects" className="nb-link">Community</Link>
        </div>

        <div className="nb-actions">
          {user && (
            <Link to="/profile" className="nb-icon-btn" title="Profile">
              <FaUserCircle size={22} />
            </Link>
          )}
          {!user ? (
            <Link to="/login" className="nb-signin-btn">
              <FaSignInAlt size={14} /> Sign In
            </Link>
          ) : (
            <button
              className="nb-icon-btn nb-logout"
              onClick={() => setShowPopup(true)}
              title="Logout"
            >
              <FaSignOutAlt size={20} />
            </button>
          )}
        </div>

        <button
          className="nb-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <FaBars size={20} />
        </button>

      </nav>

     
      <div
        className={`nb-backdrop ${menuOpen ? 'nb-backdrop--open' : ''}`}
        onClick={closeMenu}
      />

      <div className={`nb-drawer ${menuOpen ? 'nb-drawer--open' : ''}`}>

        <div className="nb-drawer-header">
          <span className="nb-drawer-brand">CraftMate</span>
          <button className="nb-close" onClick={closeMenu} aria-label="Close menu">
            <FaTimes size={18} />
          </button>
        </div>

        <div className="nb-drawer-links">
          <Link to="/"                    className="nb-drawer-link" onClick={closeMenu}>Home</Link>
          <Link to="/about"               className="nb-drawer-link" onClick={closeMenu}>About</Link>
          <Link to="/crafts"              className="nb-drawer-link" onClick={closeMenu}>Crafts</Link>
          {user?.role !== "admin" && (
            <Link to="/findcraft"         className="nb-drawer-link" onClick={closeMenu}>FindCraft</Link>
          )}
          {user?.role === "admin" && (
            <Link to="/admin/dashboard"   className="nb-drawer-link" onClick={closeMenu}>Dashboard</Link>
          )}
          <Link to="/community-projects"  className="nb-drawer-link" onClick={closeMenu}>Community</Link>
        </div>

        <div className="nb-drawer-footer">
          {user && (
            <Link to="/profile" className="nb-drawer-profile" onClick={closeMenu}>
              <div className="nb-drawer-avatar">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="nb-drawer-name">{user.name}</p>
                <p className="nb-drawer-role">{user.role || "Member"}</p>
              </div>
            </Link>
          )}

          {!user ? (
            <Link to="/login" className="nb-drawer-signin" onClick={closeMenu}>
              <FaSignInAlt size={14} /> Sign In
            </Link>
          ) : (
            <button
              className="nb-drawer-logout"
              onClick={() => { setShowPopup(true); setMenuOpen(false); }}
            >
              <FaSignOutAlt size={14} /> Logout
            </button>
          )}
        </div>

      </div>

      {showPopup && (
        <div className="nb-popup-overlay">
          <div className="nb-popup">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="nb-popup-actions">
              <button className="nb-popup-no"  onClick={() => setShowPopup(false)}>Cancel</button>
              <button className="nb-popup-yes" onClick={confirmLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;