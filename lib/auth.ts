import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import dotenv from "dotenv";
dotenv.config();


// export const { handlers, auth, signIn, signOut } = NextAuth({
    export const {handler} = NextAuth({

    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID ?? "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
        }),
    ],
});
