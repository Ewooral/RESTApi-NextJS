import connectToDatabase from '@/lib/connectToDatabase';
import runQuery from '@/lib/connectToNeo4J';
import {query} from '@/lib/connectToPostgres'
import { ObjectId } from 'mongodb';


export async function getUserImageNeo4j(userId: string): Promise<string> {
    const query = `
        MATCH (u:User { id: $userId })
        RETURN u.image_id AS imageId;
    `;
    const params = {
        userId,
    };

    const result = await runQuery(query, params);
    return result[0]?.get('imageId')?.toString() ?? '';
}


// Postgres SQL queries
export async function createImageTable_POSTGRES() {  
    const createTableText = `
      CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        image_id TEXT NOT NULL,
        file_name TEXT NOT NULL,
        image_url TEXT NOT NULL
      );
    `;
    const createIndexText1 = `CREATE INDEX IF NOT EXISTS idx_images_image_id ON images(image_id);`;
    const createIndexText2 = `CREATE INDEX IF NOT EXISTS idx_images_file_name ON images(file_name);`;
  
    await query('BEGIN', []);
    await query(createTableText, []);
    await query(createIndexText1, []);
    await query(createIndexText2, []);
    await query('COMMIT', []);
  }
  
export async function insertImageToTable_POSTGRES(imageId: string, fileName: string, imageUrl: string) {
    try{
        const insertImageQuery = `
      INSERT INTO images (image_id, file_name, image_url)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const values = [imageId, fileName, imageUrl];
    const { rows } = await query(insertImageQuery, values);
    return rows[0].id; // Return the ID of the inserted image
    }
    catch(error){
        console.log(error)
    }
  }
  
export async function updateUserImage_POSTGRES(userId: string, imageId: number) {
    const updateUserQuery = `
      UPDATE users
      SET image_id = $1
      WHERE id = $2;
    `;
    const values = [imageId, userId];
    await query(updateUserQuery, values);
  }
  
  // MongoDB queries
export async function createImageTable_MONGODB() {
    const client = await connectToDatabase();
    const db = client.db('manage-users');
    const imagesCollection = db.collection('images');
  
    await imagesCollection.createIndex({ image_id: 1 });
    await imagesCollection.createIndex({ file_name: 1 });
  }
  
export async function insertImageToTable_MONGODB(imageId: string, fileName: string, imageUrl: string) {
    const client = await connectToDatabase();
    const db = client.db('manage-users');
    const imagesCollection = db.collection('images');
  
    const image = {
      image_id: imageId,
      file_name: fileName,
      image_url: imageUrl,
    };
  
    const result = await imagesCollection.insertOne(image);
    return result.ops[0]._id; // Return the ID of the inserted image
  }
  
export async function updateUserImage_MONGODB(userId: string, imageId: number) {
    const client = await connectToDatabase();
    const db = client.db('manage-users');
    const usersCollection = db.collection('users');
  
    await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: { image_id: imageId } });
  }


export const queryFunctions = {
    updateUserImage_MONGODB,
    insertImageToTable_MONGODB,
    createImageTable_MONGODB
    // Add more query functions here
  };