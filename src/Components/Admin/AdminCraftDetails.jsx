import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Services/api";
import "./style.css";

export default function AdminCraftDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [craft, setCraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchCraft();
  }, [id]);

  const fetchCraft = async () => {
    try {
      const res = await api.get(`/crafts/${id}`);
      setCraft(res.data);
    } catch (err) {
      console.error("Error loading craft", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/crafts/${id}`);
      navigate("/admin/crafts");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (loading) return (
    <div className="acd-idle">
      <div className="acd-spinner" />
      <p>Loading craft...</p>
    </div>
  );

  if (!craft) return (
    <div className="acd-idle">
      <span className="acd-idle-icon">◈</span>
      <h3>Craft not found</h3>
    </div>
  );

  return (
    <div className="acd-page">

      <div className="acd-header">
        <button className="acd-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div className="acd-header-actions">
          <button className="acd-edit-btn" onClick={() => navigate(`/admin/edit-craft/${id}`)}>
            Edit Craft
          </button>
          <button className="acd-delete-btn" onClick={() => setShowPopup(true)}>
            Delete
          </button>
        </div>
      </div>

      <div className="acd-hero">
        <div className="acd-hero-info">
          <span className="acd-eyebrow">Admin Panel</span>
          <h1>{craft.title}</h1>
          <div className="acd-meta">
            <span className="acd-badge acd-badge--blue">{craft.category}</span>
            <span className="acd-price">₹{craft.price}</span>
          </div>
        </div>
        <img
          src={`${import.meta.env.VITE_SERVER_URL}${craft.image}`}
          alt={craft.title}
          className="acd-hero-img"
        />
      </div>

      <div className="acd-details-grid">

        <div className="acd-detail-card">
          <span className="acd-detail-label">Description</span>
          <p className="acd-detail-value">{craft.description}</p>
        </div>

        <div className="acd-detail-card">
          <span className="acd-detail-label">Materials</span>
          <div className="acd-materials">
            {craft.materials?.map((m, i) => (
              <span key={i} className="acd-material-tag">{m}</span>
            ))}
          </div>
        </div>

      </div>

      {craft.tutorialVideo && (
        <div className="acd-section">
          <span className="acd-section-label">Tutorial Video</span>
          <div className="acd-video-wrap">
            {craft.tutorialVideo.includes("youtube") || craft.tutorialVideo.includes("youtu.be") ? (
              <iframe
                src={craft.tutorialVideo
                  .replace("youtu.be/", "www.youtube.com/embed/")
                  .split("?")[0]}
                title="YouTube tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video controls>
                <source src={craft.tutorialVideo} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      )}

      <div className="acd-section">
        <div className="acd-steps-header">
          <span className="acd-section-label">Tutorial Steps</span>
          <span className="acd-steps-count">
            {craft.tutorialSteps?.length || 0} step{craft.tutorialSteps?.length !== 1 ? 's' : ''}
          </span>
        </div>

        {craft.tutorialSteps?.length > 0 ? (
          <div className="acd-steps">
            {craft.tutorialSteps.map((step) => (
              <div key={step.stepNumber} className="acd-step-card">
                <div className="acd-step-num">{step.stepNumber}</div>
                <div className="acd-step-body">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  {step.image && (
                    <img
                      src={`${import.meta.env.VITE_SERVER_URL}${step.image}`}
                      alt={step.title}
                      className="acd-step-img"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="acd-no-steps">No tutorial steps available</div>
        )}
      </div>

      {showPopup && (
        <div className="acd-popup-overlay">
          <div className="acd-popup">
            <h3>Delete Craft?</h3>
            <p>This will permanently delete <strong>"{craft.title}"</strong> and all its tutorial steps.</p>
            <div className="acd-popup-actions">
              <button className="acd-popup-no" onClick={() => setShowPopup(false)}>Cancel</button>
              <button className="acd-popup-yes" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}