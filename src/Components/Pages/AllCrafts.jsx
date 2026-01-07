import { useEffect, useState } from "react";
import api from "../../Services/api";
import { Link } from "react-router-dom";

export default function AllCrafts() {
  const [crafts, setCrafts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrafts = async () => {
      try {
        const res = await api.get("/crafts");
        setCrafts(res.data);
      } catch (err) {
        console.error("Error fetching crafts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCrafts();
  }, []);

  const filteredCrafts = crafts.filter(craft =>
    craft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    craft.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading crafts...</p>;

  return (
    <div className="all-crafts-page">
      <h2>All Crafts</h2>

      <input
        type="text"
        placeholder="Search crafts..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="search-input"
        style={{ padding: "8px", marginBottom: "20px", width: "100%" }}
      />

      <div
        className="crafts-grid"
        style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
      >
        {filteredCrafts.length === 0 ? (
          <p>No crafts found</p>
        ) : (
          filteredCrafts.map(craft => (
            <div
              key={craft._id}
              className="craft-card"
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                width: "250px",
              }}
            >
              <img
                src={craft.image || "https://via.placeholder.com/150x350"}
                alt={craft.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />

              <h3>{craft.title}</h3>
              <p style={{ fontSize: "14px", color: "#777" }}>
                {craft.category}
              </p>
              <p>{craft.description}</p>
              <p><strong>Price:</strong> ₹{craft.price}</p>

              <div
                style={{
                  marginTop: "12px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Link
                  to={`/crafts/${craft._id}`}
                  style={{
                    padding: "6px 12px",
                    background: "#2196F3",
                    color: "#fff",
                    borderRadius: "4px",
                    textDecoration: "none",
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
