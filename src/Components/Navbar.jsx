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

          <div className="dropdown">
            <Link to="/crafts">Crafts ▾</Link>
            <div className="dropdown-menu">
              <Link to="/all">All Crafts</Link>
              <Link to="/crafts/category/paper">Paper Crafts</Link>
              <Link to="/crafts/category/home">Home Decor</Link>
              <Link to="/crafts/category/knitting">Knitting</Link>
            </div>
          </div>

          <Link to="/findcraft">FindCraft</Link>

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
