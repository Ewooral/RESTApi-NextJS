import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { deleteSession } from "@/repositories/users/userRepository";

export interface sessionData{
    session_id?: string;
    userId?: string;
    sessionDetails?: Record<string, any>;
    email?: string;
    firstname?:string;
    lastname?:string;
    role?:string;
    imageUrl?: string;
    imageId?: string;
    isAdmin?: boolean;
    status?: string;
    isLoggedIn: boolean;
    expiryTime?: number;
    
}
export interface CustomApiRequest extends NextApiRequest {
  get: (name: string) => string | undefined;
  set: (name: string, value: string) => void;
}
// Adjust the sessionOptions and any other configurations as necessary
export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD!,
    cookieName: "ewooral-session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // sameSite: "strict",
        maxAge: 1000 * 60 * 30, // 30 minutes
    }
}

export const defaultSession:sessionData = {
    isLoggedIn: false,
}

// Function to retrieve session
export const getSession = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getIronSession<sessionData>(req, res, sessionOptions);
    if (!session.isLoggedIn) {
      session.isLoggedIn = defaultSession.isLoggedIn;
      return session;
      
    }

     // Check if session has expired
     if (session.expiryTime && session.expiryTime <= new Date().getTime()){
      // Invalidate session if expired
      session.isLoggedIn = false;
      session.expiryTime = undefined;
      // Log user out from database
      // await deleteSession(session.userId as string);
  }
    return session;
  };
 



// Function to update session
export async function updateSession(req: NextApiRequest, res: NextApiResponse, session: IronSession<sessionData>): Promise<void> {
    return await session.save()
}
