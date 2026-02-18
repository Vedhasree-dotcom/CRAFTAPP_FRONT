import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../Services/api";
import "../Pages/SubmitProject.css";

function SubmitProject() {
  const navigate = useNavigate();
  const location = useLocation();

  const craftId = location.state?.craftId || "";

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!craftId) {
      setMessage("Invalid craft reference ❌");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("craftId", craftId);
      formData.append("description", description);
      formData.append("images", image);

      await api.post("/submission", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Submission sent for approval 🎉");

      setTimeout(() => {
        navigate("/crafts");
      }, 2000);

    } catch (error) {
      setMessage("Submission failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-container">
      <form className="submit-form" onSubmit={handleSubmit}>
        <h2>Share Your Project </h2>

        {message && <div className="submit-message">{message}</div>}

        <textarea
          placeholder="Describe your experience..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Project"}
        </button>
      </form>
    </div>
  );
}

export default SubmitProject;
