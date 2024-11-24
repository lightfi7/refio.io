"use client";

import { useEffect } from 'react';

const Toast = ({ message, type, onDismiss }: {
    message: string,
    type: 'error' | 'info' | 'success' | 'warning',
    onDismiss: () => void,
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 3000); // Dismiss after 3 seconds

        return () => clearTimeout(timer);
    }, [onDismiss]);

    const toastClasses = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500',
    };

    return (
        <div className={`fixed bottom-5 left-5 p-4 rounded-lg shadow-lg text-white ${toastClasses[type]} bg-opacity-75 backdrop:blur-3xl`}>
            <div className="flex justify-between items-center">
                <p>{message}</p>
                <button onClick={onDismiss} className="ml-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Toast;