import { Link, useNavigate } from "react-router-dom";
import { useAuth} from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";
import { useState } from "react";
import { FaUserCircle, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { theme, toggleTheme } = useTheme();


  const confirmLogout = async () => {
    await logout();
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar position-fixed top-0">
        <h2 className="logo">CraftMate</h2>

        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/crafts">Crafts</Link>

          {user?.role !== "admin" && (
            <Link to="/findcraft">FindCraft</Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin/dashboard">Dashboard</Link>
          )}
          
          <Link to="/community-projects">Community</Link>

          
          {user && (
            <Link to="/profile" className="icon-btn">
              <FaUserCircle size={24} />
            </Link>
          )}

          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>

          {!user ? (
            <Link to="/login" className="icon-btn">
              <FaSignInAlt size={22} title="Login" />
            </Link>
          ) : (
            <button
              className="icon-btn logout-icon"
              onClick={() => setShowPopup(true)}
              title="Logout"
            >
              <FaSignOutAlt size={22} />
            </button>
          )}
        </div>
      </nav>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>

            <div className="popup-actions">
              <button className="btn-no" onClick={() => setShowPopup(false)}>
                No
              </button>
              <button className="btn-yes" onClick={confirmLogout}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
