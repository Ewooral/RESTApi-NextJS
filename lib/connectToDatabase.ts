import { MongoClient } from 'mongodb';
require('dotenv').config();

let cachedClient: any = null;
const uri = process.env.MONGODB_URI;


async function connectToDatabase() {
    if (cachedClient) {
        return cachedClient;
    }

    if (!uri) {
        throw new Error('Please define the MONGODB_URI environment variable');
    }
    try {
        const client = await MongoClient.connect(uri);
    
        cachedClient = client;
        return cachedClient;
    } catch (error) {
        console.error('Failed to connect to the database', error);
    }
}

export default connectToDatabase;