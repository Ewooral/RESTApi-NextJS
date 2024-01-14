const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});
const createTables = async () => {
  await pool.query('BEGIN');

  try {
    // Create Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'Guest'
      );
    `);

    // Create PersonalInformation table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS PersonalInformation (
        user_id UUID,
        date_of_birth DATE,
        gender VARCHAR(10),
        nationality VARCHAR(50),
        home_address VARCHAR(255),
        personal_statement TEXT,
        fee_code VARCHAR(10),
        student_support VARCHAR(255),
        FOREIGN KEY (user_id) REFERENCES Users(id)
      );
    `);
// Drop EducationHistory table if it exists
await pool.query(`
  DROP TABLE IF EXISTS EducationHistory;
`);

// Create EducationHistory table
await pool.query(`
  CREATE TABLE IF NOT EXISTS EducationHistory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    school_name VARCHAR(100),
    start_date DATE,
    end_date DATE,
    qualification VARCHAR(100),
    subjects VARCHAR(255),
    grades VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES Users(id)
  );
`);

    // Create EducationHistory table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS EducationHistory (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID,
        school_name VARCHAR(100),
        end_date DATE,
        qualification VARCHAR(100),
        subjects VARCHAR(255),
        grades VARCHAR(50),
        FOREIGN KEY (user_id) REFERENCES Users(id)
      );
    `);

    // Create CourseChoices table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS CourseChoices (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID,
        university_name VARCHAR(100),
        course_title VARCHAR(100),
        start_date DATE,
        FOREIGN KEY (user_id) REFERENCES Users(id)
      );
    `);

    // Create References table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS UserReferences (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID,
        reference_text TEXT,
        FOREIGN KEY (user_id) REFERENCES Users(id)
      );
    `);

    // Create EmploymentHistory table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS EmploymentHistory (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID,
        employer_name VARCHAR(100),
        job_title VARCHAR(100),
        start_date DATE,
        end_date DATE,
        job_description TEXT,
        FOREIGN KEY (user_id) REFERENCES Users(id)
      );
    `);

    await pool.query('COMMIT');
    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    } finally {
      pool.end();
      }
    };

    createTables()
      .then(() => {
        console.log('Seeding...');
        // Your seeding code here

        console.log('Seeding completed successfully!');
      })
      .catch(console.error);
