import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Services/api";
import "./CraftDetails.css";
import { toggleSaveCraft } from "../Services/projectService";

function CraftDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [craft, setCraft] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get(`/crafts/${id}`)
      .then(res => setCraft(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!craft) return (
    <div className="cd-loading">
      <div className="cd-spinner" />
      <p>Loading craft...</p>
    </div>
  );

  const handleTutorialClick = async () => {
  try {
    const res = await api.get(`/payments/check-purchase/${id}`);

    if (res.data.purchased) {
      navigate(`/crafts/${id}/tutorial`);  
    } else {
      navigate(`/payment/${id}`);
    }
  } catch (err) {
    console.error(err);
  }
};

  const handleSave = async () => {
    try {
      await toggleSaveCraft(craft._id);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cd-page">

      <div className="cd-breadcrumb">
        <span onClick={() => navigate('/crafts')} className="cd-bread-link">Crafts</span>
        <span className="cd-bread-sep">›</span>
        <span className="cd-bread-link" onClick={() => navigate(-1)}>{craft.category}</span>
        <span className="cd-bread-sep">›</span>
        <span className="cd-bread-current">{craft.title}</span>
      </div>

      <div className="cd-layout">

        <div className="cd-image-col">
          <div className="cd-image-wrap">
            <img
              src={`${import.meta.env.VITE_SERVER_URL}${craft.image}` || "https://images.pexels.com/photos/7606010/pexels-photo-7606010.jpeg"}
              alt={craft.title}
              className="cd-image"
            />
           
          </div>

          <div className="cd-image-caption">
            <span className="cd-caption-dot" />
            Handcrafted &amp; curated by CraftMate
          </div>
        </div>

        <div className="cd-info-col">

          <span className="cd-category">{craft.category}</span>
          <h1 className="cd-title">{craft.title}</h1>

          <div className="cd-rule" />

          <p className="cd-description">{craft.description}</p>

          <div className="cd-price-row">
            <div className="cd-price-block">
              <span className="cd-price-label">Purchase Price</span>
              <span className="cd-price">₹{craft.price}</span>
            </div>
            <div className="cd-price-tag">
              <span>✦ Full tutorial included</span>
            </div>
          </div>

          <div className="cd-materials">
            <h4>Materials Used</h4>
            <ul className="cd-materials-list">
              {craft.materials.slice(0, 3).map((item, index) => (
                <li key={index}>
                  <span className="cd-mat-dot">◎</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="cd-locked">
              <span className="cd-lock-icon">🔒</span>
              <p>Full materials list &amp; step-by-step tutorial unlocked after purchase</p>
            </div>
          </div>

          <div className="cd-actions">
            <button
              className={`cd-btn-save ${saved ? 'cd-btn-save--saved' : ''}`}
              onClick={handleSave}
            >
              {saved ? '❤️ Saved!' : '♡ Save Craft'}
            </button>
            <button className="cd-btn-tutorial" onClick={handleTutorialClick}>
              View Tutorial 🔒
            </button>
          </div>

          <div className="cd-trust">
            <div className="cd-trust-item">
              <span>✦</span>
              <p>Instant Access</p>
            </div>
            <div className="cd-trust-item">
              <span>◈</span>
              <p>Beginner Friendly</p>
            </div>
            <div className="cd-trust-item">
              <span>❋</span>
              <p>HD Tutorial</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CraftDetails;