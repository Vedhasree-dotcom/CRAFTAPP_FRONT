import { useState } from "react";
import api from "../../Services/api";
import "./style.css"

export default function CraftForm({ editingCraft, closeForm, refresh }) {
  const [title, setTitle] = useState(editingCraft?.title || "");
  const [description, setDescription] = useState(editingCraft?.description || "");
  const [price, setPrice] = useState(editingCraft?.price || "");
  const [category, setCategory] = useState(editingCraft?.category || "");
  const [materials, setMaterials] = useState(
    editingCraft?.materials?.join(", ") || ""
  );
  const [tutorialVideo, setTutorialVideo] = useState(
    editingCraft?.tutorialVideo || ""
  );
  const [tutorialSteps, setTutorialSteps] = useState(
    editingCraft?.tutorialSteps?.map((step) => ({ ...step, imageFile: null })) || []
  );
  const [image, setImage] = useState(null);

  const addStep = () => {
    setTutorialSteps([
      ...tutorialSteps,
      {
        stepNumber: tutorialSteps.length + 1,
        title: "",
        description: "",
        imageFile: null,
      },
    ]);
  };

  const updateStep = (index, field, value) => {
    const updatedSteps = [...tutorialSteps];
    updatedSteps[index][field] = value;
    setTutorialSteps(updatedSteps);
  };

  const removeStep = (index) => {
    const updatedSteps = tutorialSteps.filter((_, i) => i !== index);
    setTutorialSteps(updatedSteps);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("category", category);

  const materialsArray = materials
    .split(",")
    .map(item => item.trim())
    .filter(item => item !== "");

  formData.append("materials", JSON.stringify(materialsArray));

  formData.append("tutorialVideo", tutorialVideo);
  formData.append("tutorialSteps", JSON.stringify(tutorialSteps));

  if (image) formData.append("image", image);

  tutorialSteps.forEach((step) => {
    if (step.imageFile) formData.append("stepImages", step.imageFile);
  });

  try {
    if (editingCraft) {
      await api.put(`/crafts/${editingCraft._id}`, formData);
    } else {
      await api.post("/crafts", formData);
    }

    refresh();
    closeForm();
  } catch (error) {
    console.error("Error saving craft:", error);
    alert("Error saving craft");
  }
};

  return (
   <div className="admin-form-wrapper">
    <form onSubmit={handleSubmit} className="craft-form">
      <h2 className="form-title">
        {editingCraft ? "Edit Craft" : "Create Craft"}
      </h2>

      <div className="form-group">
        <label>Craft Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="paper">Paper</option>
            <option value="home-decor">Home Decor</option>
            <option value="painting">Painting</option>
            <option value="clay">Clay</option>
            <option value="knitting">Knitting</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Materials (comma separated)</label>
        <input
          type="text"
          value={materials}
          onChange={(e) => setMaterials(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Tutorial Video URL</label>
        <input
          type="text"
          value={tutorialVideo}
          onChange={(e) => setTutorialVideo(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Main Craft Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required={!editingCraft}
        />
      </div>

      <div className="steps-section">
        <h3>Tutorial Steps</h3>

        {tutorialSteps.map((step, index) => (
          <div key={index} className="tutorial-step">
            <div className="form-group">
              <label>Step Title</label>
              <input
                type="text"
                value={step.title}
                onChange={(e) =>
                  updateStep(index, "title", e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Step Description</label>
              <textarea
                value={step.description}
                onChange={(e) =>
                  updateStep(index, "description", e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Step Image</label>
              <input
                type="file"
                onChange={(e) =>
                  updateStep(index, "imageFile", e.target.files[0])
                }
              />
            </div>

            <button
              type="button"
              className="remove-step-btn"
              onClick={() => removeStep(index)}
            >
              Remove Step
            </button>
          </div>
        ))}

        <button
          type="button"
          className="add-step-btn"
          onClick={addStep}
        >
          + Add Step
        </button>
      </div>

      <button type="submit" className="submit-btn">
        {editingCraft ? "Update Craft" : "Create Craft"}
      </button>
    </form>
  </div>

  );
}
