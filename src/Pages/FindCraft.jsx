import { useState } from "react";
import api from "../Services/api";

export default function FindCraft() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);

      const res = await api.post(
        "/crafts/find-by-image",
        formData
    );


      setResults(res.data.results);
    } catch (err) {
      console.error(err);
      alert("Failed to find crafts");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="findcraft-container">
    <h2 className="findcraft-title">Find Crafts By Materials Image</h2>

    <div className="upload-section">
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleSubmit}>Find Crafts</button>
    </div>

    {loading && <p className="status-text">Searching...</p>}

    {!loading && results.length === 0 && (
      <p className="status-text">No matching crafts found</p>
    )}

    <div className="craft-grid">
      {results.map((craft) => (
        <div key={craft._id} className="craft-card">
            <img
             src={`${import.meta.env.VITE_SERVER_URL}${craft.image}`}
             alt={craft.title}
           />

          <h3>{craft.title}</h3>
          <p>{craft.description}</p>
        </div>
      ))}
    </div>
  </div>
);

  
}
