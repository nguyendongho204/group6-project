import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

axios.defaults.baseURL = 'http://localhost:5001/api';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setMessage({ type: '', text: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.password || !formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Vui lòng điền đầy đủ thông tin' });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage({ type: 'error', text: 'Mật khẩu xác nhận không khớp' });
            return;
        }

        if (formData.password.length < 6) {
            setMessage({ type: 'error', text: 'Mật khẩu phải có ít nhất 6 ký tự' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await axios.post('/reset-password', {
                token,
                password: formData.password
            });

            setMessage({ 
                type: 'success', 
                text: response.data.message || 'Đổi mật khẩu thành công!' 
            });

            // Chuyển về trang login sau 2 giây
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Token không hợp lệ hoặc đã hết hạn!'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Đặt Lại Mật Khẩu</h2>
                <p className="auth-subtitle">
                    Nhập mật khẩu mới của bạn
                </p>

                {message.text && (
                    <div className={`alert ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Mật khẩu mới</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Nhập mật khẩu mới"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Nhập lại mật khẩu mới"
                            disabled={loading}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Đặt Lại Mật Khẩu'}
                    </button>
                </form>

                <div className="auth-links">
                    <Link to="/login">← Quay lại đăng nhập</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
