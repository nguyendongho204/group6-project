import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

axios.defaults.baseURL = 'http://localhost:5001/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            setMessage({ type: 'error', text: 'Vui lòng nhập email' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await axios.post('/forgot-password', { email });
            setMessage({ 
                type: 'success', 
                text: response.data.message || 'Email reset mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư!' 
            });
            setEmail('');
        } catch (error) {
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại!'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Quên Mật Khẩu</h2>
                <p className="auth-subtitle">
                    Nhập email của bạn để nhận link đặt lại mật khẩu
                </p>

                {message.text && (
                    <div className={`alert ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                            disabled={loading}
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Đang gửi...' : 'Gửi Email Reset'}
                    </button>
                </form>

                <div className="auth-links">
                    <Link to="/login">← Quay lại đăng nhập</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
