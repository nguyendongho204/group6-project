// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList({ refreshKey }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách người dùng:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshKey]); // làm mới khi thêm user mới

  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách người dùng</h2>
      {users.length === 0 ? (
        <p>Chưa có người dùng nào.</p>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.name} - {u.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserList;
