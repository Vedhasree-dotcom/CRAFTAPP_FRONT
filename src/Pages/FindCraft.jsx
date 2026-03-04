import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../Services/api";

export default function FindCraft() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResults([]);
      setSearched(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResults([]);
      setSearched(false);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      setSearched(false);
      const res = await api.post("/crafts/find-by-image", formData);
      setResults(res.data.results);
      setSearched(true);
    } catch (err) {
      console.error(err);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setImage(null);
    setPreview(null);
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="fc-page">

      <div className="fc-hero">
        <div className="fc-hero-inner">
          <span className="fc-eyebrow">AI-Powered Discovery</span>
          <h1>Find Crafts by<br /><em>Materials Image</em></h1>
          <p>Upload a photo of your materials and we'll match it to the perfect craft projects for you.</p>
        </div>
      </div>

      <div className="fc-body">

        <div className="fc-upload-panel">

          <div className="fc-upload-header">
            <span className="fc-section-eyebrow">Upload Image</span>
            <h2>Your Materials</h2>
          </div>

          <div
            className={`fc-dropzone ${preview ? 'fc-dropzone--filled' : ''}`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('fc-file-input').click()}
          >
            {preview ? (
              <>
                <img src={preview} alt="Uploaded materials" className="fc-preview-img" />
                <div className="fc-preview-overlay">
                  <span>Click to change image</span>
                </div>
              </>
            ) : (
              <div className="fc-dropzone-inner">
                <div className="fc-upload-icon">◎</div>
                <p className="fc-drop-title">Drop your materials photo</p>
                <p className="fc-drop-sub">or click to browse</p>
                <span className="fc-drop-hint">PNG, JPG up to 10MB <br/>
                 File name must include: paint, clay, paper, glue, knitting, home-decor..
                </span>
              </div>
            )}
          </div>

          <input
            id="fc-file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />

          {image && (
            <div className="fc-file-info">
              <span className="fc-file-dot">◎</span>
              <span className="fc-file-name">{image.name}</span>
              <button className="fc-file-clear" onClick={handleClear}>✕</button>
            </div>
          )}

          <div className="fc-actions">
            <button
              className={`fc-btn-search ${!image || loading ? 'fc-btn-search--disabled' : ''}`}
              onClick={handleSubmit}
              disabled={!image || loading}
            >
              {loading ? (
                <>
                  <span className="fc-spinner" />
                  Searching...
                </>
              ) : (
                "Find Crafts ✦"
              )}
            </button>
            {(preview || results.length > 0) && (
              <button className="fc-btn-clear" onClick={handleClear}>
                Clear
              </button>
            )}
          </div>

          <div className="fc-how">
            <p className="fc-how-title">How it works</p>
            <div className="fc-how-steps">
              <div className="fc-how-step">
                <span>1</span>
                <p>Upload a photo of your craft materials</p>
              </div>
              <div className="fc-how-step">
                <span>2</span>
                <p>Our AI scans and identifies what you have</p>
              </div>
              <div className="fc-how-step">
                <span>3</span>
                <p>Get matched craft projects instantly</p>
              </div>
            </div>
          </div>

        </div>

        <div className="fc-results-panel">

          {!searched && !loading && (
            <div className="fc-idle">
              <div className="fc-idle-icon">✦</div>
              <h3>Ready to discover?</h3>
              <p>Upload a photo of your materials on the left and hit <strong>Find Crafts</strong> to get started.</p>
            </div>
          )}

          {loading && (
            <div className="fc-idle">
              <div className="fc-searching-anim">
                <div className="fc-ring fc-ring-1" />
                <div className="fc-ring fc-ring-2" />
                <div className="fc-ring fc-ring-3" />
                <span className="fc-searching-icon">◎</span>
              </div>
              <h3>Searching crafts...</h3>
              <p>Our AI is analysing your materials image.</p>
            </div>
          )}

          {searched && !loading && results.length === 0 && (
            <div className="fc-idle">
              <div className="fc-idle-icon">◈</div>
              <h3>No matches found</h3>
              <p>Try uploading a clearer photo, or one with more materials visible.</p>
              <button className="fc-idle-btn" onClick={handleClear}>Try Again</button>
            </div>
          )}

          {searched && !loading && results.length > 0 && (
            <>
              <div className="fc-results-header">
                <span className="fc-section-eyebrow">Matched Results</span>
                <h2>{results.length} Craft{results.length !== 1 ? 's' : ''} Found</h2>
              </div>
              <div className="fc-grid">
                {results.map((craft, i) => (
                  <Link
                    to={`/crafts/${craft._id}`}
                    key={craft._id}
                    className={`fc-pin ${i % 3 === 0 ? 'fc-pin--tall' : ''}`}
                  >
                    <button className="fc-save" onClick={e => e.preventDefault()}>Save</button>
                    <img
                      src={
                        craft.image?.startsWith("http")
                          ? craft.image
                          : `${import.meta.env.VITE_SERVER_URL}${craft.image}`
                      }
                      alt={craft.title}
                      className="fc-pin-img"
                    />
                    <div className="fc-pin-body">
                      <h3>{craft.title}</h3>
                      <p>{craft.description}</p>
                      <div className="fc-pin-footer">
                        <span className="fc-match-badge">✦ Match</span>
                        <span className="fc-arrow">↗</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}