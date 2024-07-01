// Import necessary modules and functions
import { NextApiRequest, NextApiResponse } from "next";
import { createAndInsertPersonalInformation } from "@/repositories/users/userRepository";
// Define the type for the request body to ensure type safety
type PersonalInformationRequestBody = {
  user_id: string;
  username: string;
  middle_name?: string;
  marriage_status: string;
  date_of_birth: string; // Assuming ISO 8601 format (YYYY-MM-DD)
  gender: string;
  phone_number: string;
  nationality: string;
  home_address: string;
  personal_statement?: string;
  fee_code: string;
  student_support?: string;
  emergency_contact_information?: string;
  add_description?: string;
  other_information?: string;
};

// The handler function for the endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  // Destructure and validate the request body
  const {
    user_id,
    username,
    middle_name,
    marriage_status,
    date_of_birth,
    gender,
    phone_number,
    nationality,
    home_address,
    personal_statement,
    fee_code,
    student_support,
    emergency_contact_information,
    add_description,
    other_information,
  }: PersonalInformationRequestBody = req.body;

  //   // Basic validation (Further validation can be added as per requirements)
  //   if ( !username || !date_of_birth || !gender || !phone_number || !nationality || !home_address) {
  //     return res.status(400).json({ message: "Missing required fields" });
  //   }

  try {
    // Save the personal information into the database
    const saveResult = await createAndInsertPersonalInformation({
      user_id,
      username,
      middle_name,
      marriage_status,
      date_of_birth,
      gender,
      phone_number,
      nationality,
      home_address,
      personal_statement,
      fee_code,
      student_support,
      emergency_contact_information,
      add_description,
      other_information,
    });

    // Check if the information was successfully saved
    if (saveResult) {
      return res
        .status(200)
        .json({ message: "Personal information successfully saved" });
    } else {
      return res
        .status(400)
        .json({ message: "Failed to save personal information" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
