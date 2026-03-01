import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../Services/api";
import "./Category.css";

function Painting() {
  const [paintingCrafts, setPaintingCrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaintingCrafts = async () => {
      try {
        const res = await api.get("/crafts/category/painting");
        setPaintingCrafts(res.data);
      } catch (error) {
        console.log("Error fetching painting crafts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaintingCrafts();
  }, []);

  return (
    <div className="cc2-page">
      <div className="cc2-header">
        <h1>Painting <em>Crafts</em></h1>
        <p>
            Unleash your creativity with painting crafts — find tutorials, tips and inspiration to create beautiful artwork using various painting techniques and styles.
        </p>
      </div>

      <div className="cc2-body">

        {loading && (
          <div className="cc2-idle">
            <div className="cc2-spinner" />
            <p>Loading painting crafts...</p>
          </div>
        )}

        {!loading && paintingCrafts.length === 0 && (
          <div className="cc2-idle">
            <span className="cc2-idle-icon">◈</span>
            <h3>No painting crafts found</h3>
            <p>Check back soon — new crafts are added regularly!</p>
          </div>
        )}

        {!loading && paintingCrafts.length > 0 && (
          <div className="cc2-grid">
            {paintingCrafts.map((craft) => (
              <div key={craft._id} className="cc2-pin">
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}${craft.image}` || "https://via.placeholder.com/300x200"}
                  alt={craft.title}
                  className="cc2-pin-img"
                />
                <div className="cc2-category-badge">Painting</div>
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
        )}

      </div>
    </div>
  );
}

export default Painting;