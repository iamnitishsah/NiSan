import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const PageCard = ({ page, onDelete }) => {
    // Format dates
    const formattedCreatedAt = format(new Date(page.created_at), 'MMM dd, yyyy');
    const formattedUpdatedAt = format(new Date(page.updated_at), 'MMM dd, yyyy');

    // Truncate content for preview
    const truncatedContent = page.content.length > 150
        ? `${page.content.substring(0, 150)}...`
        : page.content;

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">{page.title}</h3>
                <div className="flex space-x-2">
                    <Link
                        to={`/edit-page/${page.id}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => onDelete(page.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                        Delete
                    </button>
                </div>
            </div>

            <p className="text-gray-600 mt-2">{truncatedContent}</p>

            <div className="mt-4 text-sm text-gray-500 flex justify-between">
                <span>Created: {formattedCreatedAt}</span>
                <span>Updated: {formattedUpdatedAt}</span>
            </div>

            <Link
                to={`/page/${page.id}`}
                className="inline-block mt-3 text-blue-600 hover:text-blue-800 font-medium"
            >
                Read more →
            </Link>
        </div>
    );
};

export default PageCard;