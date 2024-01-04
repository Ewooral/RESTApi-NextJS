import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import connectToDatabase from "@/lib/connectToDatabase";
import dotenv from "dotenv";
dotenv.config();

const my_secret_key = process.env.MY_SECRET_PIN;
const encryptionKey = crypto.scryptSync("G@d!$g@@d", "salt", 32);
const iv = crypto.randomBytes(16);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = req.body;

      // Destructure email and password from data object
      const { email, password, role, secretPin } = data;
      console.log("DATA::", data);
      // Validate input...

      const client = await connectToDatabase();
      const db = client.db("manage-users"); // your database name
      /**
// ? const user = await db.collection('users').findOne({ email });
 * This line is querying the users collection in the database for a document where the email 
 * field matches the email provided in the request body. If a match is found, it's 
 * assigned to the user variable. If no match is found, user is null.
 */
      const user = await db.collection("users").findOne({ email });
      console.log("USER:::", user);
      /**
       * ? if (!user || !await bcrypt.compare(password, user.password)) {
       * This line is checking if user is null or if the password provided in the request body does not match the hashed password stored in the user document. bcrypt.compare(password, user.password) returns a promise that resolves to true if the password matches the hashed password, and false otherwise.
       * If either of these conditions is true, the function returns a response with a status code of 400 and a message of 'Invalid credentials'. This indicates that the provided email or password is invalid.
       */

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid Password!" });
      }

      // If the user's role in the database does not match the role provided in the request body,
      // return an error

      if (role !== user.role) {
        return res.status(400).json({
          message:
            " You registered as a " +
            user.role +
            " but you are trying to login as a " +
            role +
            " user ",
        });
      }

      /**
       * ? const token = jwt.sign({ userId: user._id }, my_secret_key, { expiresIn: '1h' });
       * - This line is creating a JWT
       * that includes the user's ID (user._id) in its payload. The token is signed
       * with my_secret_key and set to expire in 1 hour.
       */
      let finalToken;
      try {
        //  ensure that my_secret_key is defined before you pass it to jwt.sign
        if (!my_secret_key) {
          throw new Error("MY_SECRET_KEY is not defined");
        }
        // Generate a JWT
        const token = jwt.sign({ userId: user._id }, my_secret_key, {
          expiresIn: "1h",
        });

        // Encrypt the JWT
        const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
        let encryptedToken = cipher.update(token, "utf8", "hex");
        encryptedToken += cipher.final("hex");

        // Prepend the IV to the encrypted token
        finalToken = iv.toString("hex") + ":" + encryptedToken;
      } catch (error) {
        console.error("Error generating or encrypting token:", error);
      }

      if (!finalToken) {
        return res.status(500).json({ message: "Error generating token" });
      }

      // Rest of your code...

      // if (role === "ADMINISTRATOR" && secretPin === my_secret_key) {
      //   console.log("Admin logged in successfully");
      //   return res.status(200).json({
      //     finalToken,
      //     message: "Admin logged in successfully",
      //     isAdmin: true,
      //     loggedIn: true
      //   });
      // } else if (role === "STUDENT") {
      //   res.status(200).json({
      //     finalToken,
      //     message: "User logged in successfully as a Student",
      //     isAdmin: false,
      //     loggedIn: true
      //   });
      // }

      // else if(role === "TUTOR OR LECTURER"){
      //   res.status(200).json({
      //     finalToken,
      //     message: "User logged in successfully as a Tutor or Lecturer",
      //     isAdmin: false,
      //     loggedIn: true
      //   });
      // }

      // else{
      //   res.status(500).json({
      //     message: "There is an issue with your login details. Please try again",
      //   });
      // }

      switch (role) {
        case "ADMINISTRATOR":
          if (secretPin === my_secret_key) {
            console.log("Admin logged in successfully");
            return res.status(200).json({
              finalToken,
              message: "Admin logged in successfully",
              isAdmin: true,
              loggedIn: true,
            });
          } else {
            return res.status(403).json({
              message: "Invalid secret pin",
            });
          }
        case "STUDENT":
          return res.status(200).json({
            finalToken,
            message: "User logged in successfully as a Student",
            isAdmin: false,
            loggedIn: true,
          });
        case "TUTOR OR LECTURER":
          return res.status(200).json({
            finalToken,
            message: "User logged in successfully as a Tutor or Lecturer",
            isAdmin: false,
            loggedIn: true,
          });
        default:
          return res.status(400).json({
            message: "Invalid role provided",
          });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "An error occurred", error: error.message });
    }
  } else {
    res.status(400).json({ message: "Only POST requests are allowed" });
  }
}
