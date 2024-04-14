import type { NextApiRequest, NextApiResponse } from 'next';
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/lib"; // Adjust the import path as necessary

export default async function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
try{
  const session = await getIronSession(req, res, sessionOptions);
  session.destroy();
  res.json({ message: "Successfully logged out" });
}
catch(error){
  console.error("Error occured oo: ", error)
}
}