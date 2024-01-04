import { useState } from 'react';
import axios from 'axios';

function DeleteNotification() {
  const [id, setId] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await axios.delete('/api/notifications/delete', { data: { id } });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center">Delete Notification</h2>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="block w-full p-2 mb-4 border rounded"
          placeholder="Notification ID"
        />
        <button type="submit" className="block w-full p-2 text-white bg-red-500 rounded">
          Delete Notification
        </button>
      </form>
    </div>
  );
}

export default DeleteNotification;