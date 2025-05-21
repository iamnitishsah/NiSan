import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearTokens, isAuthenticated, getUser } from '../services/auth';

const Navbar = () => {
    const navigate = useNavigate();
    const authenticated = isAuthenticated();
    const user = getUser();

    const handleLogout = () => {
        clearTokens();
        navigate('/login');
    };

    return (
        <nav className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    DiaryApp
                </Link>

                <div className="flex items-center space-x-4">
                    {authenticated ? (
                        <>
                            <span>Welcome, {user?.username || 'User'}</span>
                            <Link to="/dashboard" className="hover:text-blue-200">
                                Dashboard
                            </Link>
                            <Link to="/new-page" className="hover:text-blue-200">
                                New Entry
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-blue-200">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-white text-blue-600 hover:bg-blue-100 px-3 py-1 rounded"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;