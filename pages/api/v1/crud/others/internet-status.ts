import {NextApiRequest, NextApiResponse} from 'next';
import {exec} from 'child_process';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'GET'){
        res.status(405).json({error: 'Method not allowed'});
        return;
    }
    try {
        const testHost = "google.com";
        const testPort = 443;
    
        // Check internet connectivity by attempting to connect to google.com on port 443
        const { execSync } = require("child_process");
        execSync(`nc -zw1 ${testHost} ${testPort}`);
        
        // If the command executed successfully, respond with a success message
        res.status(200).json({ message: "Internet connectivity check successful." , status: true});
      } catch (error) {
        // If there's an error during the connectivity check, respond with an error message
        console.error("Error checking internet connectivity:", error);
        res.status(500).json({ error: "Internal server error" });
      }
  }
  