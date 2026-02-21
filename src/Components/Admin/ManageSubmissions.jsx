import { useEffect, useState } from "react";
import api from "../../Services/api";
import "./style.css";

export default function ManageSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
    fetchStats();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await api.get("/submission/pending");
      setSubmissions(res.data);
    } catch (err) {
      console.error("Failed to load submissions", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get("/submission/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  const approveSubmission = async (id) => {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this submission?"
    );
    if (!confirmApprove) return;

    try {
      await api.put(`/submission/${id}/approve`);
      fetchSubmissions();
      fetchStats();
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const rejectSubmission = async (id) => {
    const confirmReject = window.confirm(
      "Are you sure you want to reject this submission?"
    );
    if (!confirmReject) return;

    try {
      await api.put(`/submission/${id}/reject`);
      fetchSubmissions();
      fetchStats();
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  if (loading) return <p>Loading submissions...</p>;

  return (
    <div className="admin-submissions">
      <h1>Manage Submissions</h1>

      {/* Stats */}
      <div className="submission-stats">
        <div className="stat-box">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>

        <div className="stat-box">
          <h3>Approved</h3>
          <p>{stats.approved}</p>
        </div>

        <div className="stat-box">
          <h3>Rejected</h3>
          <p>{stats.rejected}</p>
        </div>
      </div>

      {/* Pending List */}
      <h2 className="pending-title">Pending Submissions</h2>

      {submissions.length === 0 ? (
        <p>No pending submissions</p>
      ) : (
        <div className="submission-grid">
          {submissions.map((sub) => (
            <div className="submission-card" key={sub._id}>
              <img
                src={`http://localhost:5000${sub.images[0]}`}
                alt="submission"
                className="submission-image"
              />

              <div className="submission-info">
                <h3 className="craft-title">
                  {sub.craftId?.title || "Craft"}
                </h3>

                <p className="submission-user">
                  Submitted by <strong>{sub.userId?.name || "User"}</strong>
                </p>

                <p className="submission-description">
                  {sub.description}
                </p>

                {sub.createdAt && (
                  <p className="submission-date">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </p>
                )}

                <div className="submission-actions">
                  <button
                    className="approve-btn"
                    onClick={() => approveSubmission(sub._id)}
                  >
                    Approve
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() => rejectSubmission(sub._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}