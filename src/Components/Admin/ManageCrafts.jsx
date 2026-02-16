import { useEffect, useState } from "react";
import axios from "axios";
import CraftForm from "./CraftForm";

export default function ManageCrafts() {
  const [crafts, setCrafts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCraft, setEditingCraft] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCrafts();
  }, []);

  const fetchCrafts = async () => {
    try {
      const res = await axios.get("/api/crafts");
      setCrafts(Array.isArray(res.data) ? res.data : res.data.crafts);
    } catch (err) {
      console.error("Error fetching crafts", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/crafts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCrafts();
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  const handleEdit = (craft) => {
    setEditingCraft(craft);
    setShowForm(true);
  };

  return (
    <div className="manage-crafts">
      <div className="top-bar">
        <h2>Manage Crafts</h2>
        <button
          onClick={() => {
            setEditingCraft(null);
            setShowForm(true);
          }}
        >
          + Add Craft
        </button>
      </div>

      {showForm && (
        <CraftForm
          editingCraft={editingCraft}
          closeForm={() => setShowForm(false)}
          refresh={fetchCrafts}
        />
      )}

      <div className="craft-grid">
        {crafts.length === 0 ? (
          <p>No crafts found</p>
        ) : (
          crafts.map((craft) => (
            <div key={craft._id} className="craft-card">
              <img src={craft.image} alt={craft.title} />
              <h3>{craft.title}</h3>
              <p>{craft.category}</p>

              <div className="actions">
                <button onClick={() => handleEdit(craft)}>Edit</button>
                <button onClick={() => handleDelete(craft._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
