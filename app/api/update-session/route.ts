import { getSession, updateSession } from "@/lib/sessionManager";
import { NextApiRequest, NextApiResponse } from "next";


export async function POST(req: NextApiRequest, res: NextApiResponse){
    // 
    const {studentId, role, status, firstName, lastName, email, expiryTime} = req.body;

    try{
        // 
    const session = await getSession(req, res);
    session.userId = studentId
    session.role = role
    session.status = status
    session.firstname = firstName
    session.lastname = lastName
    session.email = email
    session.expiryTime = expiryTime

    await updateSession(req, res, session) 
    }

    catch(error){
    res.status(405).end(`Method ${req.method} Not Allowed`);

    }

    return res.status(200).json({message: "Session details updated successfully"})


}