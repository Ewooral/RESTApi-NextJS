import { useState, useEffect } from 'react';

export function useIsOnline() {
    const [isOnline, setIsOnline] = useState(typeof window !== 'undefined' ? navigator.onLine : true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const goOnline = () => setIsOnline(true);
            const goOffline = () => setIsOnline(false);

            window.addEventListener('online', goOnline);
            window.addEventListener('offline', goOffline);

            return () => {
                window.removeEventListener('online', goOnline);
                window.removeEventListener('offline', goOffline);
            };
        }
    }, []);

    return isOnline;
}