import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";
import { getSession, updateSession } from "@/lib/sessionManager";
import { assignUserRole } from "@/lib/userRoleAssigner";
import { userStatusAssigner } from "@/lib/userStatusAssigner";
import { getUsersInfoByEmail, updateUserRoleAndStatus_POSTGRES } from "@/repositories/users/userRepository";

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
    // Query the database for the user's credentials including image url from the image table using image_id as a reference
    const result = await getUsersInfoByEmail(email);

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
    const updatedRole = assignUserRole(user, isAdmin, adminKey, ADMIN_SECRET_KEY as string);

    // Assign user status
    const updatedStatus = userStatusAssigner(user, updatedRole);

    // Update the user's role and status in the database
    await updateUserRoleAndStatus_POSTGRES(user.id, updatedRole, updatedStatus);

    // Retrieve and update session
    const session = await getSession(req, res);
    session.session_id = generateSessionId();
    session.userId = user?.id;
    session.email = user?.email;
    session.role = updatedRole;
    session.status = updatedStatus;
    session.firstname = user?.firstname;
    session.lastname = user?.lastname;
    session.isAdmin = isAdmin;
    session.isLoggedIn = true;
    session.imageUrl = user?.image_url;
    session.expiryTime = new Date().getTime() + 3600000; // 1 hour

    await updateSession(req, res, session);
    console.log("Session:: ", session)

    return res.json({ message: "Successfully logged in", session: session });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



// import { v4 as uuidv4 } from 'uuid';
// import { NextApiRequest, NextApiResponse } from "next";
// import bcrypt from "bcryptjs";
// import redis from "@/lib/redis"; // Import the Redis client
// import { assignUserRole } from "@/lib/userRoleAssigner";
// import { userStatusAssigner } from "@/lib/userStatusAssigner";
// import { getUsersInfoByEmail, updateUserRoleAndStatus_POSTGRES } from "@/repositories/users/userRepository";

// const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   const { email, password, adminKey, isAdmin } = req.body;

//   try {
//     // Query the database for the user's credentials including image url from the image table using image_id as a reference
//     const result = await getUsersInfoByEmail(email);

//     if (result.rows.length === 0) {
//       return res.status(401).json({
//         error: "Wrong Credentials",
//         message: "Please enter a valid email address or password.",
//       });
//     }

//     const user = result.rows[0];

//     // Compare the provided password with the hashed password in the database
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({
//         error: "Wrong Credentials",
//         message: "Please enter a valid email address or password.",
//       });
//     }

//     // Assign user role
//     const updatedRole = assignUserRole(user, isAdmin, adminKey, ADMIN_SECRET_KEY as string);

//     // Assign user status
//     const updatedStatus = userStatusAssigner(user, updatedRole);

//     // Update the user's role and status in the database
//     await updateUserRoleAndStatus_POSTGRES(user.id, updatedRole, updatedStatus);

//     // Store user session data in Redis
//     const sessionData = {
//       userId: user.id,
//       email: user.email,
//       role: updatedRole,
//       status: updatedStatus,
//       firstname: user.firstname,
//       lastname: user.lastname,
//       isAdmin: isAdmin,
//       isLoggedIn: true,
//       imageUrl: user.image_url
//     };

//     // Generate a unique session ID (You can use a library like `uuid` for this)
//     const sessionId = generateSessionId();

//     // Store session data in Redis
//     await redis.set(`session:${sessionId}`, JSON.stringify(sessionData));
//     console.log(redis.get(`session:${sessionId}`));

//     return res.json({ message: "Successfully logged in", session: sessionData });
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// Function to generate a unique session ID
function generateSessionId() {
  // Implement your logic to generate a unique session ID
  return uuidv4();
}
