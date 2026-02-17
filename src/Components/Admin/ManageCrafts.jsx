import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/api";
import "./style.css";

export default function ManageCrafts() {
  const [crafts, setCrafts] = useState([]);
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
    }
  };

  return (
    <div className="manage-crafts">
      <div className="top-bar">
        <h2>Manage Crafts</h2>

        <button onClick={() => navigate("/admin/add-craft")}>
          + Add Craft
        </button>
      </div>

      <div className="craft-grid">
        {crafts.length === 0 ? (
          <p>No crafts found</p>
        ) : (
          crafts.map((craft) => (
            <div
              key={craft._id}
              className="craft-card"
              onClick={() => navigate(`/admin/crafts/${craft._id}`)}
            >
              <img
                src={`http://localhost:5000${craft.image}`}
                alt={craft.title}
              />
              <h3>{craft.title}</h3>
              <p>{craft.category}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
