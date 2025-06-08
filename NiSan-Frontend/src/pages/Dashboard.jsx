import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPages, deletePage, searchPages } from '../services/api';
import PageCard from '../components/PageCard';
import Navbar from '../components/Navbar';
import { isAuthenticated } from '../services/auth';

const Dashboard = () => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searching, setSearching] = useState(false);


    useEffect(() => {
        if (!isAuthenticated()) {
            window.location.href = '/login';
        }
    }, []);


    const fetchPages = async () => {
        try {
            setLoading(true);
            const response = await getAllPages();
            setPages(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch your journal entries. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you certain you wish to banish this page from your journal?')) {
            try {
                await deletePage(id);
                setPages(pages.filter(page => page.id !== id));
            } catch (err) {
                setError('Failed to delete page. Please try again.');
                console.error(err);
            }
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            fetchPages();
            return;
        }

        try {
            setSearching(true);
            const response = await searchPages(searchTerm);
            setPages(response.data);
            setSearching(false);
        } catch (err) {
            setError('Failed to search your journal. Please try again.');
            console.error(err);
            setSearching(false);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        fetchPages();
    };

    return (
        <div className="min-h-screen bg-[#0F1415] bg-opacity-95" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")', backgroundSize: '400px 400px'}}>
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <div className="flex items-center mb-4 md:mb-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#D4A017]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h1 className="ml-3 text-2xl font-cinzel text-[#E8D5B9]">Your NiSan Journal</h1>
                    </div>
                    <Link
                        to="/new-page"
                        className="flex items-center py-2.5 px-4 border border-[#D4A017] rounded shadow-md text-sm font-inter text-[#E8D5B9] bg-[#6B2D2D] hover:bg-[#D4A017] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A017] transition duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Entry
                    </Link>
                </div>

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

                <div className="mb-8 bg-[#1F2526] p-5 border border-[#D4A017] rounded-lg shadow-lg bg-opacity-90">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row">
                        <div className="relative flex-grow mb-2 sm:mb-0">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search your journal..."
                                className="w-full px-4 py-2.5 rounded font-inter bg-[#0F1415] border border-[#D4A017] focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] placeholder-[#E8D5B9] text-[#E8D5B9] transition duration-200"
                            />
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#E8D5B9] hover:text-[#D4A017]"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={searching}
                            className="sm:ml-2 py-2.5 px-4 border border-[#D4A017] rounded shadow-md text-sm font-inter text-[#E8D5B9] bg-[#6B2D2D] hover:bg-[#D4A017] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A017] disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                        >
                            {searching ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#E8D5B9]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Searching...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Search
                                </div>
                            )}
                        </button>
                    </form>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4A017]"></div>
                        <p className="mt-4 font-inter italic text-[#E8D5B9]">Summoning your journal entries...</p>
                    </div>
                ) : pages.length === 0 ? (
                    <div className="text-center py-12 bg-[#1F2526] rounded-lg shadow-lg border border-[#D4A017] bg-opacity-90">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-[#D4A017]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <h3 className="mt-4 text-lg font-cinzel font-medium text-[#E8D5B9]">Your Journal Awaits Its First Entry</h3>
                        <p className="mt-2 font-inter italic text-[#E8D5B9]">
                            {searchTerm ? 'No pages match your search.' : 'The pages of your journal remain blank, waiting for your words.'}
                        </p>
                        <div className="mt-8">
                            <Link
                                to="/new-page"
                                className="inline-flex items-center py-2.5 px-4 border border-[#D4A017] rounded shadow-md text-sm font-inter text-[#E8D5B9] bg-[#6B2D2D] hover:bg-[#D4A017] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A017] transition duration-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Begin Your Journey
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        {searchTerm && (
                            <p className="mb-6 font-inter italic text-[#E8D5B9] text-center">
                                Showing results for "{searchTerm}" — {pages.length} {pages.length === 1 ? 'entry' : 'entries'} found in your journal
                            </p>
                        )}
                        <div className="space-y-6">
                            {pages.map((page) => (
                                <PageCard
                                    key={page.id}
                                    page={page}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center font-inter italic text-sm text-[#E8D5B9] pb-8">
                    <p>
                        {pages.length > 0 && `Your journal contains ${pages.length} ${pages.length === 1 ? 'entry' : 'entries'}`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;