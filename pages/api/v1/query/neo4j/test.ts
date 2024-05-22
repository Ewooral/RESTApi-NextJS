import { NextApiRequest, NextApiResponse } from 'next';
import runQuery  from '@/lib/connectToNeo4J';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
    const query = 'MATCH (n) RETURN n LIMIT 5';
    const result = await runQuery(query, ["Boys", "Girls"]);
    console.log(result);
    res.status(200).json({result, isSuccess:true, message:"Query executed successfully"});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}