import { useEffect, useState } from "react";
import api from "../Services/api";
import { Link } from "react-router-dom";

export default function AllCrafts() {
  const [crafts, setCrafts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrafts = async () => {
      try {
        const res = await api.get("/crafts");
        setCrafts(res.data);
      } catch (err) {
        console.error("Error fetching crafts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCrafts();
  }, []);

  const filteredCrafts = crafts.filter(craft =>
    craft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    craft.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="ac-loading">
      <div className="ac-loading-spinner" />
      <p>Gathering crafts for you...</p>
    </div>
  );

  return (
    <div className="ac-page">

      <div className="ac-header">
        <div>
          <span className="ac-eyebrow">Browse All</span>
          <h2>All <em>Crafts</em></h2>
        </div>
        <span className="ac-count">{filteredCrafts.length} crafts</span>
      </div>

      <div className="ac-search-wrap">
        <span className="ac-search-icon">⌕</span>
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="ac-search"
        />
        {searchTerm && (
          <button className="ac-search-clear" onClick={() => setSearchTerm("")}>✕</button>
        )}
      </div>

      {filteredCrafts.length === 0 ? (
        <div className="ac-empty">
          <span className="ac-empty-icon">✦</span>
          <p>No crafts found for "<strong>{searchTerm}</strong>"</p>
          <button className="ac-empty-reset" onClick={() => setSearchTerm("")}>Clear search</button>
        </div>
      ) : (
        <div className="ac-grid">
          {filteredCrafts.map((craft, i) => (
            <Link
              to={`/crafts/${craft._id}`}
              key={craft._id}
              className={`ac-pin ${i % 3 === 0 ? 'ac-pin--tall' : i % 5 === 0 ? 'ac-pin--short' : ''}`}
            >

              <span className="ac-badge">{craft.category}</span>

              <img
                src={
                  craft.image?.startsWith("http")
                    ? craft.image
                    : `${import.meta.env.VITE_SERVER_URL}${craft.image}`
                }
                alt={craft.title}
                className="ac-pin-img"
              />

              <div className="ac-pin-body">
                <h3>{craft.title}</h3>
                <p className="ac-pin-desc">{craft.description}</p>
                <div className="ac-pin-footer">
                  <span className="ac-price">₹{craft.price}</span>
                  <span className="ac-arrow">↗</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}