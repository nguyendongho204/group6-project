import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminPanel.css';

axios.defaults.baseURL = 'http://localhost:5001/api';

const AdminPanel = () => {
    const { user, token } = useAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        // Kiểm tra quyền Admin
        if (!user || user.role !== 'Admin') {
            navigate('/dashboard');
            return;
        }

        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        fetchUsers();
    }, [user, token, navigate]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/admin/users');
            setUsers(res.data);
        } catch (err) {
            console.error('Lỗi khi lấy danh sách users:', err);
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Không thể lấy danh sách users'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId, userName) => {
        if (!window.confirm(`Bạn có chắc chắn muốn xóa user "${userName}"?`)) {
            return;
        }

        try {
            await axios.delete(`/users/${userId}`);
            setMessage({ type: 'success', text: 'Xóa user thành công!' });
            fetchUsers(); // Refresh danh sách
        } catch (err) {
            console.error('Lỗi khi xóa user:', err);
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Không thể xóa user'
            });
        }
    };

    const handleChangeRole = async (userId, currentRole, userName) => {
        const newRole = currentRole === 'Admin' ? 'User' : 'Admin';
        
        if (!window.confirm(`Bạn có chắc chắn muốn đổi role của "${userName}" thành ${newRole}?`)) {
            return;
        }

        try {
            await axios.put(`/admin/users/${userId}/role`, { role: newRole });
            setMessage({ type: 'success', text: `Đã cập nhật role thành ${newRole}!` });
            fetchUsers(); // Refresh danh sách
        } catch (err) {
            console.error('Lỗi khi cập nhật role:', err);
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Không thể cập nhật role'
            });
        }
    };

    if (loading) {
        return (
            <div className="admin-panel">
                <div className="loading">Đang tải danh sách users...</div>
            </div>
        );
    }

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <h1>Quản Lý Người Dùng (Admin)</h1>
                <button onClick={() => navigate('/dashboard')} className="btn-back">
                    ← Quay lại Dashboard
                </button>
            </div>

            {message.text && (
                <div className={`alert ${message.type}`}>
                    {message.text}
                    <button onClick={() => setMessage({ type: '', text: '' })} className="close-btn">×</button>
                </div>
            )}

            <div className="users-stats">
                <div className="stat-card">
                    <h3>Tổng Users</h3>
                    <p className="stat-number">{users.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Admins</h3>
                    <p className="stat-number">{users.filter(u => u.role === 'Admin').length}</p>
                </div>
                <div className="stat-card">
                    <h3>Users</h3>
                    <p className="stat-number">{users.filter(u => u.role === 'User').length}</p>
                </div>
            </div>

            <div className="users-table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Ngày tạo</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="no-data">Không có user nào</td>
                            </tr>
                        ) : (
                            users.map((u, index) => (
                                <tr key={u._id}>
                                    <td>{index + 1}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        <span className={`role-badge ${u.role.toLowerCase()}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td>{new Date(u.createdAt).toLocaleDateString('vi-VN')}</td>
                                    <td className="action-buttons">
                                        <button
                                            onClick={() => handleChangeRole(u._id, u.role, u.name)}
                                            className="btn-role"
                                            title={u.role === 'Admin' ? 'Chuyển thành User' : 'Chuyển thành Admin'}
                                        >
                                            {u.role === 'Admin' ? '→ User' : '→ Admin'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(u._id, u.name)}
                                            className="btn-delete"
                                            disabled={u._id === user._id}
                                            title={u._id === user._id ? 'Không thể tự xóa' : 'Xóa user'}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
