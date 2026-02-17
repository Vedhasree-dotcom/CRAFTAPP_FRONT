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

      <h1>{craft.title}</h1>

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

       {craft.tutorialvideo && (
            <iframe
                width="100%"
                height="400"
                src={`https://www.youtube.com/embed/${craft.tutorialvideo}`}
                title="YouTube video"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        )}



      </div>

      <h2>Tutorial Steps</h2>

      {craft.tutorialSteps?.length > 0 ? (
        craft.tutorialSteps.map((step) => (
          <div key={step.stepNumber} className="step-card">
            <h4>Step {step.stepNumber}: {step.title}</h4>
            <p>{step.description}</p>

            {step.image && (
              <img
                src={`http://localhost:5000${step.image}`}
                alt={step.title}
              />
            )}
          </div>
        ))
      ) : (
        <p>No tutorial steps available</p>
      )}

      <div className="action-buttons">
        <button onClick={() => navigate(`/admin/edit-craft/${id}`)}>
          Edit
        </button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
