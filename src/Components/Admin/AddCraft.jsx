import CraftForm from "./CraftForm";
import { useNavigate } from "react-router-dom";

export default function AddCraft() {
  const navigate = useNavigate();

  const closeForm = () => {
    navigate("/admin/crafts"); 
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Add New Craft</h1>
        <p>Create a new craft with tutorial steps</p>
      </div>

      <CraftForm closeForm={closeForm} />
    </div>
  );
}