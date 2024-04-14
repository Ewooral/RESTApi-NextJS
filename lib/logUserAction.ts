import axios from 'axios';

export default async function logUserAction(level: string, message: { }, user: string) {
    try {
        const response = await axios.post('/api/user-actions/log', {
            level,
            message,
            user
        });
        console.log("User Actions:::", response.data);
    } catch (error) {
        console.error('Error logging user action:', error);
    }
}