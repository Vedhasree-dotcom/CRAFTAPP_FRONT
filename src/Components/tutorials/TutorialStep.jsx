import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../tutorials/Tutorial.css";

export default function TutorialStep() {
  const { id } = useParams();
  const [craft, setCraft] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <h1>{craft.title}</h1>
        <p>{craft.description}</p>
      </div>

      <div className="materials-box">
        <h3>Materials Required</h3>
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
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>

            <div className="step-image">
              {step.image && (
                <img
                  src={step.image}
                  alt={step.title}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {craft.tutorialVideo && (
        <div className="video-section">
          <h2>Complete Tutorial Video</h2>
          <video controls>
            <source src={craft.tutorialVideo} type="video/mp4" />
            Your browser does not support video.
          </video>
        </div>
      )}
    </div>
  );
}
