import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
    }
  };

  return (
    <aside className="admin-sidebar">
      <h2 className="admin-title">Admin</h2>

      <NavLink to="/admin/dashboard" className="admin-link">
        Dashboard
      </NavLink>

      <NavLink to="/admin/users" className="admin-link">
        Manage Users
      </NavLink>

      <NavLink to="/admin/crafts" className="admin-link">
        Manage Crafts
      </NavLink>

      <NavLink to="/admin/submissions" className="admin-link">
        Submissions
      </NavLink>

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </aside>
  );
}
