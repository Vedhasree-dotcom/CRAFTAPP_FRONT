import { useEffect, useState } from "react";
import api from "../../Services/api";
import "./style.css";

export default function AdminPurchases() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await api.get("/admin/purchases");
        setPurchases(res.data);
      } catch (err) {
        console.error("Failed to load purchases", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  const totalRevenue = purchases.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="ap-page">

      <div className="ap-header">
        <div>
          <span className="ap-eyebrow">Admin Panel</span>
          <h1>Purchases <em>&amp; Revenue</em></h1>
        </div>
        <div className="ap-revenue">
          <span className="ap-revenue-num">₹{totalRevenue.toLocaleString("en-IN")}</span>
          <span className="ap-revenue-label">Total Revenue</span>
        </div>
      </div>

      {loading && (
        <div className="ap-idle">
          <div className="ap-spinner" />
          <p>Loading purchases...</p>
        </div>
      )}

      {!loading && purchases.length === 0 && (
        <div className="ap-idle">
          <span className="ap-idle-icon">◎</span>
          <h3>No purchases yet</h3>
          <p>Completed purchases will appear here.</p>
        </div>
      )}

      {!loading && purchases.length > 0 && (
        <>
          <div className="ap-meta-row">
            <span className="ap-meta-count">{purchases.length} transaction{purchases.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="ap-table-wrap">
            <table className="ap-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Craft</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <div className="ap-name-cell">
                        <div className="ap-avatar">
                          {p.userId?.name?.[0]?.toUpperCase()}
                        </div>
                        {p.userId?.name}
                      </div>
                    </td>
                    <td className="ap-muted">{p.userId?.email}</td>
                    <td className="ap-craft-name">{p.craftId?.title}</td>
                    <td>
                      <span className="ap-amount">₹{p.amount?.toLocaleString("en-IN")}</span>
                    </td>
                    <td className="ap-muted">
                      {new Date(p.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </td>
                    <td className="ap-muted">
                      {new Date(p.createdAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit", minute: "2-digit"
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

    </div>
  );
}