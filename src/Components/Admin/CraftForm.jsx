import { useState } from "react";
import api from "../../Services/api";

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

  // Add a new tutorial step
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

  // Update a field in a step
  const updateStep = (index, field, value) => {
    const updatedSteps = [...tutorialSteps];
    updatedSteps[index][field] = value;
    setTutorialSteps(updatedSteps);
  };

  // Remove a step
  const removeStep = (index) => {
    const updatedSteps = tutorialSteps.filter((_, i) => i !== index);
    setTutorialSteps(updatedSteps);
  };

  // Submit craft form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("materials", materials);
    formData.append("tutorialVideo", tutorialVideo);
    formData.append("tutorialSteps", JSON.stringify(tutorialSteps));

    if (image) formData.append("image", image);

    // Append step images
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
    <form onSubmit={handleSubmit} className="craft-form">
      <h2>{editingCraft ? "Edit Craft" : "Create Craft"}</h2>

      {/* Title */}
      <input
        type="text"
        placeholder="Craft Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      {/* Price */}
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      {/* Category */}
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

      {/* Materials */}
      <input
        type="text"
        placeholder="Materials (comma separated)"
        value={materials}
        onChange={(e) => setMaterials(e.target.value)}
        required
      />

      {/* Tutorial Video */}
      <input
        type="text"
        placeholder="Tutorial Video URL (YouTube)"
        value={tutorialVideo}
        onChange={(e) => setTutorialVideo(e.target.value)}
      />

      {/* Main Craft Image */}
      <label>Main Craft Image</label>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        required={!editingCraft}
      />

      {/* Tutorial Steps */}
      <h3>Tutorial Steps</h3>
      {tutorialSteps.map((step, index) => (
        <div key={index} className="tutorial-step">
          <input
            type="text"
            placeholder="Step Title"
            value={step.title}
            onChange={(e) => updateStep(index, "title", e.target.value)}
            required
          />

          <textarea
            placeholder="Step Description"
            value={step.description}
            onChange={(e) =>
              updateStep(index, "description", e.target.value)
            }
            required
          />

          <label>Step Image</label>
          <input
            type="file"
            onChange={(e) => updateStep(index, "imageFile", e.target.files[0])}
          />

          <button type="button" onClick={() => removeStep(index)}>
            Remove Step
          </button>
        </div>
      ))}

      <button type="button" onClick={addStep}>
        Add Step
      </button>

      <button type="submit">
        {editingCraft ? "Update Craft" : "Create Craft"}
      </button>
    </form>
  );
}
