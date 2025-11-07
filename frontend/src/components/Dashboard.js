import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout, token } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (window.confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
            await logout();
            navigate('/login');
            alert('Đã đăng xuất thành công!');
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Dashboard - Hệ Thống Quản Lý</h1>
                <div className="user-info">
                    <span>Xin chào, {user?.name || user?.email}!</span>
                    <button onClick={handleLogout} className="logout-button">
                        Đăng Xuất
                    </button>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="user-card">
                    <h3>Thông Tin Cá Nhân</h3>
                    <div className="user-details">
                        <p><strong>Tên:</strong> {user?.name || 'Chưa cập nhật'}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Vai trò:</strong> {user?.role || 'user'}</p>
                        <p><strong>Thành viên từ:</strong> {new Date().toLocaleDateString('vi-VN')}</p>
                    </div>
                </div>

                <div className="token-info">
                    <h3>Thông Tin Xác Thực</h3>
                    <p>JWT Token hiện tại:</p>
                    <div className="token-display">
                        <code>{token}</code>
                    </div>
                    <small>Token này được sử dụng để xác thực các request</small>
                </div>

                <div className="quick-actions">
                    <h3>Hành Động Nhanh</h3>
                    <div className="action-buttons">
                        <button className="action-btn" onClick={() => alert('Chức năng sẽ có trong Hoạt động 2')}>
                            Cập Nhật Hồ Sơ
                        </button>
                        <button className="action-btn" onClick={() => alert('Chức năng sẽ có trong Hoạt động 3')}>
                            Quản Lý Users (Admin)
                        </button>
                        <button className="action-btn" onClick={() => alert('Chức năng sẽ có trong Hoạt động 4')}>
                            Đổi Mật Khẩu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;