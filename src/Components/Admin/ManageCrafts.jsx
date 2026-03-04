import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import "./style.css";

export default function ManageCrafts() {
  const [crafts, setCrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCrafts();
  }, []);

  const fetchCrafts = async () => {
    try {
      const res = await api.get("/crafts");
      setCrafts(res.data ?? []);
    } catch (err) {
      console.error("Error fetching crafts", err);
      setCrafts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mc-page">

      <div className="mc-header">
        <div>
          <span className="mc-eyebrow">Admin Panel</span>
          <h1>Manage <em>Crafts</em></h1>
        </div>
        <button className="mc-add-btn" onClick={() => navigate("/admin/add-craft")}>
          + Add Craft
        </button>
      </div>

      {loading && (
        <div className="mc-idle">
          <div className="mc-spinner" />
          <p>Loading crafts...</p>
        </div>
      )}

      {!loading && crafts.length === 0 && (
        <div className="mc-idle">
          <span className="mc-idle-icon">✦</span>
          <h3>No crafts found</h3>
          <p>Add your first craft to get started.</p>
          <button className="mc-add-btn" onClick={() => navigate("/admin/add-craft")}>
            + Add Craft
          </button>
        </div>
      )}

      {!loading && crafts.length > 0 && (
        <div className="mc-grid">
          {crafts.map((craft) => (
            <div
              key={craft._id}
              className="mc-card"
              onClick={() => navigate(`/admin/crafts/${craft._id}`)}
            >
              <div className="mc-card-img-wrap">
                <img
                  src={
                    craft.image?.startsWith("http")
                      ? craft.image
                      : `${import.meta.env.VITE_SERVER_URL}${craft.image}`
                  }
                  alt={craft.title}
                  className="mc-card-img"
                />
                <div className="mc-card-overlay">
                  <span>Edit ↗</span>
                </div>
              </div>
              <div className="mc-card-body">
                <span className="mc-category-badge">{craft.category}</span>
                <h3>{craft.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}