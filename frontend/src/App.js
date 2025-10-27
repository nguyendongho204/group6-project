// src/App.js
import React, { useState } from 'react';
import AddUser from './components/AddUser';
import UserList from './components/UserList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUserAdded = () => {
    // khi thêm user mới thì tăng refreshKey để UserList tự reload
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Ứng dụng quản lý người dùng</h1>
      <AddUser onUserAdded={handleUserAdded} />
      <hr />
      <UserList refreshKey={refreshKey} />
    </div>
  );
}

export default App;
