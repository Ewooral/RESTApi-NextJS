import React from 'react';
import {useRouter} from 'next/navigation'

const NotSignedInCard: React.FC = () => {
    const router = useRouter();

    const handleSignInClick = () => {
        // Navigate to sign in page
        router.push('/sign-in');
    };

    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-4 py-2">
                <h1 className="text-gray-900 font-bold text-3xl">Access Denied</h1>
                <p className="text-gray-600 text-sm mt-1">You&apos;re not signed in, sign in to view this page.</p>
            </div>
            <div className="px-4 py-2 bg-gray-200">
                <button onClick={handleSignInClick} className="text-sm text-blue-500 hover:text-blue-700 font-semibold">Sign In</button>
            </div>
        </div>
    );
};

export default NotSignedInCard;