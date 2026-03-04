import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../Services/api";


function Homedecor() {
    
  const [decorCrafts, setDecorCrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecorCrafts = async () => {
      try {
        const res = await api.get("/crafts/category/home-decor");
        setDecorCrafts(res.data);    
      }
      catch (error) {
        console.log("Error fetching home decor crafts", error);
      }
      finally {
        setLoading(false)
      }
    }
    fetchDecorCrafts();
  },[]);
  

  return (<>
      <div className="cc2-page">

      <div className="cc2-header">
        <h1>Home decor <em>Crafts</em></h1>
        <p>
          Enhance your living space with DIY home decor crafts — find ideas, tutorials and inspiration to create personalized decor 
          pieces that reflect your style.
        </p>
      </div>

      <div className="cc2-body">

        {loading && (
          <div className="cc2-idle">
            <div className="cc2-spinner" />
            <p>Loading home decor crafts...</p>
          </div>
        )}

        {!loading && decorCrafts.length === 0 && (
          <div className="cc2-idle">
            <span className="cc2-idle-icon">◈</span>
            <h3>No home decor crafts found</h3>
            <p>Check back soon — new crafts are added regularly!</p>
          </div>
        )}

        {!loading && decorCrafts.length > 0 && (
          <>
            <div className="cc2-grid">
              {decorCrafts.map((craft, i) => (
                <div
                  key={craft._id}
                  className="cc2-pin"
                >
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
                  <div className="cc2-category-badge">Home Decor</div>

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
    
    </>
  )
}

export default Homedecor



