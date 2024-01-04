import { useState } from 'react';
import axios from 'axios';

function CreateNotification() {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/notifications/create', { userId, message });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center">Create Notification</h2>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="block w-full p-2 mb-4 border rounded"
          placeholder="User ID"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="block w-full p-2 mb-4 border rounded"
          placeholder="Message"
        />
        <button type="submit" className="block w-full p-2 text-white bg-blue-500 rounded">
          Create Notification
        </button>
      </form>
    </div>
  );
}

export default CreateNotification;