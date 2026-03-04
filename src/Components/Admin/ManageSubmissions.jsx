import { useEffect, useState } from "react";
import api from "../../Services/api";
import "./style.css";

export default function ManageSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({ open: false, type: null, id: null });

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

  const confirmAction = (type, id) => setPopup({ open: true, type, id });

  const handleAction = async () => {
    const { type, id } = popup;
    try {
      if (type === "approve") await api.put(`/submission/${id}/approve`);
      if (type === "reject")  await api.put(`/submission/${id}/reject`);
      fetchSubmissions();
      fetchStats();
    } catch (err) {
      console.error(`${type} failed`, err);
    } finally {
      setPopup({ open: false, type: null, id: null });
    }
  };

  return (
    <div className="ms-page">

      <div className="ms-header">
        <div>
          <span className="ms-eyebrow">Admin Panel</span>
          <h1>Manage <em>Submissions</em></h1>
        </div>
      </div>

      <div className="ms-stats">
        <div className="ms-stat-card">
          <div className="ms-stat-icon ms-icon--amber">◈</div>
          <div>
            <span className="ms-stat-label">Pending</span>
            <p className="ms-stat-num">{stats.pending}</p>
          </div>
          <div className="ms-stat-bar ms-bar--amber" />
        </div>

        <div className="ms-stat-card">
          <div className="ms-stat-icon ms-icon--green">✦</div>
          <div>
            <span className="ms-stat-label">Approved</span>
            <p className="ms-stat-num">{stats.approved}</p>
          </div>
          <div className="ms-stat-bar ms-bar--green" />
        </div>

        <div className="ms-stat-card">
          <div className="ms-stat-icon ms-icon--red">✕</div>
          <div>
            <span className="ms-stat-label">Rejected</span>
            <p className="ms-stat-num">{stats.rejected}</p>
          </div>
          <div className="ms-stat-bar ms-bar--red" />
        </div>
      </div>

      <div className="ms-section-header">
        <span className="ms-section-label">Pending Submissions</span>
        {!loading && submissions.length > 0 && (
          <span className="ms-count-badge">{submissions.length} pending</span>
        )}
      </div>

      {loading && (
        <div className="ms-idle">
          <div className="ms-spinner" />
          <p>Loading submissions...</p>
        </div>
      )}

      {!loading && submissions.length === 0 && (
        <div className="ms-idle">
          <span className="ms-idle-icon">✦</span>
          <h3>All clear!</h3>
          <p>No pending submissions right now.</p>
        </div>
      )}

      {!loading && submissions.length > 0 && (
        <div className="ms-grid">
          {submissions.map((sub) => (
            <div className="ms-card" key={sub._id}>
              <div className="ms-card-img-wrap">
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}${sub.images[0]}`}
                  alt="submission"
                  className="ms-card-img"
                />
                <span className="ms-pending-badge">⏳ Pending</span>
              </div>

              <div className="ms-card-body">
                <h3 className="ms-craft-title">{sub.craftId?.title || "Craft"}</h3>

                <div className="ms-submitter">
                  <div className="ms-avatar">
                    {sub.userId?.name?.[0]?.toUpperCase()}
                  </div>
                  <span>by <strong>{sub.userId?.name || "User"}</strong></span>
                </div>

                <p className="ms-desc">{sub.description}</p>

                {sub.createdAt && (
                  <p className="ms-date">
                    {new Date(sub.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </p>
                )}

                <div className="ms-actions">
                  <button
                    className="ms-approve-btn"
                    onClick={() => confirmAction("approve", sub._id)}
                  >
                    ✓ Approve
                  </button>
                  <button
                    className="ms-reject-btn"
                    onClick={() => confirmAction("reject", sub._id)}
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {popup.open && (
        <div className="ms-popup-overlay">
          <div className="ms-popup">
            <div className={`ms-popup-icon ${popup.type === "approve" ? "ms-popup-icon--green" : "ms-popup-icon--red"}`}>
              {popup.type === "approve" ? "✓" : "✕"}
            </div>
            <h3>{popup.type === "approve" ? "Approve Submission?" : "Reject Submission?"}</h3>
            <p>
              {popup.type === "approve"
                ? "This submission will be approved and visible to the community."
                : "This submission will be rejected and removed from the queue."}
            </p>
            <div className="ms-popup-actions">
              <button className="ms-popup-no" onClick={() => setPopup({ open: false, type: null, id: null })}>
                Cancel
              </button>
              <button
                className={`ms-popup-yes ${popup.type === "approve" ? "ms-popup-yes--green" : "ms-popup-yes--red"}`}
                onClick={handleAction}
              >
                {popup.type === "approve" ? "Approve" : "Reject"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}