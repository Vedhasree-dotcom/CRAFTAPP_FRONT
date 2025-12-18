import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = ({ isHome }) => {
  const { user, logout } = useAuth();

  return (
    <nav className={`navbar ${isHome ? "navbar-home" : "navbar-normal"}`}>
        <h2  className="logo">CraftMate</h2>

       <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

        <div className="dropdown">
          <Link to="/crafts">Crafts ▾</Link>
          <div className="dropdown-menu">
            <Link to="/all">All Crafts</Link>
            <Link to="/crafts/category/paper">Paper Crafts</Link>
            <Link to="/crafts/category/home">Home Decor</Link>
            <Link to="/crafts/category/kids">Kids Crafts</Link>
          </div>
        </div>
        <Link to="/findcraft">FindCraft</Link>

        <button style={{ 
          marginLeft: "15px", 
          padding: "6px 16px",
          border: "none", 
          borderRadius: "4px",
          backgroundColor: "peachpuff",
          fontWeight: "500",
          cursor: "pointer",
        }}> 
          <Link to="/login" style={{color: "brown"}}>Login</Link>
          </button>
      </div>

        

      

    </nav>
  );
};

export default Navbar;
