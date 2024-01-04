import { useState } from 'react';
import axios from 'axios';

interface Notification {
    message: string;
    read: boolean;
    timestamp: number;
}

function FetchNotifications() {
    const [userId, setUserId] = useState('');
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        try {
            const response = await axios.get(`/api/notifications/read?userId=${userId}`);
            setNotifications(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl mb-4 text-center">Fetch Notifications</h2>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    className="block w-full p-2 mb-4 border rounded"
                    placeholder="User ID"
                />
                <button type="submit" className="block w-full p-2 text-white bg-blue-500 rounded">
                    Fetch Notifications
                </button>
            </form>
            <div className="mt-4">
                {notifications.map((notification, index) => (
                    <div key={index} className="p-2 mb-2 bg-white rounded shadow-md">
                        <p><strong>Read:</strong> {notification.read ? 'Yes' : 'No'}</p>
                        <p><strong>Timestamp:</strong> {new Date(notification.timestamp).toLocaleString()}</p>
                        <p><strong>Message:</strong> {notification.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FetchNotifications;