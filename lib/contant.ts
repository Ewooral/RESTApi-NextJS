require('dotenv').config()
 const GERMINI_API_KEY = process.env.GERMINI_API_KEY

export const API_URI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GERMINI_API_KEY}`