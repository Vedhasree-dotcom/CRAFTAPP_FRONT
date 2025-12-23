import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const confirmLogout = async () => {
    await logout();
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <h2 className="logo">CraftMate</h2>

        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>

            <Link to="/crafts">Crafts </Link>
            
          {user?.role !== "admin" && (
              <Link to="/findcraft">FindCraft</Link>
            )}
            
          {user?.role === "admin" && (
              <Link to="/admin/dashboard">Dashboard</Link>
            )}

          {!user ? (
            <button className="auth-btn">
              <Link to="/login" style={{ color: "brown" }}>
                Login
              </Link>
            </button>
          ) : (
            <button
              className="auth-btn logout-btn"
              onClick={() => setShowPopup(true)}
            >
              Logout
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
