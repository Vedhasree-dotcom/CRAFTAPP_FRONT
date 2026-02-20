import React, { useEffect, useState } from "react";
import { getAllProjects, toggleLike } from "../Services/projectService";

function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await getAllProjects();
    setProjects(res.data);
  };

  const handleLike = async (id) => {
    await toggleLike(id);
    fetchProjects();
  };

  return (
    <div className="project-container">
      <h1>Community Projects</h1>

      <div className="project-grid">
        {projects.map((project) => (
          <div className="project-card" key={project._id}>
            <img
              src={`${SERVER_URL.replace(/\/$/, "")}${project.images?.[0]}`}
              alt="craft"
              className="project-image"
            />

            <div className="project-content">
              <p>{project.description}</p>
              <p className="creator">
                by {project.userId?.name}
              </p>

              <button
                className="like-button"
                onClick={() => handleLike(project._id)}
              >
                ❤️ {project.likes?.length || 0}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectPage;
