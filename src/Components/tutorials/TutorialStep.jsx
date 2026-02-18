import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../tutorials/Tutorial.css";

export default function TutorialStep() {
  const { id } = useParams();
  const [craft, setCraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCraft = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/crafts/${id}`
        );
        const data = await res.json();
        setCraft(data);
      } catch (err) {
        console.error("Failed to load craft", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCraft();
  }, [id]);         

  if (loading) return <p className="loading">Loading tutorial...</p>;
  if (!craft) return <p>Craft not found</p>;

  return (
    <div className="tutorial-container">
      <div className="tutorial-header">
        <h3>{craft.title}</h3>
        <p>{craft.description}</p>
      </div>

      <div className="materials-box">
        <h4>Materials Required</h4>
        <ul>
          {craft.materials.map((mat, index) => (
            <li key={index}>{mat}</li>
          ))}
        </ul>
      </div>

      <div className="steps-section">
        <h2>Tutorial Steps</h2>

        {craft.tutorialSteps.map((step) => (
          <div key={step.stepNumber} className="step-card">
            <div className="step-text">
              <span className="step-number">
                Step {step.stepNumber}
              </span>
              <h5>{step.title}</h5>
              <p>{step.description}</p>
            </div>

            <div className="step-image">
              {step.image && (
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}${step.image}` || "https://via.placeholder.com/150x350"}
                  alt={step.title}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {craft.tutorialVideo && (
  <div className="video-section">
    <h4>Complete Tutorial Video</h4>

    {craft.tutorialVideo.includes("youtube") ||
    craft.tutorialVideo.includes("youtu.be") ? (
      <iframe
        width="60%"
        height="400"
        src={craft.tutorialVideo.replace(
          "youtu.be/",
          "www.youtube.com/embed/"
        ).split("?")[0]}
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

  <button
    className="btn-try"
    onClick={() =>
      navigate("/submit-project", { state: { craftId: craft._id } })
    }>
    I Tried This Craft ✨
  </button>

  </div>
  );
}
