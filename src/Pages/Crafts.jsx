import { Link, Outlet } from "react-router-dom";

export default function Crafts() {
  return (
    <div className="crafts-container" style={{ display: "flex", marginTop: "80px" }}>
      <aside className="crafts-sidebar">
        <h4>Categories</h4>
        <ul style={{marginTop: "30px"}}>
          
          <li><Link to="paper">Paper Crafts</Link></li>
          <li><Link to="home-decor">Home Decor</Link></li>
          <li><Link to="knitting">Knitting</Link></li>
          <li><Link to="painting">Painting</Link></li>
          <li><Link to="clay">Clay Modeling</Link></li>
        </ul>
      </aside>

      <main className="crafts-content">
        <Outlet />
      </main>
    </div>
  );
}
