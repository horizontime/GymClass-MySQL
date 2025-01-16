import React from 'react';

const Modal = ({ isVisible, title, content, onClose }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-80">
                <h3 className="text-lg font-semibold">{title}</h3>
                <br />
                <p className="mt-2 text-sm text-gray-700">{content}</p>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
