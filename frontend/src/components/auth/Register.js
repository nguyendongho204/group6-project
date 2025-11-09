import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
    const { signup, isAuthenticated, loading, error, clearErrors } = useAuth();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const [formErrors, setFormErrors] = useState({});
    const [submitError, setSubmitError] = useState('');

    // Sửa useEffect để tránh vòng lặp vô hạn
    useEffect(() => {
        let isMounted = true;

        // Kiểm tra xác thực và điều hướng
        if (isAuthenticated && isMounted) {
            navigate('/dashboard');
        }

        // Cleanup function
        return () => {
            isMounted = false;
            clearErrors(); // Chỉ clear errors khi unmount
        };
    }, [isAuthenticated, navigate]); // Chỉ theo dõi isAuthenticated và navigate

    const { name, email, password, confirmPassword } = formData;

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        
        // Clear specific field error
        if (formErrors[e.target.name]) {
            setFormErrors({
                ...formErrors,
                [e.target.name]: ''
            });
        }

        // Clear submit error when user types
        if (submitError) {
            setSubmitError('');
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = 'Tên là bắt buộc';
        } else if (name.trim().length < 2) {
            errors.name = 'Tên phải có ít nhất 2 ký tự';
        }

        if (!email) {
            errors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email không hợp lệ';
        }

        if (!password) {
            errors.password = 'Mật khẩu là bắt buộc';
        } else if (password.length < 6) {
            errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (!confirmPassword) {
            errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Mật khẩu không khớp';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Clear previous errors
        setFormErrors({});
        setSubmitError('');

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        try {
            const result = await signup({ 
                name, 
                email, 
                password 
            });
            
            if (result.success) {
                alert('Đăng ký thành công! Chào mừng bạn đến với hệ thống.');
                navigate('/dashboard');
            } else {
                setSubmitError(result.message || 'Đăng ký thất bại. Vui lòng thử lại.');
            }
        } catch (err) {
            setSubmitError('Có lỗi xảy ra. Vui lòng thử lại sau.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Tạo Tài Khoản</h2>
                    <p>Đăng ký để bắt đầu sử dụng hệ thống</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Họ và Tên</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            className={formErrors.name ? 'error' : ''}
                            placeholder="Nhập họ và tên"
                        />
                        {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                    </div>

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
                        />
                        {formErrors.password && <span className="error-message">{formErrors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className={formErrors.confirmPassword ? 'error' : ''}
                            placeholder="Xác nhận mật khẩu"
                        />
                        {formErrors.confirmPassword && (
                            <span className="error-message">{formErrors.confirmPassword}</span>
                        )}
                    </div>

                    {/* Hiển thị lỗi từ API hoặc lỗi submit */}
                    {(error || submitError) && (
                        <div className="error-message global-error">
                            {submitError || error}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>Đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;