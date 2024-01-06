import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "@/lib/connectToDatabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const client = await connectToDatabase();
    const db = client.db("manage-users");
  
    const notificationsCollection = db.collection("notifications");
    const usersCollection = db.collection("users");

    // let notifications = await db.collection("notifications").find().toArray();
   
    let notifications = await notificationsCollection.find().toArray();
    // Fetch user data for each notification
    for (let notification of notifications) {
        const { ObjectId } = require('mongodb');
        const user = await usersCollection.findOne({ _id: new ObjectId(notification.userId) });
      console.log("user's notification:: ", user);
      notification.user = user;
    }

    res.status(200).json(notifications);
  } else {
    res.status(400).json({ message: "Only GET requests are allowed" });
  }
}
