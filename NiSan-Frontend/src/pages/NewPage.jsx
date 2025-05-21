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

        // Basic validation
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

            // Redirect to dashboard after successful creation
            navigate('/dashboard', {
                state: { message: 'Diary page created successfully!' }
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to create diary page. Please try again.'
            );
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Diary Entry</h1>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={onChange}
                                placeholder="Give your diary entry a title"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                                Content
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                value={content}
                                onChange={onChange}
                                rows="12"
                                placeholder="Write your thoughts, experiences, or whatever you'd like to remember..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
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