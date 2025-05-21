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
        <nav className="bg-[#0F1415] border-b border-[#D4A017] text-[#E8D5B9] p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-cinzel tracking-wider flex items-center">
                    <span className="text-3xl mr-1 text-[#D4A017]">✧</span>
                    <span className="border-b border-[#D4A017]">NiSan</span>
                    <span className="text-3xl ml-1 text-[#D4A017]">✧</span>
                </Link>

                <div className="flex items-center space-x-6">
                    {authenticated ? (
                        <>
                            <span className="font-inter text-[#D4A017]">
                                Welcome, {user?.username || 'Chronicler'}
                            </span>
                            <Link to="/dashboard" className="font-inter hover:text-[#D4A017] transition-colors duration-200 border-b border-transparent hover:border-[#D4A017]">
                                My Journal
                            </Link>
                            <Link to="/new-page" className="font-inter hover:text-[#D4A017] transition-colors duration-200 border-b border-transparent hover:border-[#D4A017]">
                                New Entry
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-[#6B2D2D] hover:bg-[#D4A017] text-[#E8D5B9] px-4 py-2 rounded font-inter transition-colors duration-200 shadow border border-[#D4A017]"
                            >
                                Exit NiSan
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="font-inter hover:text-[#D4A017] transition-colors duration-200 border-b border-transparent hover:border-[#D4A017]">
                                Enter NiSan
                            </Link>
                            <Link
                                to="/register"
                                className="bg-[#6B2D2D] hover:bg-[#D4A017] text-[#E8D5B9] px-4 py-2 rounded font-inter transition-colors duration-200 shadow border border-[#D4A017]"
                            >
                                Join NiSan
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;