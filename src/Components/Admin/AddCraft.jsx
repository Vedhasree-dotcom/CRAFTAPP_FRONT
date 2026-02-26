import CraftForm from "./CraftForm";
import { useNavigate } from "react-router-dom";
import "./style.css";

function AddCraft() {
  const navigate = useNavigate();

  const closeForm = () => {
    navigate("/admin/crafts");
  };

  return (
    <div className="ac-page">

      <div className="ac-header">
        <div>
          <span className="ac-eyebrow">Admin Panel</span>
          <h1>Add New <em>Craft</em></h1>
        </div>
        <button className="ac-back-btn" onClick={closeForm}>
          ← Back to Crafts
        </button>
      </div>

      <CraftForm closeForm={closeForm} />

    </div>
  );
}

export default AddCraft;