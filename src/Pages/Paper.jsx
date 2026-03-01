import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../Services/api";
import "./Category.css";

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
        setLoading(false);
      }
    };
    fetchPaperCrafts();
  }, []);

  return (
    <div className="cc2-page">

      <div className="cc2-header">
        <h1>Paper <em>Crafts</em></h1>
        <p>
          Explore origami, paper mache, quilling, and more — discover tutorials
          and inspiration to create beautiful paper art.
        </p>
      </div>

      <div className="cc2-body">

        {loading && (
          <div className="cc2-idle">
            <div className="cc2-spinner" />
            <p>Loading paper crafts...</p>
          </div>
        )}

        {!loading && paperCrafts.length === 0 && (
          <div className="cc2-idle">
            <span className="cc2-idle-icon">◈</span>
            <h3>No paper crafts found</h3>
            <p>Check back soon — new crafts are added regularly!</p>
          </div>
        )}

        {!loading && paperCrafts.length > 0 && (
          <>
            <div className="cc2-grid">
              {paperCrafts.map((craft, i) => (
                <div
                  key={craft._id}
                  className="cc2-pin"
                >
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}${craft.image}` || "https://via.placeholder.com/300x200"}
                    alt={craft.title}
                    className="cc2-pin-img"
                  />

                  <div className="cc2-category-badge">Paper</div>

                  <div className="cc2-pin-body">
                    <h4>{craft.title}</h4>
                    <p className="cc2-desc">{craft.description}</p>
                    <div className="cc2-pin-footer">
                      <span className="cc2-price">₹{craft.price}</span>
                      <Link to={`/crafts/${craft._id}`} className="cc2-view-btn">
                        View Details ↗
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Paper;