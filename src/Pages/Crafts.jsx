import { Link, Outlet, useLocation } from "react-router-dom";

const categories = [
  { to: "paper", label: "Paper Crafts", icon: "❋"},
  { to: "home-decor", label: "Home Decor", icon: "⬡"},
  { to: "knitting", label: "Knitting", icon: "◈"},
  { to: "painting", label: "Painting", icon: "✦" },
  { to: "clay", label: "Clay Modeling", icon: "◎"},
];

export default function Crafts() {
  const location = useLocation();

  return (
    <div className="crafts-page">

      <div className="crafts-header">
        <span className="crafts-eyebrow">Browse &amp; Discover</span>
        <h1>Explore <em>Crafts</em></h1>
        <p>Find your next creative obsession — pick a category and dive in.</p>
      </div>

      <div className="crafts-layout">

        <aside className="crafts-sidebar">
          <div className="sidebar-sticky">
            <p className="sidebar-label">Categories</p>
            <ul className="sidebar-list">
              {categories.map((cat) => {
                const isActive = location.pathname.includes(cat.to);
                return (
                  <li key={cat.to}>
                    <Link
                      to={cat.to}
                      className={`sidebar-link ${isActive ? 'sidebar-link--active' : ''}`}
                    >
                      <span className="sidebar-icon">{cat.icon}</span>
                      <span className="sidebar-link-label">{cat.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="sidebar-quote">
              <p>"Every craft tells a story worth making."</p>
            </div>
          </div>
        </aside>

        <main className="crafts-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}