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
  
  if(loading) return <p> loading home decor crafts...</p>

  return (<>
    <div className="decor-page">
        <h3>Home-Decor</h3>
        <p style={{textAlign: 'justify'}}>Enhance your living space with our creative home decor crafts. From DIY wall art to handmade cushions, 
          find inspiration and step-by-step tutorials to add a personal touch to your home.</p>


       <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {decorCrafts.length === 0 ? (
          <p>No home decor crafts found</p>
        ) : (
          decorCrafts.map(craft => (
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
                src={`${import.meta.env.VITE_SERVER_URL}${craft.image}` || "https://via.placeholder.com/150x350"}
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
    </>
  )
}

export default Homedecor