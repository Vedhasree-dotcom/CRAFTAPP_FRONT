import { useEffect, useState } from "react";
import api from "../Services/api";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState("saved");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/user/profile");
      setUserData(res.data.user);
      setSubmissions(res.data.submissions);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="loading-text">Loading profile...</p>;
  if (!userData) return <p>User not found</p>;

  const tabConfig = [
    { key: "saved",       label: "Saved Crafts"    },
    { key: "submissions", label: "Your Submissions" },
    { key: "about",       label: "About"            },
  ];

  return (
    <div className="profile-root">

      <div className="profile-banner">
        <div className="banner-blur-orb one" />
        <div className="banner-blur-orb two" />
        <div className="banner-blur-orb three" />
      </div>

      <div className="profile-body">

        <div className="profile-meta-row">
          <div className="profile-left">

            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                {userData.name[0].toUpperCase()}
              </div>
              <div className="avatar-online" />
            </div>

            <div className="profile-name-block">
              <div className="profile-name">
                {userData.name}
              </div>
              <div className="profile-bio">Aspiring craft creator</div>
            </div>
          </div>

          <div className="profile-actions">
            {/* <button className="btn btn-primary">Follow</button> */}
            <button className="btn btn-secondary">Get in touch</button>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-value">{userData.savedCrafts.length}</div>
            <div className="stat-label">Saved</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{submissions.length}</div>
            <div className="stat-label">Submissions</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">
              {submissions.reduce((acc, s) => acc + (s.likes?.length || 0), 0)}
            </div>
            <div className="stat-label">Likes</div>
          </div>
        </div>

        <div className="profile-tabs">
          {tabConfig.map((t) => (
            <button
              key={t.key}
              className={`tab-btn ${activeTab === t.key ? "active" : ""}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "saved" && (
          <div className="craft-grid">
            {userData.savedCrafts.length === 0 && (
              <div className="placeholder-card">
                <div className="icon">🧺</div>
                <p>No saved crafts yet.</p>
              </div>
            )}
            {userData.savedCrafts.map((craft) => (
              <div className="craft-card" key={craft._id}>
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}${craft.image}`}
                  alt={craft.title}
                />
                <div className="card-overlay">
                  <h4>{craft.title}</h4>
                  <span>₹ {craft.price}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="craft-grid">
            {submissions.length === 0 && (
              <div className="placeholder-card">
                <div className="icon">📤</div>
                <p>No submissions yet.</p>
              </div>
            )}
            {submissions.map((sub) => (
              <div className="craft-card" key={sub._id}>
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}${sub.images[0]}`}
                  alt="submission"
                />
                <div className="card-overlay">
                  <p>Craft: {sub.craftId?.title || "Unknown"} | Likes: {sub.likes?.length || 0}</p>
                  <p>{sub.description}</p>
                  <span className={`status ${sub.status}`}>{sub.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "about" && (
          <div className="about-panel">
            <div className="about-card">
              <h3>Bio</h3>
              <div className="about-row">
                <span className="about-icon">📧</span>
                <span>{userData.email}</span><br/>
                <span>📞 {userData.phone}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Profile;