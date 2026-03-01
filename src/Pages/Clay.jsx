import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../Services/api";
import "./Category.css";

function Clay() {
  const [clayCrafts, setClayCrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClayCrafts = async () => {
      try {
        const res = await api.get("/crafts/category/clay");
        setClayCrafts(res.data);
      } catch (error) {
        console.log("Error fetching clay crafts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClayCrafts();
  }, []);

  return (
    <div className="cc2-page">
      <div className="cc2-header">
        <h1>Clay <em>Crafts</em></h1>
        <p>
            Discover the art of clay crafting — find tutorials, tips and inspiration to create beautiful pottery, sculptures and more using various clay techniques.
        </p>
      </div>

      <div className="cc2-body">

        {loading && (
          <div className="cc2-idle">
            <div className="cc2-spinner" />
            <p>Loading clay crafts...</p>
          </div>
        )}

        {!loading && clayCrafts.length === 0 && (
          <div className="cc2-idle">
            <span className="cc2-idle-icon">◈</span>
            <h3>No clay crafts found</h3>
            <p>Check back soon — new crafts are added regularly!</p>
          </div>
        )}

        {!loading && clayCrafts.length > 0 && (
          <div className="cc2-grid">
            {clayCrafts.map((craft) => (
              <div key={craft._id} className="cc2-pin">
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}${craft.image}` || "https://via.placeholder.com/300x200"}
                  alt={craft.title}
                  className="cc2-pin-img"
                />
                <div className="cc2-category-badge">Clay</div>
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

export default Clay;