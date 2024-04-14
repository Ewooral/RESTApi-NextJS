import { SessionOptions } from "iron-session";

export interface sessionData{
    userId?: string;
    email?: string;
    firstname?:string;
    lastname?:string;
    role?:string;
    image?: string;
    isAdmin?: boolean;
    isLoggedIn: boolean;
}

export type UserInfoProp = {
    id: any,
    email: string,
    isstudent?: boolean,
    firstname: string,
    lastname: string,
    title: string,
    terms: boolean
}

export const defaultSession:sessionData = {
    isLoggedIn: false,
}

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD!,
    cookieName: "ewooral-session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        // sameSite: "strict",
        // maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    }
}