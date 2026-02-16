import { useState } from "react";
import axios from "axios";

export default function CraftForm({ editingCraft, closeForm, refresh }) {
  const [title, setTitle] = useState(editingCraft?.title || "");
  const [category, setCategory] = useState(editingCraft?.category || "");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    if (image) formData.append("image", image);

    if (editingCraft) {
      await axios.put(
        `/api/crafts/${editingCraft._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      await axios.post(
        "/api/crafts",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    refresh();
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} className="craft-form">
      <input
        type="text"
        placeholder="Craft Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button type="submit">
        {editingCraft ? "Update Craft" : "Create Craft"}
      </button>
    </form>
  );
}
