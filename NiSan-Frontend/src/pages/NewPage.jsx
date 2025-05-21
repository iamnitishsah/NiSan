import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPage } from '../services/api';
import Navbar from '../components/Navbar';

const NewPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { title, content } = formData;

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

            await createPage({
                title,
                content
            });

            navigate('/dashboard', {
                state: { message: 'Journal entry created successfully!' }
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to create journal entry. Please try again.'
            );
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F1415] bg-opacity-95" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/old-paper.png")', backgroundSize: '400px 400px'}}>
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="bg-[#1F2526] rounded-lg shadow-lg border border-[#D4A017] p-6 bg-opacity-90">
                    <h1 className="text-2xl font-cinzel text-[#E8D5B9] mb-6">Create New Journal Entry</h1>

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
                                placeholder="Give your journal entry a title"
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
                                placeholder="Write your thoughts, experiences, or whatever you'd like to remember..."
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
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-[#6B2D2D] hover:bg-[#D4A017] text-[#E8D5B9] rounded font-inter disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save Entry'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewPage;