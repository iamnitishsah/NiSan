import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        password2: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        feedback: { warning: '', suggestions: [] }
    });

    const { first_name, last_name, username, email, password, password2 } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (e.target.name === 'password') {
            checkPasswordStrength(e.target.value);
        }
    };

    const checkPasswordStrength = (password) => {
        let score = 0;
        let feedback = { warning: '', suggestions: [] };

        if (password.length === 0) {
            score = 0;
        } else if (password.length < 6) {
            score = 1;
            feedback.warning = 'Password is too short';
            feedback.suggestions.push('Use at least 6 characters');
        } else if (password.length < 10) {
            score = 2;
        } else {
            score = 3;
        }

        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        score = Math.min(score, 5);

        if (score < 3) {
            if (!/[A-Z]/.test(password)) {
                feedback.suggestions.push('Add an uppercase letter');
            }
            if (!/[0-9]/.test(password)) {
                feedback.suggestions.push('Add a number');
            }
            if (!/[^A-Za-z0-9]/.test(password)) {
                feedback.suggestions.push('Add a special character');
            }
        }

        setPasswordStrength({ score, feedback });
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength.score <= 1) return 'bg-[#6B2D2D]';
        if (passwordStrength.score <= 3) return 'bg-[#D4A017]';
        return 'bg-[#2D4A2D]';
    };

    const getPasswordStrengthText = () => {
        if (password.length === 0) return '';
        if (passwordStrength.score <= 1) return 'Very Weak';
        if (passwordStrength.score <= 2) return 'Weak';
        if (passwordStrength.score <= 3) return 'Medium';
        if (passwordStrength.score <= 4) return 'Strong';
        return 'Very Strong';
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }

        if (passwordStrength.score < 3) {
            setError('Password is too weak. ' + passwordStrength.feedback.warning +
                (passwordStrength.feedback.suggestions.length ? ' ' + passwordStrength.feedback.suggestions.join(' ') : ''));
            return;
        }

        try {
            setLoading(true);
            setError('');

            await registerUser({
                first_name,
                last_name,
                username,
                email,
                password,
                password2
            });

            navigate('/login', {
                state: {
                    message: 'Registration successful! Please log in.'
                }
            });
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.response?.data?.error ||
                (err.response?.data?.password ? err.response.data.password.join(' ') :
                    'Registration failed. Please try again.');
            setError(errorMessage);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F1415] bg-opacity-95 flex flex-col justify-center py-8 sm:px-6 lg:px-8" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")', backgroundSize: '400px 400px'}}>
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="text-[#D4A017] font-cinzel mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-center text-3xl font-cinzel text-[#E8D5B9]">
                    Begin Your NiSan Chronicle
                </h2>
                <p className="mt-2 text-center text-sm font-inter italic text-[#D4A017]">
                    Create your personal journal today
                </p>
            </div>

            <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-[#1F2526] py-8 px-6 shadow-md sm:px-10 border border-[#D4A017] bg-opacity-90">
                    {error && (
                        <div className="bg-[#6B2D2D] bg-opacity-80 border-l-4 border-[#D4A017] p-4 mb-6 rounded">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-[#D4A017]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-inter text-[#E8D5B9]">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={onSubmit}>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first_name" className="block text-sm font-inter text-[#D4A017] mb-1">
                                    First Name
                                </label>
                                <input
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    value={first_name}
                                    onChange={onChange}
                                    className="w-full px-4 py-2.5 text-sm rounded-sm font-inter bg-[#0F1415] border border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] placeholder-[#E8D5B9] text-[#E8D5B9] transition duration-200"
                                    placeholder="Jane"
                                />
                            </div>

                            <div>
                                <label htmlFor="last_name" className="block text-sm font-inter text-[#D4A017] mb-1">
                                    Last Name
                                </label>
                                <input
                                    id="last_name"
                                    name="last_name"
                                    type="text"
                                    value={last_name}
                                    onChange={onChange}
                                    className="w-full px-4 py-2.5 text-sm rounded-sm font-inter bg-[#0F1415] border border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] placeholder-[#E8D5B9] text-[#E8D5B9] transition duration-200"
                                    placeholder="Austen"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-inter text-[#D4A017] mb-1">
                                Your Pen Name
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={onChange}
                                className="w-full px-4 py-2.5 text-sm rounded-sm font-inter bg-[#0F1415] border border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] placeholder-[#E8D5B9] text-[#E8D5B9] transition duration-200"
                                placeholder="chronicler123"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-inter text-[#D4A017] mb-1">
                                Correspondence Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={onChange}
                                className="w-full px-4 py-2.5 text-sm rounded-sm font-inter bg-[#0F1415] border border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] placeholder-[#E8D5B9] text-[#E8D5B9] transition duration-200"
                                placeholder="jane@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-inter text-[#D4A017] mb-1">
                                Secret Word
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={onChange}
                                className="w-full px-4 py-2.5 text-sm rounded-sm font-inter bg-[#0F1415] border border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] placeholder-[#E8D5B9] text-[#E8D5B9] transition duration-200"
                                placeholder="••••••••"
                            />
                            {password.length > 0 && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-inter italic text-[#D4A017]">
                                            Word strength: {getPasswordStrengthText()}
                                        </span>
                                    </div>
                                    <div className="w-full bg-[#0F1415] rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full ${getPasswordStrengthColor()}`}
                                            style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    {passwordStrength.feedback.suggestions.length > 0 && (
                                        <ul className="mt-1 text-xs font-inter text-[#D4A017] list-disc pl-5">
                                            {passwordStrength.feedback.suggestions.map((suggestion, index) => (
                                                <li key={index}>{suggestion}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password2" className="block text-sm font-inter text-[#D4A017] mb-1">
                                Confirm Secret Word
                            </label>
                            <input
                                id="password2"
                                name="password2"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password2}
                                onChange={onChange}
                                className="w-full px-4 py-2.5 text-sm rounded-sm font-inter bg-[#0F1415] border border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] placeholder-[#E8D5B9] text-[#E8D5B9] transition duration-200"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center items-center py-3 px-4 border border-[#D4A017] rounded-sm shadow-md text-sm font-inter text-[#E8D5B9] bg-[#6B2D2D] hover:bg-[#D4A017] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A017] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#E8D5B9]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Binding pages...
                                    </>
                                ) : 'Create Your Journal'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#D4A017]"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#1F2526] font-inter text-[#D4A017]">
                                    Already have a journal?
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <Link
                                to="/login"
                                className="text-sm font-inter italic text-[#E8D5B9] hover:text-[#D4A017] transition duration-200 border-b border-[#D4A017]"
                            >
                                Open your existing journal
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;