import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPages, deletePage, searchPages } from '../services/api';
import PageCard from '../components/PageCard';
import Navbar from '../components/Navbar';

const Dashboard = () => {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [searching, setSearching] = useState(false);

    const fetchPages = async () => {
        try {
            setLoading(true);
            const response = await getAllPages();
            setPages(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch your diary pages. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this diary page?')) {
            try {
                await deletePage(id);
                // Remove the deleted page from state
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
            setError('Failed to search pages. Please try again.');
            console.error(err);
            setSearching(false);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        fetchPages();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">My Diary Pages</h1>
                    <Link
                        to="/new-page"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        New Entry
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="mb-6">
                    <form onSubmit={handleSearch} className="flex">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search diary pages..."
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={searching}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r disabled:opacity-50"
                        >
                            {searching ? 'Searching...' : 'Search'}
                        </button>
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 ml-2 px-4 py-2 rounded"
                            >
                                Clear
                            </button>
                        )}
                    </form>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading your diary pages...</p>
                    </div>
                ) : pages.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <svg
                            className="mx-auto h-16 w-16 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">No diary pages found</h3>
                        <p className="mt-1 text-gray-500">
                            {searchTerm ? 'No results match your search.' : 'You have not created any diary pages yet.'}
                        </p>
                        <div className="mt-6">
                            <Link
                                to="/new-page"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                            >
                                Create your first entry
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        {searchTerm && (
                            <p className="mb-4 text-gray-600">
                                Showing results for "{searchTerm}" ({pages.length} {pages.length === 1 ? 'page' : 'pages'} found)
                            </p>
                        )}
                        <div className="space-y-4">
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

                {/* Pagination UI could be added here if needed */}

                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>
                        {pages.length > 0 && `Showing ${pages.length} diary ${pages.length === 1 ? 'entry' : 'entries'}`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;