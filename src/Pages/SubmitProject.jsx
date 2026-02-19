import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../Services/api";
import "./SubmitProject.css";

function SubmitProject() {
  const navigate = useNavigate();
  const location = useLocation();

  const craftId = location.state?.craftId || "";

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!craftId) {
      setMessage("Invalid craft reference.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("craftId", craftId);
      formData.append("description", description);
      formData.append("images", image);

      await api.post("/submission", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Your project has been sent for approval! 🎉");
      setMessageType("success");

      setTimeout(() => navigate("/crafts"), 2500);
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sp-page">

      <div className="sp-left">
        <div className="sp-left-content">
          <span className="sp-eyebrow">Community</span>
          <h1>Share Your<br /><em>Creation</em></h1>
          <p>
            Show the CraftMate community what you made. Every project
            submitted inspires hundreds of other crafters around the world.
          </p>

          <div className="sp-steps">
            <div className="sp-step">
              <div className="sp-step-dot">1</div>
              <div>
                <strong>Describe your experience</strong>
                <p>Tell us how it went, what you learned, any tips.</p>
              </div>
            </div>
            <div className="sp-step">
              <div className="sp-step-dot">2</div>
              <div>
                <strong>Upload your photo</strong>
                <p>Show off the finished piece — good lighting helps!</p>
              </div>
            </div>
            <div className="sp-step">
              <div className="sp-step-dot">3</div>
              <div>
                <strong>Get featured</strong>
                <p>Approved projects appear in the community gallery.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sp-right">
        <div className="sp-form-card">
          <span className="sp-form-eyebrow">New Submission</span>
          <h2>Your Project</h2>

          {message && (
            <div className={`sp-message sp-message--${messageType}`}>
              <span>{messageType === "success" ? "✦" : "✕"}</span>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="sp-form">

            <div className="sp-field">
              <label className="sp-label">Your Experience</label>
              <textarea
                className="sp-textarea"
                placeholder="Describe what you made, how it went, any tips for others..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={5}
              />
            </div>

            <div className="sp-field">
              <label className="sp-label">Project Photo</label>
              <div
                className={`sp-dropzone ${preview ? 'sp-dropzone--filled' : ''}`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById('sp-file-input').click()}
              >
                {preview ? (
                  <>
                    <img src={preview} alt="Preview" className="sp-preview-img" />
                    <div className="sp-preview-overlay">
                      <span>Click to change</span>
                    </div>
                  </>
                ) : (
                  <div className="sp-dropzone-inner">
                    <div className="sp-upload-icon">◎</div>
                    <p className="sp-drop-title">Drop your photo here</p>
                    <p className="sp-drop-sub">or click to browse</p>
                    <span className="sp-drop-hint">PNG, JPG up to 10MB</span>
                  </div>
                )}
              </div>
              <input
                id="sp-file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                style={{ display: 'none' }}
              />
            </div>

            <button
              type="submit"
              className={`sp-submit ${loading ? 'sp-submit--loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="sp-submit-spinner" />
                  Submitting...
                </>
              ) : (
                "Submit Project ✨"
              )}
            </button>

          </form>
        </div>
      </div>

    </div>
  );
}

export default SubmitProject;