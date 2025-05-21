import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const PageCard = ({ page, onDelete }) => {
    const formattedCreatedAt = format(new Date(page.created_at), 'MMMM dd, yyyy');
    const formattedUpdatedAt = format(new Date(page.updated_at), 'MMMM dd, yyyy');

    const truncatedContent = page.content.length > 150
        ? `${page.content.substring(0, 150)}...`
        : page.content;

    return (
        <div className="bg-parchment border border-gold rounded-lg shadow-lg p-6 mb-5 transform hover:scale-[1.01] transition-transform duration-200">
            <div className="flex justify-between items-start">
                <h3 className="text-xl font-harry font-medium text-dark-gray">{page.title}</h3>
                <div className="flex space-x-2">
                    <Link
                        to={`/edit-page/${page.id}`}
                        className="flex items-center font-harry text-dark-red hover:text-maroon transition duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="text-sm">Edit</span>
                    </Link>
                    <button
                        onClick={() => onDelete(page.id)}
                        className="flex items-center font-harry text-dark-red hover:text-maroon transition duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="text-sm">Delete</span>
                    </button>
                </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gold">
                <p className="font-harry text-dark-gray italic leading-relaxed">{truncatedContent}</p>
            </div>

            <div className="mt-4 flex justify-between text-xs font-harry italic text-dark-gray">
                <span>Written on {formattedCreatedAt}</span>
                <span>Last edited {formattedUpdatedAt}</span>
            </div>

            <div className="mt-3 text-center">
                <Link
                    to={`/page/${page.id}`}
                    className="inline-block font-harry italic text-dark-red hover:text-maroon transition duration-200 border-b border-gold"
                >
                    Continue reading...
                </Link>
            </div>
        </div>
    );
};

export default PageCard;