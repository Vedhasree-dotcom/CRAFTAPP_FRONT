import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../Services/api";
import "../Pages/CraftDetails.css";

function CraftDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [craft, setCraft] = useState(null);

  useEffect(() => {
    api.get(`/crafts/${id}`)
      .then(res => setCraft(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!craft) return <p className="loading">Loading...</p>;

  const handleTutorialClick = () => {
    navigate(`/crafts/${craft._id}/tutorial`);               // /payment/${craft._id}
  };

  return (
    <div className="craft-details-page">
      <div className="craft-card">

        <div className="craft-image">
          <img   
          src={`${import.meta.env.VITE_SERVER_URL}${craft.image}` || "https://via.placeholder.com/150x350"}
          alt={craft.title} />
        </div>

        <div className="craft-info">
          <span className="craft-category">{craft.category}</span>

          <h2 className="craft-title">{craft.title}</h2>
          <p className="craft-description">{craft.description}</p>

          <p className="craft-price">₹ {craft.price}</p>

          <div className="craft-materials">
            <h4>Materials Used</h4>
            <ul>
              {craft.materials.slice(0, 3).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <span className="locked-text">
              🔒 Full materials & tutorial available after purchase
            </span>
          </div>

          <div className="craft-actions">
            <button className="btn-save">Save craft</button>
            <button className="btn-tutorial" onClick={handleTutorialClick}>
              View Tutorial 🔒
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CraftDetails;
