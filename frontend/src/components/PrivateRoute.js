import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    console.log('PrivateRoute Status:', { 
        isAuthenticated, 
        loading,
        hasToken: !!localStorage.getItem('token')
    });

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    console.log('Authenticated, rendering protected content');
    return children;
};

export default PrivateRoute;