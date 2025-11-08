import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

// Tạo Context
const AuthContext = createContext();

// Set default URL cho axios
axios.defaults.baseURL = 'http://localhost:3002/api';

// Thêm interceptor để xử lý lỗi
axios.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        if (error.response) {
            console.log('Response Error:', error.response.data);
            console.log('Status:', error.response.status);
        } else if (error.request) {
            console.log('Request Error:', error.request);
        } else {
            console.log('Error Config:', error.config);
        }
        return Promise.reject(error);
    }
);

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    error: null
};

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
        case 'SIGNUP_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
                error: null
            };
        
        case 'LOGOUT':
        case 'AUTH_ERROR':
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: action.payload
            };
        
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            };
        
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Set auth token trong headers
    const setAuthToken = (token) => {
        if (token) {
            console.log('Setting auth token:', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('token', token);
        } else {
            console.log('Removing auth token');
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    };

    // Load user khi app khởi động
    useEffect(() => {
        if (state.token) {
            setAuthToken(state.token);
        }
        dispatch({ type: 'SET_LOADING', payload: false });
    }, [state.token]);

    // Đăng ký user mới
    const signup = async (userData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            
            console.log('Đang gửi yêu cầu đăng ký...', userData);
            
            const response = await axios.post('/auth/signup', userData);
            
            console.log('Phản hồi từ server:', response.data);
            
            // Tạo token nếu server không trả về
            const token = response.data.token || Math.random().toString(36).substring(7);
            
            dispatch({
                type: 'SIGNUP_SUCCESS',
                payload: {
                    token: token,
                    user: response.data.user || { name: userData.name, email: userData.email }
                }
            });
            
            return { 
                success: true, 
                message: response.data.message || 'Đăng ký thành công!'
            };
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            
            let errorMessage;
            if (error.response) {
                errorMessage = error.response.data?.message || 'Lỗi từ server';
            } else if (error.request) {
                errorMessage = 'Không thể kết nối đến server';
            } else {
                errorMessage = error.message || 'Đã xảy ra lỗi';
            }

            dispatch({
                type: 'AUTH_ERROR',
                payload: errorMessage
            });
            
            return { 
                success: false, 
                message: errorMessage 
            };
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    // Đăng nhập
    const login = async (userData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            
            console.log('Đang đăng nhập...', userData);
            
            const response = await axios.post('/auth/login', userData);
            
            console.log('Phản hồi đăng nhập:', response.data);
            
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    token: response.data.token,
                    user: response.data.user || { email: userData.email }
                }
            });
            
            return { success: true, message: response.data.message };
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            
            const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại';
            dispatch({
                type: 'AUTH_ERROR',
                payload: errorMessage
            });
            
            return { success: false, message: errorMessage };
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    // Đăng xuất
    const logout = async () => {
        try {
            console.log('Đang đăng xuất...');
            await axios.post('/auth/logout');
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            console.error('Lỗi đăng xuất:', error);
            dispatch({ type: 'LOGOUT' });
        }
    };

    // Xóa lỗi
    const clearErrors = () => {
        dispatch({ type: 'CLEAR_ERRORS' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signup,
            login,
            logout,
            clearErrors
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};