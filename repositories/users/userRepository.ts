// userRepository.ts
import { query } from "@/lib/connectToPostgres";
import { UsersInfo } from "@/types/users";
import runQuery from "@/lib/connectToNeo4J";
import { query_AWS_RDS } from "@/lib/connect_To_AWS_RDS_Instance";

// USER REPOSITORY
// ...................................................................................................
/**
 * Retrieves a user from the database based on the provided email.
 * @param email - The email of the user to retrieve.
 * @returns A Promise that resolves to the user object if found, or undefined if not found.
 */
export async function getUsersInfoByEmail(email: string): Promise<any> {
  return await query(
    `
        SELECT users.*, images.image_url 
        FROM users 
        LEFT JOIN images ON users.image_id = images.id 
        WHERE users.email = $1;
        `,
    [email]
  );
}

export const createStatuses_POSTGRES = async () => {
  const status_query = `
    CREATE TABLE IF NOT EXISTS user_statuses (
      id SERIAL PRIMARY KEY,
      type VARCHAR(50) UNIQUE
    );

    INSERT INTO user_statuses(type)
    VALUES ('Pending'), ('Active'), ('Inactive'), ('Limited'), ('Temporary'), 
           ('Suspended'), ('Archived'), ('Graduated'), ('Withdrawn')
    ON CONFLICT (type) DO NOTHING;
  `;

  try {
    await query(status_query, []);
    console.log("Statuses created successfully");
  } catch (error) {
    console.error("Error creating statuses:", error);
    throw error;
  }
};

/**
 * Updates the role and status of a user in the database.
 * @param userId - The ID of the user to update.
 * @param updatedRole - The updated role of the user.
 * @param updatedStatus - The updated status of the user.
 * @returns A Promise that resolves to the updated user object.
 */
export async function updateUserRoleAndStatus_POSTGRES(
  userId: string,
  updatedRole: string,
  updatedStatus: string
): Promise<any> {
  const statusIdResult = await query(
    "SELECT id FROM user_statuses WHERE type = $1",
    [updatedStatus]
  );
  const statusId = statusIdResult.rows[0].id;

  return await query(
    "UPDATE users SET role = $1, status_id = $2 WHERE id = $3",
    [updatedRole, statusId, userId]
  );
}

/**
 * Creates a new user in the database.
 *
 * @param {string} firstname - The first name of the user.
 * @param {string} lastname - The last name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} hashedPassword - The hashed password of the user.
 * @param {boolean} isStudent - Indicates whether the user is a student or not.
 * @param {string} title - The title of the user.
 * @param {boolean} terms - Indicates whether the user has accepted the terms or not.
 * @returns {Promise<object>} - A promise that resolves to the newly created user object.
 */
export async function createUser_POSTGRES(
  firstname: string,
  lastname: string,
  email: string,
  hashedPassword: string,
  isStudent: boolean,
  title: string,
  terms: boolean
): Promise<object> {
  const createTableText = `
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      firstname VARCHAR(100),
      lastname VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(100),
      isStudent BOOLEAN,
      title VARCHAR(10),
      terms BOOLEAN,
      role VARCHAR(10),
      image_id INTEGER ,
      status_id INTEGER,
      registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      FOREIGN KEY (image_id) REFERENCES images (id),
      FOREIGN KEY (status_id) REFERENCES user_statuses (id) 
    );
    `;

  const insertUserText =
    "INSERT INTO users(firstname, lastname, email, password, isStudent, title, terms ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const values = [
    firstname,
    lastname,
    email,
    hashedPassword,
    isStudent,
    title,
    terms,
  ];

  await query(createTableText, []); // Create the table if it doesn't exist
  const dbResponse = await query(insertUserText, values);
  return dbResponse.rows[0];
}

export const createUserStatusTable_POSTGRES = async () => {
  const createTableText = `
        CREATE TYPE user_status AS ENUM (
            'Pending', 'Active', 'Inactive', 'Limited', 'Temporary',
            'Suspended', 'Archived', 'Graduated', 'Withdrawn'
        );

        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            status user_status
        );
    `;
  await query(createTableText, []);
};

export const createUser_NEO4J = async (user: UsersInfo) => {
  const createUserQuery = `
      CREATE (u:User { 
        id: apoc.create.uuid(), 
        firstname: $firstname, 
        lastname: $lastname, 
        email: $email, 
        password: $password, 
        isStudent: $isStudent, 
        title: $title, 
        terms: $terms 
      }) 
      RETURN u;
    `;

  const params = {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    password: user.password,
    isStudent: user.isStudent,
    title: user.title,
    terms: user.terms,
  };

  try {
    const result = await runQuery(createUserQuery, params);
    // Process the result if needed
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const createStatusesNode_NEO4J = async () => {
  const query = `
      CREATE (:user_statuses { type: 'Pending' }),
      (:user_statuses { type: 'Active' }),
      (:user_statuses { type: 'Inactive' }),
      (:user_statuses { type: 'Limited' }),
      (:user_statuses { type: 'Temporary' }),
      (:user_statuses { type: 'Suspended' }),
      (:user_statuses { type: 'Archived' }),
      (:user_statuses { type: 'Graduated' }),
      (:user_statuses { type: 'Withdrawn' });
    `;

  try {
    await runQuery(query, {});
    console.log("Statuses created successfully");
  } catch (error) {
    console.error("Error creating statuses:", error);
    throw error;
  }
};

// Function to create the sessions table if it doesn't exist
export async function createSessionsTable() {
  const createTableQuery = `
  CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    session_details JSONB, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '1 day',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`;
  try {
    await pool.query(createTableQuery);
    console.log("Sessions table created successfully");
  } catch (error) {
    console.error("Error creating sessions table:", error);
    throw error;
  }
}

// Function to insert session into the database
export const insertSession = async (
  sessionId: string,
  userId: string,
  sessionDetails: Record<string, any>
): Promise<void> => {
  const insertQuery = `
      INSERT INTO sessions (session_id, user_id, session_details)
      VALUES ($1, $2, $3)
  `;
  const values = [sessionId, userId, JSON.stringify(sessionDetails)];
  try {
    await query(insertQuery, values);
    console.log("Session inserted successfully");
  } catch (error) {
    console.error("Error inserting session:", error);
    throw error;
  }
};

// Function to delete a session from the database when a user logs out
export async function deleteSession(sessionId: string) {
  try {
    await query("DELETE FROM sessions WHERE session_id = $1", [sessionId]);
  } catch (error) {
    console.error("Error deleting session:", error);
    throw new Error("Failed to delete session");
  }
}

import { Pool } from "pg";

// Assuming you have a Pool instance for your database connection
const pool = new Pool({
  // your database connection details
});

/**
 * Deletes a user from the database based on their email.
 *
 * @param {string} email - The email of the user to delete.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user was successfully deleted, false otherwise.
 */
export async function deleteUser_POSTGRES(email: string): Promise<boolean> {
  const deleteQuery = "DELETE FROM users WHERE email = $1 RETURNING *";
  const values = [email];

  try {
    const res = await query(deleteQuery, values);
    // If the query successfully deleted a row, res.rowCount will be 1
    return (res.rowCount as number) > 0;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

/**
 * Creates the personalinformation table if it does not exist and inserts values into it.
 *
 * @param personalInfo - An object containing all the personal information fields.
 * @returns {Promise<boolean>} - A promise that resolves to true if the operation was successful, false otherwise.
 */
export async function createAndInsertPersonalInformation(personalInfo: {
  user_id?: string;
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
}): Promise<boolean> {
  const createTableQuery = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS personalinformation (
      user_id UUID,
      username VARCHAR(100) NOT NULL,
      middle_name VARCHAR(100),
      marriage_status VARCHAR(20),
      date_of_birth VARCHAR(30) NOT NULL,
      gender VARCHAR(10) NOT NULL,
      phone_number VARCHAR(20) NOT NULL,
      nationality VARCHAR(50) NOT NULL,
      home_address VARCHAR(255) NOT NULL,
      personal_statement TEXT,
      fee_code VARCHAR(10),
      student_support VARCHAR(255),
      emergency_contact_information VARCHAR(20),
      add_description TEXT,
      other_information TEXT ,
      registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      deletion_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      PRIMARY KEY (user_id),
      FOREIGN KEY (user_id) REFERENCES Users(id)
    );
  `;

  const insertQuery = `
    INSERT INTO personalinformation (
    user_id, username, middle_name, marriage_status, date_of_birth, gender, phone_number, nationality, 
    home_address, personal_statement, fee_code, student_support, 
    emergency_contact_information, add_description, other_information
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
  RETURNING *;
  `;

  const values = [
    personalInfo.user_id,
    personalInfo.username,
    personalInfo.middle_name,
    personalInfo.date_of_birth,
    personalInfo.marriage_status,
    personalInfo.gender,
    personalInfo.phone_number,
    personalInfo.nationality,
    personalInfo.home_address,
    personalInfo.personal_statement,
    personalInfo.fee_code,
    personalInfo.student_support,
    personalInfo.emergency_contact_information,
    personalInfo.add_description,
    personalInfo.other_information,
  ];

  try {
    // Create the table if it doesn't exist
    await query(createTableQuery, []);
    // Insert the personal information
    const res = await query(insertQuery, values);
    // If the query successfully inserted a row, res.rowCount will be 1
    return (res.rowCount as number) > 0;
  } catch (error) {
    console.error("Error in createAndInsertPersonalInformation:", error);
    throw error;
  }
}
