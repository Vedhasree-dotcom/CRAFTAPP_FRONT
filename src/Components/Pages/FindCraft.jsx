import { useState } from "react";

export default function FindCraft() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [crafts, setCrafts] = useState([]);
  const [loading, setLoading] = useState(false);

  const materialOptions = [
    "paper",
    "cardboard",
    "plastic bottle",
    "cloth",
    "paint",
    "clay",
    "wool",
    "glue",
    "scissors",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const toggleMaterial = (material) => {
    setMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  };

  const handleFindCrafts = async () => {
    if (materials.length === 0) {
      alert("Please select at least one material");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      if (image) formData.append("image", image);
      formData.append("materials", JSON.stringify(materials));

      const res = await fetch("http://localhost:5000/api/crafts/find", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      setCrafts(data.results || []);
    } catch (err) {
      console.error(err);
      alert("Failed to find crafts");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="findcraft-container">
      <h1>Find Craft by Materials</h1>
      <p>Select materials you have and get craft ideas</p>

      {/* Image Upload */}
      <div className="upload-box">
        <label className="upload-btn">
          📷 Take / Upload Image
          <input
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            onChange={handleImageChange}
          />
        </label>
      </div>

      {preview && (
        <div className="preview-box">
          <img src={preview} alt="Preview" />
        </div>
      )}

      {/* Materials */}
      <div className="materials-box">
        <h3>Select Materials</h3>
        <div className="materials-grid">
          {materialOptions.map((mat) => (
            <label key={mat} className="material-item">
              <input
                type="checkbox"
                checked={materials.includes(mat)}
                onChange={() => toggleMaterial(mat)}
              />
              {mat}
            </label>
          ))}
        </div>
      </div>

      {/* Button */}
      <button
        className="find-btn"
        onClick={handleFindCrafts}
        disabled={loading}
      >
        {loading ? "Finding..." : "Find Crafts"}
      </button>

      {/* Results */}
      {crafts.length > 0 && (
        <div className="results">
          <h2>Suggested Crafts</h2>
          <div className="card-grid">
            {crafts.map((craft) => (
              <div key={craft._id} className="craft-card">
                <h3>{craft.title}</h3>
                <p>{craft.description}</p>
                <p>
                  <strong>Materials:</strong>{" "}
                  {craft.materials.join(", ")}
                </p>
                <button>View Tutorial</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {crafts.length === 0 && !loading && (
        <p className="no-results">No crafts found</p>
      )}
    </div>
  );
}
