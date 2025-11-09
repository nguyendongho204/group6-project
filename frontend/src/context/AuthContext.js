import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

axios.defaults.baseURL = 'http://localhost:5001/api';

const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: Boolean(localStorage.getItem('token')),
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
        
        case 'UPDATE_USER':
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

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

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                setAuthToken(token);
                try {
                    const res = await axios.get('/auth/me');
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: {
                            token: token,
                            user: res.data.user
                        }
                    });
                } catch (error) {
                    console.error('Error loading user:', error);
                    dispatch({ type: 'AUTH_ERROR' });
                }
            }
            dispatch({ type: 'SET_LOADING', payload: false });
        };

        loadUser();
    }, []);

    const updateUserContext = (userData) => {
        dispatch({
            type: 'UPDATE_USER',
            payload: userData
        });
    };

    const login = async (userData) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            
            const response = await axios.post('/auth/login', userData);
            
            setAuthToken(response.data.token);
            
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    token: response.data.token,
                    user: response.data.user
                }
            });
            
            return { 
                success: true, 
                message: 'Đăng nhập thành công!'
            };
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            
            dispatch({
                type: 'AUTH_ERROR',
                payload: error.response?.data?.message || 'Đăng nhập thất bại'
            });
            
            return { 
                success: false, 
                message: error.response?.data?.message || 'Đăng nhập thất bại'
            };
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const logout = async () => {
        try {
            await axios.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setAuthToken(null);
            dispatch({ type: 'LOGOUT' });
        }
    };

    const clearErrors = () => {
        dispatch({ type: 'CLEAR_ERRORS' });
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            logout,
            clearErrors,
            updateUserContext
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