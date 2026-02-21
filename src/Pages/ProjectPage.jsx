import React, { useEffect, useState } from "react";
import { getAllProjects, toggleLike } from "../Services/projectService";

function ProjectPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await getAllProjects();
      setProjects(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    await toggleLike(id);
    fetchProjects();
  };

  return (
    <div className="pp-page">

      <div className="pp-hero">
        <div className="pp-hero-inner">
          <span className="pp-eyebrow">Made by Crafters</span>
          <h1>Community <em>Projects</em></h1>
          <p>Real creations from real people. Get inspired by what our community has made.</p>
        </div>
      </div>

      <div className="pp-body">

        {loading && (
          <div className="pp-idle">
            <div className="pp-spinner" />
            <p>Loading projects...</p>
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="pp-idle">
            <span className="pp-idle-icon">◈</span>
            <h3>No projects yet</h3>
            <p>Be the first to share your creation with the community!</p>
          </div>
        )}

        {!loading && projects.length > 0 && (
          <>
            <div className="pp-count">
              <span className="pp-eyebrow">All Projects</span>
              <h2>{projects.length} Creation{projects.length !== 1 ? 's' : ''}</h2>
            </div>

            <div className="pp-grid">
              {projects.map((project, i) => (
                <div
                  key={project._id}
                  className={`pp-pin ${i % 5 === 0 ? 'pp-pin--tall' : ''}`}
                >
                  <img
                    src={`${SERVER_URL.replace(/\/$/, "")}${project.images?.[0]}`}
                    alt="craft"
                    className="pp-pin-img"
                  />

                  <button
                    className="pp-like-btn"
                    onClick={() => handleLike(project._id)}
                  >
                    ♥ {project.likes?.length || 0}
                  </button>

                  <div className="pp-pin-body">
                    <p className="pp-desc">{project.description}</p>
                    <div className="pp-pin-footer">
                      <span className="pp-creator">
                        <span className="pp-creator-avatar">
                          {project.userId?.name?.[0]?.toUpperCase()}
                        </span>
                        {project.userId?.name}
                      </span>
                      <span className="pp-likes-count">♥ {project.likes?.length || 0}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default ProjectPage;