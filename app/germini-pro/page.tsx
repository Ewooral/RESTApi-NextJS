'use client'
import { useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


const GemGPTComponent: React.FC = () => {
  const [story, setStory] = useState('');
  const [input, setInput] = useState('');

  const generateStory = async () => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB5EkFBSGGR0vI02yfqTZgCxrU2W-LnQxQ`,
        {
          contents: [
            {
              parts: [
                {
                  text: input,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      setStory(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      // @ts-ignore
      console.error("GemGPT API request failed:", error.message);
       // @ts-ignore
      if (error.response) {
         // @ts-ignore
        console.error("Response status:", error.response.status);
         // @ts-ignore
        console.error("Response data:", error.response.data);
      }
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="p-6 bg-white rounded shadow-md">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your prompt"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button
        onClick={generateStory}
        className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Generate Story
      </button>
    </div>
    {story && (
      <div className="mt-6 p-4 text-center bg-green-100 border border-green-200 rounded shadow-md">
        <p className="text-green-700">{story}</p>
      </div>
    )}
  </div>
  );
};

export default GemGPTComponent;
