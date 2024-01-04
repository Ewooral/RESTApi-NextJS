import { useState } from 'react';
import axios from 'axios';

function UpdateNotification() {
  const [id, setId] = useState('');
  const [read, setRead] = useState(false);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await axios.put('/api/notifications/update', { id, read });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center">Update Notification</h2>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="block w-full p-2 mb-4 border rounded"
          placeholder="Notification ID"
        />
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={read}
            onChange={(e) => setRead(e.target.checked)}
            className="mr-2"
          />
          <span>Read</span>
        </label>
        <button type="submit" className="block w-full p-2 text-white bg-blue-500 rounded">
          Update Notification
        </button>
      </form>
    </div>
  );
}

export default UpdateNotification;