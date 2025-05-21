import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPageById, deletePage } from '../services/api';
import { format } from 'date-fns';
import Navbar from '../components/Navbar';

const ViewPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch page details when component mounts
    useEffect(() => {
        const fetchPage = async () => {
            try {
                setLoading(true);
                const response = await getPageById(id);
                setPage(response.data);
                setError('');
            } catch (err) {
                setError('Failed to fetch page details. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPage();
        }
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this diary page?')) {
            try {
                await deletePage(id);
                navigate('/dashboard', {
                    state: { message: 'Diary page deleted successfully!' }
                });
            } catch (err) {
                setError('Failed to delete page. Please try again.');
                console.error(err);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="container mx-auto px-4 py-8 flex justify-center items-center">
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Loading page content...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !page) {
        return (
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error || 'Page not found'}
                    </div>
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Format dates
    const formattedCreatedAt = format(new Date(page.created_at), 'MMMM dd, yyyy HH:mm');
    const formattedUpdatedAt = format(new Date(page.updated_at), 'MMMM dd, yyyy HH:mm');

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-6 border-b">
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold text-gray-800">{page.title}</h1>
                            <div className="flex space-x-3">
                                <Link
                                    to={`/edit-page/${page.id}`}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500 flex space-x-4">
                            <span>Created: {formattedCreatedAt}</span>
                            <span>Updated: {formattedUpdatedAt}</span>
                        </div>
                    </div>

                    <div className="p-6 bg-gray-50 prose max-w-none">
                        {/* Split content by paragraphs and render with proper spacing */}
                        {page.content.split('\n').map((paragraph, index) => (
                            paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
                        ))}
                    </div>

                    <div className="p-6 border-t bg-white">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPage;