import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

axios.defaults.baseURL = 'http://localhost:5001/api';

const Profile = () => {
    const { user, token, updateUserContext } = useAuth();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log('Token:', token);
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            console.log('User:', user);
            setFormData({
                name: user.name || '',
                email: user.email || '',
                password: '',
                confirmPassword: ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setMessage({ type: '', text: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submit clicked');

        if (submitting) return;

        const { name, email, password, confirmPassword } = formData;

        if (!name || !email) {
            setMessage({ type: 'error', text: 'Vui lòng nhập đầy đủ tên và email.' });
            return;
        }

        if (password && password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Mật khẩu xác nhận không khớp.' });
            return;
        }

        if (!user || !user._id) {
            setMessage({ type: 'error', text: 'Không xác định được người dùng.' });
            return;
        }

        try {
            setSubmitting(true);

            const updateData = { name, email };
            if (password) updateData.password = password;

            console.log('Gửi PUT tới:', `/users/${user._id}`);
            console.log('Dữ liệu:', updateData);

            const res = await axios.put(`/users/${user._id}`, updateData);

            console.log('Phản hồi:', res.data);

            if (res.data.success) {
                updateUserContext(res.data.user);
                setMessage({ type: 'success', text: 'Cập nhật thành công!' });
                setTimeout(() => navigate('/dashboard'), 1500);
            } else {
                setMessage({ type: 'error', text: res.data.message || 'Lỗi không xác định.' });
            }
        } catch (err) {
            console.error('Lỗi cập nhật:', err);
            setMessage({
                type: 'error',
                text: err.response?.data?.message || 'Không thể cập nhật. Vui lòng thử lại!'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>Thông Tin Cá Nhân</h2>

                {message.text && (
                    <div className={`alert ${message.type}`}>{message.text}</div>
                )}

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label>Họ và Tên</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={submitting}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={submitting}
                        />
                    </div>

                    <div className="form-group">
                        <label>Mật khẩu mới</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Để trống nếu không đổi"
                            disabled={submitting}
                        />
                    </div>

                    <div className="form-group">
                        <label>Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Nhập lại mật khẩu"
                            disabled={submitting}
                        />
                    </div>

                    <div className="button-group">
                        <button type="submit" className="btn-save" disabled={submitting}>
                            {submitting ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                        </button>
                        <button type="button" className="btn-back" onClick={() => navigate('/dashboard')} disabled={submitting}>
                            Quay lại
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;