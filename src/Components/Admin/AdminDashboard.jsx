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
    if (loading) return;
    if (!token) return;

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
    <div className="ad-page">

      <div className="ad-header">
        <div>
          <span className="ad-eyebrow">Overview</span>
          <h1>Admin <em>Dashboard</em></h1>
        </div>
        <p className="ad-date">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long", year: "numeric",
            month: "long", day: "numeric"
          })}
        </p>
      </div>

      <div className="ad-stats">

        <div className="ad-stat-card">
          <div className="ad-stat-icon ad-icon--blue">◎</div>
          <div className="ad-stat-body">
            <span className="ad-stat-label">Total Users</span>
            <p className="ad-stat-num">{stats.users}</p>
          </div>
          <div className="ad-stat-bar ad-bar--blue" />
        </div>

        <div className="ad-stat-card">
          <div className="ad-stat-icon ad-icon--amber">✦</div>
          <div className="ad-stat-body">
            <span className="ad-stat-label">Total Crafts</span>
            <p className="ad-stat-num">{stats.crafts}</p>
          </div>
          <div className="ad-stat-bar ad-bar--amber" />
        </div>

        <div className="ad-stat-card ad-stat-card--alert">
          <div className="ad-stat-icon ad-icon--red">◈</div>
          <div className="ad-stat-body">
            <span className="ad-stat-label">Pending Submissions</span>
            <p className="ad-stat-num">{stats.pendingSubmissions}</p>
          </div>
          <div className="ad-stat-bar ad-bar--red" />
        </div>

      </div>

      <div className="ad-section">
        <span className="ad-eyebrow">Quick Actions</span>
        <h2 className="ad-section-title">Manage <em>Platform</em></h2>

        <div className="ad-actions">

          <button className="ad-action-card" onClick={() => navigate("/admin/users")}>
            <div className="ad-action-icon ad-action-icon--blue">◎</div>
            <div className="ad-action-body">
              <p className="ad-action-title">Manage Users</p>
              <p className="ad-action-sub">View, edit and remove user accounts</p>
            </div>
            <span className="ad-action-arrow">↗</span>
          </button>

          <button className="ad-action-card" onClick={() => navigate("/admin/crafts")}>
            <div className="ad-action-icon ad-action-icon--amber">✦</div>
            <div className="ad-action-body">
              <p className="ad-action-title">Manage Crafts</p>
              <p className="ad-action-sub">Add, edit and remove craft listings</p>
            </div>
            <span className="ad-action-arrow">↗</span>
          </button>

          <button className="ad-action-card" onClick={() => navigate("/admin/submissions")}>
            <div className="ad-action-icon ad-action-icon--green">◉</div>
            <div className="ad-action-body">
              <p className="ad-action-title">Manage Submissions</p>
              <p className="ad-action-sub">Review and approve community projects</p>
            </div>
            <span className="ad-action-arrow">↗</span>
          </button>

          <button className="ad-action-card ad-action-card--danger" onClick={logout}>
            <div className="ad-action-icon ad-action-icon--red">⊗</div>
            <div className="ad-action-body">
              <p className="ad-action-title">Logout</p>
              <p className="ad-action-sub">Sign out of the admin panel</p>
            </div>
            <span className="ad-action-arrow">↗</span>
          </button>

        </div>
      </div>

    </div>
  );
}