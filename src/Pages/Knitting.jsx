import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from "../Services/api";
import "./Category.css";

function Knitting() {
  const [knittingCrafts, setKnittingCrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKnittingCrafts = async () => {
      try {
        const res = await api.get("/crafts/category/knitting");
        setKnittingCrafts(res.data);
      } catch (error) {
        console.log("Error fetching knitting crafts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKnittingCrafts();
  }, []);

  return (
    <div className="cc2-page">
      <div className="cc2-header">
        <h1>Knitting <em>Crafts</em></h1>
        <p>
          Discover cozy scarves, intricate sweaters and more — find patterns,
          tips and inspiration to create your own handmade knitwear.
        </p>
      </div>

      <div className="cc2-body">

        {loading && (
          <div className="cc2-idle">
            <div className="cc2-spinner" />
            <p>Loading knitting crafts...</p>
          </div>
        )}

        {!loading && knittingCrafts.length === 0 && (
          <div className="cc2-idle">
            <span className="cc2-idle-icon">◈</span>
            <h3>No knitting crafts found</h3>
            <p>Check back soon — new crafts are added regularly!</p>
          </div>
        )}

        {!loading && knittingCrafts.length > 0 && (
          <div className="cc2-grid">
            {knittingCrafts.map((craft) => (
              <div key={craft._id} className="cc2-pin">
                <img
                  src={
                    craft.image
                      ? craft.image.startsWith("http")
                        ? craft.image
                        : `${import.meta.env.VITE_SERVER_URL}${craft.image}`
                      : "https://via.placeholder.com/300x200"
                  }
                  alt={craft.title}
                  className="cc2-pin-img"
                />
                <div className="cc2-category-badge">Knitting</div>
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

export default Knitting;