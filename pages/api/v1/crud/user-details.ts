import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username } = req.body;

    try {
      console.log("username::: ", username);

      // Correctly respond with the username
      res.status(200).json({ message: "Gone!", username });
    } catch (e: any) {
      console.error("There's been an error:", e);
      res.status(500).json({ error: e.toString() });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
