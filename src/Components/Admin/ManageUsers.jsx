import { useEffect, useState } from "react";
import api from "../../Services/api";
import "./style.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowPopup(true);
  };

  const deleteUser = async () => {
    try {
      await api.delete(`/admin/users/${selectedId}`);
      setShowPopup(false);
      setSelectedId(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mu-page">

      <div className="mu-header">
        <div>
          <span className="mu-eyebrow">Admin Panel</span>
          <h1>Manage <em>Users</em></h1>
        </div>
        <div className="mu-total">
          <span className="mu-total-num">{users.length}</span>
          <span className="mu-total-label">Total Users</span>
        </div>
      </div>

      {loading && (
        <div className="mu-idle">
          <div className="mu-spinner" />
          <p>Loading users...</p>
        </div>
      )}

      {!loading && users.length === 0 && (
        <div className="mu-idle">
          <span className="mu-idle-icon">◎</span>
          <h3>No users found</h3>
        </div>
      )}

      {!loading && users.length > 0 && (
        <div className="mu-table-wrap">
          <table className="mu-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Verified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>
                    <div className="mu-name-cell">
                      <div className="mu-avatar">
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                      {u.name}
                    </div>
                  </td>
                  <td className="mu-muted">{u.email}</td>
                  <td className="mu-muted">{u.phone || "—"}</td>
                  <td>
                    <span className={`mu-badge ${u.role === "admin" ? "mu-badge--blue" : "mu-badge--amber"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <span className={`mu-badge ${u.isVerified ? "mu-badge--green" : "mu-badge--red"}`}>
                      {u.isVerified ? "Verified" : "Unverified"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="mu-delete-btn"
                      onClick={() => confirmDelete(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showPopup && (
        <div className="mu-popup-overlay">
          <div className="mu-popup">
            <h3>Delete User?</h3>
            <p>This action cannot be undone. The user will be permanently removed.</p>
            <div className="mu-popup-actions">
              <button className="mu-popup-no"  onClick={() => setShowPopup(false)}>Cancel</button>
              <button className="mu-popup-yes" onClick={deleteUser}>Delete</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}