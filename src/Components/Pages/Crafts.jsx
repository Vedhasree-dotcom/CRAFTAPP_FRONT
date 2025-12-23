import { Link, Outlet } from "react-router-dom";

export default function Crafts() {
  return (
    <div className="crafts-container">
      <aside className="crafts-sidebar">
        <h3>Categories</h3>
        <ul>
          
          <li><Link to="paper">Paper Crafts</Link></li>
          <li><Link to="home-decor">Home Decor</Link></li>
          <li><Link to="knitting">Knitting</Link></li>
          <li><Link to="painting">Painting</Link></li>
          <li><Link to="clay">Clay Modeling</Link></li>
        </ul>
      </aside>

      {/* Content */}
      <main className="crafts-content">
        <Outlet />
      </main>
    </div>
  );
}
