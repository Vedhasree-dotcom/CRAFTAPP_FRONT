import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Services/api";
import "./style.css";

export default function AdminCraftDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [craft, setCraft] = useState(null);

  useEffect(() => {
    fetchCraft();
  }, [id]);

  const fetchCraft = async () => {
    try {
      const res = await api.get(`/crafts/${id}`);
      setCraft(res.data);
    } catch (err) {
      console.error("Error loading craft", err);
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

  if (!craft) return <p>Loading...</p>;

  return (
    <div className="admin-craft-details">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h1 className="craft-title">{craft.title}</h1>

      <img
        src={`http://localhost:5000${craft.image}`}
        alt={craft.title}
        className="main-image"
      />

      <div className="details-box">
        <p><strong>Category:</strong> {craft.category}</p>
        <p><strong>Price:</strong> ₹{craft.price}</p>
        <p><strong>Description:</strong> {craft.description}</p>
        <p><strong>Materials:</strong> {craft.materials?.join(", ")}</p>
      </div>

      {craft.tutorialVideo && (
        <div className="video-section">
          <h4>Complete Tutorial Video</h4>

          {craft.tutorialVideo.includes("youtube") ||
          craft.tutorialVideo.includes("youtu.be") ? (
            <iframe
              width="80%"
              height="400"
              src={craft.tutorialVideo
                .replace("youtu.be/", "www.youtube.com/embed/")
                .split("?")[0]}
              title="YouTube tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <video controls width="80%">
              <source src={craft.tutorialVideo} type="video/mp4" />
              Your browser does not support video.
            </video>
          )}
        </div>
      )}

      <h2 className="tutorial-steps-title">Tutorial Steps</h2>
      {craft.tutorialSteps?.length > 0 ? (
        craft.tutorialSteps.map((step) => (
          <div key={step.stepNumber} className="step-card">
            <h4>
              Step {step.stepNumber}: {step.title}
            </h4>
            <p>{step.description}</p>
            {step.image && (
              <img
                src={`http://localhost:5000${step.image}`}
                alt={step.title}
                className="step-image"
              />
            )}
          </div>
        ))
      ) : (
        <p>No tutorial steps available</p>
      )}

      <div className="action-buttons">
        <button className="edit-btn" onClick={() => navigate(`/admin/edit-craft/${id}`)}>
          Edit
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
