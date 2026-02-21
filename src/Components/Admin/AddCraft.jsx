import CraftForm from "./CraftForm";

export default function AddCraft() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Add New Craft</h1>
        <p>Create a new craft with tutorial steps</p>
      </div>

      <CraftForm />
    </div>
  );
}
