import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPageById, updatePage } from '../services/api';
import Navbar from '../components/Navbar';

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const { title, content } = formData;

    useEffect(() => {
        const fetchPage = async () => {
            try {
                setFetching(true);
                const response = await getPageById(id);
                setFormData({
                    title: response.data.title,
                    content: response.data.content
                });
                setError('');
            } catch (err) {
                setError('Failed to fetch page details. Please try again.');
                console.error(err);
            } finally {
                setFetching(false);
            }
        };

        if (id) {
            fetchPage();
        }
    }, [id]);

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            setError('Title and content are required');
            return;
        }

        try {
            setLoading(true);
            setError('');

            await updatePage(id, {
                title,
                content
            });

            navigate('/dashboard', {
                state: { message: 'Journal entry updated successfully!' }
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to update journal entry. Please try again.'
            );
            setLoading(false);
        }
    };

    if (fetching) {
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

    return (
        <div className="min-h-screen bg-[#0F1415] bg-opacity-95" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")', backgroundSize: '400px 400px'}}>
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="bg-[#1F2526] rounded-lg shadow-lg border border-[#D4A017] p-6 bg-opacity-90">
                    <h1 className="text-2xl font-cinzel text-[#E8D5B9] mb-6">Edit Journal Entry</h1>

                    {error && (
                        <div className="bg-[#6B2D2D] bg-opacity-80 border-l-4 border-[#D4A017] p-4 mb-4 rounded">
                            <p className="font-inter text-[#E8D5B9]">{error}</p>
                        </div>
                    )}

                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-inter text-[#E8D5B9] mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={onChange}
                                className="w-full px-3 py-2 font-inter bg-[#0F1415] border border-[#D4A017] rounded focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] text-[#E8D5B9]"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="content" className="block text-sm font-inter text-[#E8D5B9] mb-1">
                                Content
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={content}
                                onChange={onChange}
                                rows="12"
                                className="w-full px-3 py-2 font-inter bg-[#0F1415] border border-[#D4A017] rounded focus:outline-none focus:ring-2 focus:ring-[#D4A017] focus:border-[#D4A017] text-[#E8D5B9]"
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="px-4 py-2 border border-[#D4A017] rounded font-inter text-[#E8D5B9] bg-[#1F2526] hover:bg-[#D4A017] hover:text-[#0F1415]"
                            >
                                Cancel
                            </button>
                            <button
                                ений                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-[#6B2D2D] hover:bg-[#D4A017] text-[#E8D5B9] rounded font-inter disabled:opacity-50"
                            >
                                {loading ? 'Updating...' : 'Update Entry'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPage;