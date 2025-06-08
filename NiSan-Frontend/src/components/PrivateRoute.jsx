import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';

const PrivateRoute = () => {
    const [authChecked, setAuthChecked] = useState(false);
    const location = useLocation();

    useEffect(() => {
        // Immediate synchronous check
        if (!isAuthenticated()) {
            setAuthChecked(true);
        } else {
            // Optional: Add async token validation here if needed
            setAuthChecked(true);
        }
    }, [location]);

    if (!authChecked) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4A017]"></div>
            </div>
        );
    }

    return isAuthenticated() ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default PrivateRoute;