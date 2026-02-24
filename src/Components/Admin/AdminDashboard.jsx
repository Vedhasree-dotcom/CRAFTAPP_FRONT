import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import { useAuth } from "../../Context/AuthContext";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    crafts: 0,
    pendingSubmissions: 0,
  });

const { logout, token, loading } = useAuth();
const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // wait for AuthContext to finish
    if (!token) return;   // do nothing if no token

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard-stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    }
  };

  fetchStats();
}, [token, loading]);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-count">{stats.users}</p>
        </div>

        <div className="stat-card">
          <h3>Total Crafts</h3>
          <p className="stat-count">{stats.crafts}</p>
        </div>

        <div className="stat-card">
          <h3>Pending Submissions</h3>
          <p className="stat-count">{stats.pendingSubmissions}</p>
        </div>
      </div>

      <div className="admin-actions">
        <button onClick={() => navigate("/admin/users")}>Manage Users</button>
        <button onClick={() => navigate("/admin/crafts")}>Manage Crafts</button>
        <button onClick={() => navigate("/admin/submissions")}>
          Manage Submissions
        </button>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}
