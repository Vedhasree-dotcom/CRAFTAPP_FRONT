import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Services/api";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [activeTab, setActiveTab] = useState("saved");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setUserData(res.data.user);
      setSubmissions(res.data.submissions);
      setPurchases(res.data.purchases);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="pf-loading">
      <div className="pf-spinner" />
      <p>Loading your profile...</p>
    </div>
  );

  if (!userData) return (
    <div className="pf-loading"><p>User not found.</p></div>
  );

  const tabConfig = [
    { key: "saved",       label: "Saved Crafts",     icon: "❋" },
    { key: "submissions", label: "Submissions",       icon: "◈" },
    { key: "purchases",   label: "Purchases",           icon: "🛒" },   
    { key: "about",       label: "About",             icon: "◎" },
  ];

  const totalLikes = submissions.reduce((acc, s) => acc + (s.likes?.length || 0), 0);

  return (
    <div className="pf-page">

      <div className="pf-banner">
        <div className="pf-banner-orb pf-orb-1" />
        <div className="pf-banner-orb pf-orb-2" />
        <div className="pf-banner-orb pf-orb-3" />
      </div>

      <div className="pf-header">

        <div className="pf-avatar-wrap">
          <div className="pf-avatar">
            {userData.name[0].toUpperCase()}
          </div>
          <div className="pf-avatar-ring" />
        </div>

        <div className="pf-identity">
          <span className="pf-eyebrow">CraftMate Creator</span>
          <h1 className="pf-name">{userData.name}</h1>
          <p className="pf-bio">Aspiring craft creator &amp; DIY enthusiast</p>
        </div>

        <div className="pf-header-actions">
          <button
            className="pf-btn-contact"
            onClick={() => navigate("/edit-profile")}>
            Edit Profile
          </button>        
        </div>

      </div>

      <div className="pf-stats">
        <div className="pf-stat">
          <span className="pf-stat-num">{userData.savedCrafts.length}</span>
          <span className="pf-stat-label">Saved</span>
        </div>
        <div className="pf-stat-divider" />
        <div className="pf-stat">
          <span className="pf-stat-num">{submissions.length}</span>
          <span className="pf-stat-label">Submissions</span>
        </div>
        <div className="pf-stat-divider" />
        <div className="pf-stat">
          <span className="pf-stat-num">{totalLikes}</span>
          <span className="pf-stat-label">Likes</span>
        </div>
      </div>

      <div className="pf-tabs">
        {tabConfig.map((t) => (
          <button
            key={t.key}
            className={`pf-tab ${activeTab === t.key ? "pf-tab--active" : ""}`}
            onClick={() => setActiveTab(t.key)}
          >
            <span className="pf-tab-icon">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </div>

      <div className="pf-content">

        {activeTab === "saved" && (
          <>
            {userData.savedCrafts.length === 0 ? (
              <div className="pf-empty">
                <span className="pf-empty-icon">🧺</span>
                <h3>No saved crafts yet</h3>
                <p>Start exploring and save crafts you love.</p>
                <Link to="/crafts" className="pf-empty-btn">Explore Crafts</Link>
              </div>
            ) : (
              <div className="pf-grid">
                {userData.savedCrafts.map((craft, i) => (
                  <Link
                    to={`/crafts/${craft._id}`}
                    key={craft._id}
                    className={`pf-pin ${i % 4 === 0 ? 'pf-pin--tall' : ''}`}
                  >
                    <button className="pf-save-btn" onClick={e => e.preventDefault()}>Saved ❤️</button>
                    <img
                      src={
                        craft.image
                          ? craft.image.startsWith("http")
                            ? craft.image
                            : `${import.meta.env.VITE_SERVER_URL}${craft.image}`
                          : "https://via.placeholder.com/300x200"
                      }
                      alt={craft.title}
                      className="pf-pin-img"
                    />
                    <div className="pf-pin-body">
                      <h4>{craft.title}</h4>
                      <div className="pf-pin-footer">
                        <span className="pf-price">₹{craft.price}</span>
                        <span className="pf-arrow">↗</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "submissions" && (
          <>
            {submissions.length === 0 ? (
              <div className="pf-empty">
                <span className="pf-empty-icon">📤</span>
                <h3>No submissions yet</h3>
                <p>Try a craft and share your creation with the community.</p>
                <Link to="/crafts" className="pf-empty-btn">Browse Crafts</Link>
              </div>
            ) : (
              <div className="pf-grid">
                {submissions.map((sub, i) => (
                  <div
                    key={sub._id}
                    className={`pf-pin pf-pin--sub ${i % 5 === 0 ? 'pf-pin--tall' : ''}`}
                  >
                   <img
                      src={
                        sub.images && sub.images.length > 0
                          ? sub.images[0].startsWith("http")
                            ? sub.images[0]
                            : `${import.meta.env.VITE_SERVER_URL}${sub.images[0]}`
                          : "https://via.placeholder.com/300x200"
                      }
                      alt="submission"
                      className="pf-pin-img"
                    />
                    <div className={`pf-status-badge pf-status--${sub.status}`}>
                      {sub.status}
                    </div>
                    <div className="pf-pin-body">
                      <h4>{sub.craftId?.title || "Untitled Craft"}</h4>
                      <p className="pf-sub-desc">{sub.description}</p>
                      <div className="pf-pin-footer">
                        <span className="pf-likes">♥ {sub.likes?.length || 0} likes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "purchases" && (
          <>
            {purchases.length === 0 ? (
              <div className="pf-empty">
                <span className="pf-empty-icon">🛍️</span>
                <h3>No purchases yet</h3>
                <p>Buy a craft tutorial to see it here.</p>
                <Link to="/crafts" className="pf-empty-btn">Browse Crafts</Link>
              </div>
            ) : (
              <div className="pf-grid">
                {purchases.map((p, i) => (
                  <Link
                    to={`/crafts/${p.craftId?._id}`}
                    key={p._id}
                    className={`pf-pin ${i % 4 === 0 ? "pf-pin--tall" : ""}`}
                  >
                    <img
                      src={
                        p.craftId?.image
                          ? p.craftId.image.startsWith("http")
                            ? p.craftId.image
                            : `${import.meta.env.VITE_SERVER_URL}${p.craftId.image}`
                          : "https://via.placeholder.com/300x200"
                      }
                      alt={p.craftId?.title}
                      className="pf-pin-img"
                    />

                    <div className="pf-pin-body">
                      <h4>{p.craftId?.title}</h4>

                      <div className="pf-pin-footer">
                        <span className="pf-price">₹{p.amount}</span>
                        <span className="pf-arrow">↗</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "about" && (
          <div className="pf-about">
            <div className="pf-about-card">
              <span className="pf-about-eyebrow">Profile Info</span>
              <h3>About <em>{userData.name}</em></h3>
              <div className="pf-about-rows">
                <div className="pf-about-row">
                  <div className="pf-about-icon">◎</div>
                  <div>
                    <p className="pf-about-row-label">Full Name</p>
                    <p className="pf-about-row-value">{userData.name}</p>
                  </div>
                </div>
                <div className="pf-about-row">
                  <div className="pf-about-icon">✉</div>
                  <div>
                    <p className="pf-about-row-label">Email</p>
                    <p className="pf-about-row-value">{userData.email}</p>
                  </div>
                </div>
                {userData.phone && (
                  <div className="pf-about-row">
                    <div className="pf-about-icon">◈</div>
                    <div>
                      <p className="pf-about-row-label">Phone</p>
                      <p className="pf-about-row-value">{userData.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pf-about-stats">
              <span className="pf-about-eyebrow">Activity</span>
              <div className="pf-about-stat-grid">
                <div className="pf-about-stat">
                  <span>{userData.savedCrafts.length}</span>
                  <p>Crafts Saved</p>
                </div>
                <div className="pf-about-stat">
                  <span>{submissions.length}</span>
                  <p>Projects Shared</p>
                </div>
                <div className="pf-about-stat">
                  <span>{purchases.length}</span>
                  <p>Crafts Purchased</p>
                </div>
                <div className="pf-about-stat">
                  <span>{totalLikes}</span>
                  <p>Total Likes</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;