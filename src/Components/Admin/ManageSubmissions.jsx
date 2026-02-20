import { useEffect, useState } from "react";
import api from "../../Services/api";
import "./style.css"

export default function ManageSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
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

  const approveSubmission = async (id) => {
    try {
      await api.put(`/submission/${id}/approve`);
      fetchSubmissions();
    } catch (err) {
      console.error("Approve failed", err);
    }
  };

  const rejectSubmission = async (id) => {
    try {
      await api.put(`/submission/${id}/reject`);
      fetchSubmissions();
    } catch (err) {
      console.error("Reject failed", err);
    }
  };

  if (loading) return <p>Loading submissions...</p>;

  return (
    <div className="admin-submissions">
      <h1>Pending Submissions</h1>

      {submissions.length === 0 ? (
        <p>No pending submissions</p>
      ) : (
        <div className="submission-grid">
          {submissions.map((sub) => (
            <div className="submission-card" key={sub._id}>
              <img
                src={`http://localhost:5000${sub.images[0]}`}
                alt="submission"
              />

              <div className="submission-info">
                <p>{sub.description}</p>

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