// src/components/AddUser.jsx
import React, { useState } from 'react';
import axios from 'axios';

function AddUser({ onUserAdded }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert('Vui lòng nhập đầy đủ họ tên và email!');
      return;
    }

    try {
      const res = await axios.post('/users', { name, email });
      alert('✅ Thêm người dùng thành công!');
      setName('');
      setEmail('');
      if (onUserAdded) onUserAdded(res.data); // cập nhật danh sách
    } catch (error) {
      console.error('Lỗi khi thêm người dùng:', error);
      alert('❌ Lỗi khi thêm người dùng!');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Thêm người dùng mới</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{' '}
        <input
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />{' '}
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}

export default AddUser;
