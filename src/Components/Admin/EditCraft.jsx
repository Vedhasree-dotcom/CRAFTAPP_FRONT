import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Services/api";
import CraftForm from "./CraftForm";

export default function EditCraft() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [craft, setCraft] = useState(null);

  useEffect(() => {
    fetchCraft();
  }, [id]);

  const fetchCraft = async () => {
    try {
      const res = await api.get(`/crafts/${id}`);
      setCraft(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!craft) return <p>Loading...</p>;

  return (
    <div>
      <CraftForm
        editingCraft={craft}
        closeForm={() => navigate("/admin/crafts")}
        refresh={() => navigate("/admin/crafts")}
      />
    </div>
  );
}