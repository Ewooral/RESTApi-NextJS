import { getIronSession } from 'iron-session';
import { sessionOptions, sessionData, defaultSession, UserInfoProp } from "@/lib/lib"; // Adjust the import path as necessary
import {NextApiRequest, NextApiResponse} from 'next'
// import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

// type extendNextApiReqProps = NextApiRequest & {
//     session: sessionData
//     set: (name: string, value: string, cookie?: Partial<ResponseCookie> | undefined): void; (options: ResponseCookie): void;
//     get: (key: string) => any
// }
export async function setupSession(req: NextApiRequest, user: UserInfoProp) {
    return new Promise(async (resolve, reject) => {
    try {
        // @ts-ignore
        const session = await getIronSession<sessionData>(req, sessionOptions);
        if (!session.isLoggedIn) {
          session.isLoggedIn = defaultSession.isLoggedIn;
        }
        session.userId = user?.id;
        session.email = user?.email;
        session.role = user.isstudent ? 'student' : 'admin'
        session.firstname = user?.firstname;
        session.lastname = user?.lastname;
        // session.isPro = user?.is_pro;
        session.isLoggedIn = true;
        await session.save();
      return session;
      resolve(session);
    } catch (error) {
      reject(error);
    }
  });
}