import { useEffect, useState } from "react";
import api from "../Services/api"; // your axios instance
import { Link } from "react-router-dom";

export default function AllCrafts() {
  const [crafts, setCrafts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrafts = async () => {
      try {
        const res = await api.get("/crafts"); // fetch all crafts
        setCrafts(res.data);
      } catch (err) {
        console.error("Error fetching crafts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCrafts();
  }, []);

  // Filter crafts based on search
  const filteredCrafts = crafts.filter(craft =>
    craft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    craft.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading crafts...</p>;

  return (
    <div className="all-crafts-page">
      <h2>All Crafts</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search crafts..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
        style={{ padding: "8px", marginBottom: "20px", width: "100%" }}
      />

      <div className="crafts-grid" style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredCrafts.length === 0 ? (
          <p>No crafts found</p>
        ) : (
          filteredCrafts.map(craft => (
            <div key={craft._id} className="craft-card" style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "15px", width: "250px" }}>
              <h3>{craft.title}</h3>
              <p><strong>Category:</strong> {craft.category}</p>
              <p>{craft.description}</p>

              <h4>Materials:</h4>
              <ul>
                {craft.materials.map((mat, idx) => (
                  <li key={idx}>{mat}</li>
                ))}
              </ul>

              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                {/* Watch tutorial button */}
                <a
                  href={craft.tutorialVideo || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ padding: "6px 12px", background: "#4CAF50", color: "#fff", borderRadius: "4px", textDecoration: "none" }}
                >
                  Watch Tutorial
                </a>

                {/* Optional: Visit craft page */}
                <Link
                  to={`/crafts/${craft._id}`}
                  style={{ padding: "6px 12px", background: "#2196F3", color: "#fff", borderRadius: "4px", textDecoration: "none" }}
                >
                  Visit Now
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
