import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
    const { login, isAuthenticated, loading, error, clearErrors } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
        return () => clearErrors();
    }, [isAuthenticated, navigate, clearErrors]);

    const { email, password } = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        
        // Clear specific field error when user starts typing
        if (formErrors[e.target.name]) {
            setFormErrors({
                ...formErrors,
                [e.target.name]: ''
            });
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!email) {
            errors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email không hợp lệ';
        }

        if (!password) {
            errors.password = 'Mật khẩu là bắt buộc';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});
        const result = await login({ email, password });
        
        if (result.success) {
            alert('Đăng nhập thành công! Chào mừng bạn quay trở lại.');
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Đăng Nhập</h2>
                    <p>Chào mừng bạn quay trở lại</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className={formErrors.email ? 'error' : ''}
                            placeholder="Nhập email"
                            autoComplete="email"
                        />
                        {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className={formErrors.password ? 'error' : ''}
                            placeholder="Nhập mật khẩu"
                            autoComplete="current-password"
                        />
                        {formErrors.password && <span className="error-message">{formErrors.password}</span>}
                    </div>

                    {error && <div className="error-message global-error">{error}</div>}

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Chưa có tài khoản? <Link to="/register">Đăng ký tại đây</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;