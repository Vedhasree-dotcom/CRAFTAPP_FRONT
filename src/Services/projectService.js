import api from "../Services/api";

export const getAllProjects = () => {
  return api.get("/submission");
};

export const toggleLike = (id) => {
  return api.put(`/submission/${id}/like`);
};

export const toggleSaveCraft = (id) => {
  return api.put(`/crafts/${id}/save`);
};
