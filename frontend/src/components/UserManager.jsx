import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // user đang được chỉnh sửa

  // 🟢 Lấy danh sách user từ backend
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getUsers();
      const data = Array.isArray(res.data) ? res.data : res.data.users;
      setUsers(data || []);
    } catch (err) {
      console.error(err);
      setError("Không thể tải danh sách người dùng. Hãy kiểm tra server!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🟡 Thêm user mới
  const handleAdd = async (user) => {
    try {
      const res = await createUser(user);
      const newUser = res.data;
      setUsers((prev) => [...prev, newUser]);
    } catch (err) {
      console.error(err);
      setError("Không thể thêm người dùng mới.");
    }
  };

  // 🔴 Xóa user
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id && u._id !== id));
    } catch (err) {
      console.error(err);
      setError("Không thể xóa người dùng.");
    }
  };

  // 🟠 Chọn user để sửa
  const handleEdit = (user) => {
    setEditing(user);
  };

  // 🟢 Cập nhật user sau khi sửa
  const handleUpdate = async (id, updatedUser) => {
    try {
      const res = await updateUser(id, updatedUser);
      const updated = res.data;
      setUsers((prev) =>
        prev.map((u) => (u.id === id || u._id === id ? updated : u))
      );
      setEditing(null);
    } catch (err) {
      console.error(err);
      setError("Không thể cập nhật thông tin người dùng.");
    }
  };

  return (
    <div>
      <h2>Danh sách người dùng</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Form thêm người dùng */}
      <AddUserForm onAdd={handleAdd} />

      {/* Danh sách user */}
      {loading ? (
        <p>Đang tải...</p>
      ) : users.length === 0 ? (
        <p>Không có người dùng nào.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {users.map((user) => (
            <li
              key={user.id || user._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <div>
                <strong>{user.name}</strong>
                <div style={{ color: "#555" }}>{user.email}</div>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(user)}
                  style={{
                    marginRight: "8px",
                    background: "#e7f3ff",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(user.id || user._id)}
                  style={{
                    background: "#ffecec",
                    border: "none",
                    padding: "6px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Form sửa người dùng */}
      {editing && (
        <EditUserForm
          user={editing}
          onCancel={() => setEditing(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
