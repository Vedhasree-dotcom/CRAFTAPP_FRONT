import { useState } from "react";
import api from "../../Services/api";
import "./style.css";

export default function CraftForm({ editingCraft, closeForm, refresh }) {
  const [title, setTitle] = useState(editingCraft?.title || "");
  const [description, setDescription] = useState(editingCraft?.description || "");
  const [price, setPrice] = useState(editingCraft?.price || "");
  const [category, setCategory] = useState(editingCraft?.category || "");
  const [materials, setMaterials] = useState(editingCraft?.materials?.join(", ") || "");
  const [tutorialVideo, setTutorialVideo] = useState(editingCraft?.tutorialVideo || "");
  const [tutorialSteps, setTutorialSteps] = useState(
    editingCraft?.tutorialSteps?.map((step) => ({ ...step, imageFile: null })) || []
  );
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addStep = () => {
    setTutorialSteps([
      ...tutorialSteps,
      { stepNumber: tutorialSteps.length + 1, title: "", description: "", imageFile: null },
    ]);
  };

  const updateStep = (index, field, value) => {
    const updated = [...tutorialSteps];
    updated[index][field] = value;
    setTutorialSteps(updated);
  };

  const removeStep = (index) => {
    setTutorialSteps(tutorialSteps.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("materials", JSON.stringify(
      materials.split(",").map(i => i.trim()).filter(i => i !== "")
    ));
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
      if (refresh) refresh();
      closeForm();
    } catch (err) {
      console.error("Error saving craft:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cf-wrapper">
      <form onSubmit={handleSubmit} className="cf-form">

        <div className="cf-form-header">
          <div>
            <span className="cf-eyebrow">{editingCraft ? "Edit" : "New Craft"}</span>
            <h2 className="cf-title">
              {editingCraft ? <>Edit <em>Craft</em></> : <>Create <em>Craft</em></>}
            </h2>
          </div>
          
        </div>

        {error && (
          <div className="cf-error-box"><span>✕</span> {error}</div>
        )}

        <div className="cf-section-label">Basic Info</div>

        <div className="cf-field">
          <label className="cf-label">Craft Title</label>
          <input
            className="cf-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Origami Crane"
            required
          />
        </div>

        <div className="cf-field">
          <label className="cf-label">Description</label>
          <textarea
            className="cf-input cf-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe this craft..."
            required
          />
        </div>

        <div className="cf-row">
          <div className="cf-field">
            <label className="cf-label">Price (₹)</label>
            <input
              className="cf-input"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              required
            />
          </div>

          <div className="cf-field">
            <label className="cf-label">Category</label>
            <select
              className="cf-input cf-select"
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

        <div className="cf-field">
          <label className="cf-label">Materials <span className="cf-hint">(comma separated)</span></label>
          <input
            className="cf-input"
            type="text"
            value={materials}
            onChange={(e) => setMaterials(e.target.value)}
            placeholder="e.g. Paper, Scissors, Glue"
            required
          />
        </div>

        <div className="cf-field">
          <label className="cf-label">Tutorial Video URL</label>
          <input
            className="cf-input"
            type="text"
            value={tutorialVideo}
            onChange={(e) => setTutorialVideo(e.target.value)}
            placeholder="https://youtube.com/..."
          />
        </div>

        <div className="cf-field">
          <label className="cf-label">
            Main Craft Image {editingCraft && <span className="cf-hint">(leave blank to keep existing)</span>}
          </label>

          {editingCraft?.image && !image && (
            <div className="cf-img-preview">
              <img
                src={editingCraft.image.startsWith("http") 
                  ? editingCraft.image 
                  : `${import.meta.env.VITE_SERVER_URL}${editingCraft.image}`}
                alt={editingCraft.title}
              />
            </div>
          )}

          <input
            className="cf-file"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required={!editingCraft}
          />
        </div>

        <div className="cf-divider" />

        <div className="cf-steps-header">
          <div className="cf-section-label">Tutorial Steps</div>
          <span className="cf-steps-count">{tutorialSteps.length} step{tutorialSteps.length !== 1 ? 's' : ''}</span>
        </div>

        {tutorialSteps.map((step, index) => (
          <div key={index} className="cf-step-card">
            <div className="cf-step-num">
              <span>{index + 1}</span>
            </div>
            <div className="cf-step-body">
              <div className="cf-field">
                <label className="cf-label">Step Title</label>
                <input
                  className="cf-input"
                  type="text"
                  value={step.title}
                  onChange={(e) => updateStep(index, "title", e.target.value)}
                  placeholder="e.g. Fold the base"
                  required
                />
              </div>
              <div className="cf-field">
                <label className="cf-label">Step Description</label>
                <textarea
                  className="cf-input cf-textarea cf-textarea--sm"
                  value={step.description}
                  onChange={(e) => updateStep(index, "description", e.target.value)}
                  placeholder="Describe this step..."
                  required
                />
              </div>
              <div className="cf-field">
              <label className="cf-label">Step Image</label>

              {step.image && !step.imageFile && (
                <div className="cf-img-preview">
                  <img
                    src={step.image.startsWith("http")
                      ? step.image
                      : `${import.meta.env.VITE_SERVER_URL}${step.image}`}
                    alt={`Step ${index + 1}`}
                  />
                </div>
              )}

              <input
                className="cf-file"
                type="file"
                onChange={(e) => updateStep(index, "imageFile", e.target.files[0])}
              />
            </div>
              <button
                type="button"
                className="cf-remove-btn"
                onClick={() => removeStep(index)}
              >
                ✕ Remove Step
              </button>
            </div>
          </div>
        ))}

        <button type="button" className="cf-add-step-btn" onClick={addStep}>
          + Add Step
        </button>

        <div className="cf-divider" />

        <div className="cf-form-footer">
          {closeForm && (
            <button type="button" className="cf-cancel-btn" onClick={closeForm}>
              Cancel
            </button>
          )}
          <button
            type="submit"
            className={`cf-submit-btn ${loading ? 'cf-submit--loading' : ''}`}
            disabled={loading}
          >
            {loading
              ? <><span className="cf-spinner" /> Saving...</>
              : editingCraft ? "Update Craft →" : "Create Craft →"
            }
          </button>
        </div>

      </form>
    </div>
  );
}