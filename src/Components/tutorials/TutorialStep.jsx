import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Services/api";
import "./Tutorial.css";

export default function TutorialStep() {
  const { id } = useParams();
  const [craft, setCraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCraft = async () => {
      try {
      const res = await api.get(`/crafts/${id}`);
      setCraft(res.data);
      } catch (err) {
        console.error("Failed to load craft", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCraft();
  }, [id]);

  if (loading) return (
    <div className="tut-loading">
      <div className="tut-spinner" />
      <p>Loading tutorial...</p>
    </div>
  );

  if (!craft) return (
    <div className="tut-loading">
      <p>Craft not found.</p>
    </div>
  );

  return (
    <div className="tut-page">

      <div className="tut-hero">
        <div className="tut-hero-text">
          <span className="tut-eyebrow">Step-by-Step Tutorial</span>
          <h1>{craft.title}</h1>
          <p>{craft.description}</p>
        </div>
        <div className="tut-hero-meta">
          <div className="tut-meta-pill">
            <span>◎</span>
            <p>{craft.tutorialSteps?.length || 0} Steps</p>
          </div>
          <div className="tut-meta-pill">
            <span>❋</span>
            <p>{craft.materials?.length || 0} Materials</p>
          </div>
          <div className="tut-meta-pill">
            <span>✦</span>
            <p>HD Tutorial</p>
          </div>
        </div>
      </div>

      <div className="tut-body">

        <aside className="tut-sidebar">
          <p className="tut-sidebar-label">Progress</p>
          <ul className="tut-progress-list">
            {craft.tutorialSteps.map((step, i) => (
              <li
                key={step.stepNumber}
                className={`tut-progress-item ${i === activeStep ? 'tut-progress-item--active' : ''} ${i < activeStep ? 'tut-progress-item--done' : ''}`}
                onClick={() => setActiveStep(i)}
              >
                <div className="tut-progress-dot">
                  {i < activeStep ? '✓' : step.stepNumber}
                </div>
                <span>{step.title}</span>
              </li>
            ))}
          </ul>

          <div className="tut-sidebar-materials">
            <p className="tut-sidebar-label" style={{ marginTop: '28px' }}>Materials</p>
            <ul className="tut-mat-list">
              {craft.materials.map((mat, i) => (
                <li key={i}>
                  <span className="tut-mat-dot">◎</span>
                  {mat}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="tut-main">

          <div className="tut-steps">
            {craft.tutorialSteps.map((step, i) => (
              <div
                key={step.stepNumber}
                id={`step-${i}`}
                className={`tut-step-card ${i === activeStep ? 'tut-step-card--active' : ''}`}
                onClick={() => setActiveStep(i)}
              >
                <div className="tut-step-left">
                  <div className="tut-step-num-wrap">
                    <span className="tut-step-num">{step.stepNumber}</span>
                  </div>
                  <div className="tut-step-connector" />
                </div>

                <div className="tut-step-content">
                  <div className="tut-step-body">
                    <div className="tut-step-text">
                      <span className="tut-step-label">Step {step.stepNumber}</span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                    {step.image && (
                      <div className="tut-step-img-wrap">
                        <img
                          src={`${import.meta.env.VITE_SERVER_URL}${step.image}`}
                          alt={step.title}
                          className="tut-step-img"
                        />
                      </div>
                    )}
                  </div>

                  <div className="tut-step-nav">
                    {i > 0 && (
                      <button className="tut-nav-btn tut-nav-btn--ghost" onClick={e => { e.stopPropagation(); setActiveStep(i - 1); }}>
                        ← Prev
                      </button>
                    )}
                    {i < craft.tutorialSteps.length - 1 && (
                      <button className="tut-nav-btn" onClick={e => { e.stopPropagation(); setActiveStep(i + 1); }}>
                        Next Step →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {craft.tutorialVideo && (
            <div className="tut-video-section">
              <span className="tut-eyebrow">Watch &amp; Learn</span>
              <h2>Complete Tutorial <em>Video</em></h2>
              <div className="tut-video-wrap">
                {craft.tutorialVideo.includes("youtube") || craft.tutorialVideo.includes("youtu.be") ? (
                  <iframe
                    src={craft.tutorialVideo.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0]}
                    title="YouTube tutorial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video controls>
                    <source src={craft.tutorialVideo} type="video/mp4" />
                    Your browser does not support video.
                  </video>
                )}
              </div>
            </div>
          )}

          <div className="tut-cta">
            <div className="tut-cta-text">
              <h2>Ready to show your work?</h2>
              <p>Share your creation with the CraftMate community.</p>
            </div>
            <button
              className="tut-cta-btn"
              onClick={() => navigate("/submit-project", { state: { craftId: craft._id } })}
            >
              I Tried This Craft ✨
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}