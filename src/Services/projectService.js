import api from "../Services/api";

export const getAllProjects = () => {
  return api.get("/submissions");
};

export const toggleLike = (id) => {
  return api.put(`/submissions/${id}/like`);
};

export const toggleSaveCraft = (id) => {
  return api.put(`/crafts/${id}/save`);
};
