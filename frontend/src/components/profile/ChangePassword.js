import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './Profile.css';

axios.defaults.baseURL = 'http://localhost:5001/api';

const ChangePassword = () => {
    const { user, token } = useAuth();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, [token]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setMessage({ type: '', text: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { currentPassword, newPassword, confirmPassword } = formData;

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            setMessage({ type: 'error', text: 'Vui lòng điền đầy đủ thông tin!' });
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Mật khẩu mới và xác nhận không khớp!' });
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 6 ký tự!' });
            return;
        }

        if (currentPassword === newPassword) {
            setMessage({ type: 'error', text: 'Mật khẩu mới không được trùng với mật khẩu cũ!' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // First verify current password by trying to login
            await axios.post('/login', {
                email: user.email,
                password: currentPassword
            });

            // If login successful, update password
            const response = await axios.put(`/users/${user._id}`, {
                name: user.name,
                email: user.email,
                password: newPassword
            });

            if (response.data.success) {
                setMessage({ 
                    type: 'success', 
                    text: 'Đổi mật khẩu thành công! Vui lòng đăng nhập lại.' 
                });
                
                // Clear form
                setFormData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });

                // Auto logout after 2 seconds
                setTimeout(() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }, 2000);
            } else {
                setMessage({ 
                    type: 'error', 
                    text: response.data.message || 'Đổi mật khẩu thất bại!' 
                });
            }
        } catch (error) {
            if (error.response?.status === 400) {
                setMessage({ 
                    type: 'error', 
                    text: 'Mật khẩu hiện tại không đúng!' 
                });
            } else {
                setMessage({ 
                    type: 'error', 
                    text: error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại!' 
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setFormData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setMessage({ type: '', text: '' });
    };

    return (
        <div className="change-password-section">
            <h3>Đổi Mật Khẩu</h3>

            {message.text && (
                <div className={`alert ${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="change-password-form">
                <div className="form-group">
                    <label>Mật khẩu hiện tại</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu hiện tại"
                        disabled={loading}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Mật khẩu mới</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                        disabled={loading}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Xác nhận mật khẩu mới</label>
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

                <div className="button-group">
                    <button 
                        type="submit" 
                        className="btn-save"
                        disabled={loading}
                    >
                        {loading ? 'Đang xử lý...' : 'Đổi Mật Khẩu'}
                    </button>
                    <button 
                        type="button" 
                        className="btn-reset"
                        onClick={handleReset}
                        disabled={loading}
                    >
                        Làm mới
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
