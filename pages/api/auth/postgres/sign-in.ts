import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { query } from "@/lib/connectToPostgres";
import { getSession, updateSession } from "@/lib/sessionManager";
import { assignUserRole } from "@/lib/userRoleAssigner";

const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password, adminKey, isAdmin } = req.body;

  try {
    // Query the database for the user
    const result = await query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: "Wrong Credentials",
        message: "Please enter a valid email address or password.",
      });
    }

    const user = result.rows[0];

    // Compare the provided password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        error: "Wrong Credentials",
        message: "Please enter a valid email address or password.",
      });
    }

    // Assign user role
    const role = assignUserRole(user, isAdmin, adminKey, ADMIN_SECRET_KEY as string);

    // Retrieve and update session
    const session = await getSession(req, res);
    session.userId = user?.id;
    session.email = user?.email;
    session.role = role;
    session.firstname = user?.firstname;
    session.lastname = user?.lastname;
    session.isAdmin = isAdmin;
    session.isLoggedIn = true;
    await updateSession(req, res, session);
    console.log("Session:: ", session)

    return res.json({ message: "Successfully logged in", session: session });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
