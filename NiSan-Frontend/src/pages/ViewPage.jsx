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
        if (window.confirm('Are you sure you want to delete this journal page?')) {
            try {
                await deletePage(id);
                navigate('/dashboard', {
                    state: { message: 'Journal page deleted successfully!' }
                });
            } catch (err) {
                setError('Failed to delete page. Please try again.');
                console.error(err);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F1415] bg-opacity-95">
                <Navbar />
                <div className="container mx-auto px-4 py-8 flex justify-center items-center">
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A017] mx-auto"></div>
                        <p className="mt-2 font-inter text-[#E8D5B9]">Loading page content...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !page) {
        return (
            <div className="min-h-screen bg-[#0F1415] bg-opacity-95">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="bg-[#6B2D2D] bg-opacity-80 border border-[#D4A017] text-[#E8D5B9] px-4 py-3 rounded mb-4">
                        {error || 'Page not found'}
                    </div>
                    <div className="text-center">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-4 py-2 bg-[#6B2D2D] hover:bg-[#D4A017] text-[#E8D5B9] rounded-md font-inter"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const formattedCreatedAt = format(new Date(page.created_at), 'MMMM dd, yyyy HH:mm');
    const formattedUpdatedAt = format(new Date(page.updated_at), 'MMMM dd, yyyy HH:mm');

    return (
        <div className="min-h-screen bg-[#0F1415] bg-opacity-95" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")', backgroundSize: '400px 400px'}}>
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="bg-[#1F2526] rounded-lg shadow overflow-hidden border border-[#D4A017] bg-opacity-90">
                    <div className="p-6 border-b border-[#D4A017]">
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-cinzel text-[#E8D5B9]">{page.title}</h1>
                            <div className="flex space-x-3">
                                <Link
                                    to={`/edit-page/${page.id}`}
                                    className="px-4 py-2 bg-[#6B2D2D] hover:bg-[#D4A017] text-[#E8D5B9] rounded-md font-inter"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-[#6B2D2D] hover:bg-[#D4A017] text-[#E8D5B9] rounded-md font-inter"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="mt-2 text-sm text-[#D4A017] font-inter flex space-x-4">
                            <span>Created: {formattedCreatedAt}</span>
                            <span>Updated: {formattedUpdatedAt}</span>
                        </div>
                    </div>

                    <div className="p-6 bg-[#0F1415] text-[#E8D5B9] font-inter prose max-w-none">
                        {page.content.split('\n').map((paragraph, index) => (
                            paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
                        ))}
                    </div>

                    <div className="p-6 border-t border-[#D4A017] bg-[#1F2526]">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-4 py-2 border border-[#D4A017] rounded-md text-[#E8D5B9] bg-[#1F2526] hover:bg-[#D4A017] hover:text-[#0F1415] font-inter"
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