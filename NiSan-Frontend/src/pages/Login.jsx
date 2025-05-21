import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../services/api';
import { saveTokens, saveUser, parseJwt } from '../services/auth';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const { username, password } = formData;

    useEffect(() => {
        if (location.state?.message) {
            setSuccess(location.state.message);
        }
    }, [location.state]);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');

            const response = await loginUser({
                username,
                password
            });

            saveTokens(
                response.data.access,
                response.data.refresh
            );

            const userData = parseJwt(response.data.access);

            saveUser({
                id: userData.user_id,
                username: userData.username
            });

            navigate('/dashboard');
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                'Login failed. Please check your credentials and try again.'
            );
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F1415] bg-opacity-95 flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")', backgroundSize: '400px 400px'}}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="text-[#D4A017] text-5xl font-cinzel">⚯͛</div>
                </div>
                <h2 className="mt-2 text-center text-3xl font-cinzel text-[#E8D5B9]">
                    Enter NiSan
                </h2>
                <p className="mt-2 text-center text-sm font-inter italic text-[#D4A017]">
                    Continue your chronicle
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-[#1F2526] bg-opacity-90 py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-[#D4A017]">
                    {error && (
                        <div className="bg-[#6B2D2D] bg-opacity-80 border-l-4 border-[#D4A017] text-[#E8D5B9] px-4 py-3 rounded mb-4 font-inter">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-[#2D4A2D] border-l-4 border-[#D4A017] text-[#E8D5B9] px-4 py-3 rounded mb-4 font-inter">
                            {success}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-inter text-[#D4A017]">
                                Your Pen Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={onChange}
                                    className="appearance-none block w-full px-3 py-2 bg-[#0F1415] border border-[#D4A017] rounded shadow-sm placeholder-[#E8D5B9] focus:outline-none focus:ring-[#D4A017] focus:border-[#D4A017] text-[#E8D5B9] font-inter"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-inter text-[#D4A017]">
                                Your Secret Word
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={onChange}
                                    className="appearance-none block w-full px-3 py-2 bg-[#0F1415] border border-[#D4A017] rounded shadow-sm placeholder-[#E8D5B9] focus:outline-none focus:ring-[#D4A017] focus:border-[#D4A017] text-[#E8D5B9] font-inter"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-[#D4A017] rounded shadow-md text-sm font-inter text-[#E8D5B9] bg-[#6B2D2D] hover:bg-[#D4A017] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A017] disabled:opacity-50 transition-colors duration-200"
                            >
                                {loading ? 'Casting Spell...' : 'Enter'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="text-center">
                            <p className="text-sm text-[#D4A017] font-inter">
                                New to NiSan?{' '}
                                <Link to="/register" className="font-medium italic text-[#E8D5B9] hover:text-[#D4A017] border-b border-[#D4A017]">
                                    Enroll Now
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;