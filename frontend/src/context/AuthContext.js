import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

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

    // Set auth token in axios headers
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    // Load user on app start
    useEffect(() => {
        if (state.token) {
            setAuthToken(state.token);
        }
        dispatch({ type: 'SET_LOADING', payload: false });
    }, [state.token]);

    // Signup user
    const signup = async (userData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            
            const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
            
            dispatch({
                type: 'SIGNUP_SUCCESS',
                payload: {
                    token: response.data.token,
                    user: response.data.user || { name: userData.name, email: userData.email }
                }
            });
            
            return { success: true, message: response.data.message };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Đăng ký thất bại';
            dispatch({
                type: 'AUTH_ERROR',
                payload: errorMessage
            });
            return { success: false, message: errorMessage };
        }
    };

    // Login user
    const login = async (userData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            
            const response = await axios.post('http://localhost:5000/api/auth/login', userData);
            
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    token: response.data.token,
                    user: response.data.user || { email: userData.email }
                }
            });
            
            return { success: true, message: response.data.message };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại';
            dispatch({
                type: 'AUTH_ERROR',
                payload: errorMessage
            });
            return { success: false, message: errorMessage };
        }
    };

    // Logout user
    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout');
            dispatch({ type: 'LOGOUT' });
        } catch (error) {
            // Even if API fails, still logout locally
            dispatch({ type: 'LOGOUT' });
        }
    };

    // Clear errors
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