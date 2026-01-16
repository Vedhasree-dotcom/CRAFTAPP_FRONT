import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../Services/api";   // adjust path if needed

function Paper() {
  const [paperCrafts, setPaperCrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaperCrafts = async () => {
      try {
        const res = await api.get("/crafts/category/paper");
        setPaperCrafts(res.data);
      } catch (error) {
        console.error("Error fetching paper crafts:", error);
      } finally {
        setLoading(false);      // Ensure loading is set to false after fetch attempt
      }
    };

    fetchPaperCrafts();
  }, []);

  if (loading) return <p>Loading paper crafts...</p>;

  return (
    <div className="paper-page">
      <h3>Paper Crafts</h3>

      <p style={{ textAlign: "justify" }}>
        Explore a variety of paper crafts including origami, paper mache,
        quilling, and more. Discover tutorials, tips, and inspiration to create
        beautiful paper art.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {paperCrafts.length === 0 ? (
          <p>No paper crafts found</p>
        ) : (
          paperCrafts.map(craft => (
            <div
              key={craft._id}
              style={{
                width: "250px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={craft.image}
                alt={craft.title}
                style={{
                  width: "100%",
                  height: "160px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <h4 style={{fontSize: "18px", marginTop: "15px"}}>{craft.title}</h4>
              <p style={{ fontSize: "14px" }}>{craft.description}</p>
              <p style={{ color: "red" }}><strong>Purchase:</strong> ₹{craft.price}</p>

              <Link
                to={`/crafts/${craft._id}`}
                style={{
                  background: "brown",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  textDecoration: "none",
                  fontSize: "14px",
                  marginBottom: "20px",
                }}
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Paper;
