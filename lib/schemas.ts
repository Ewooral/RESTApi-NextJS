import { z } from "zod";

// SIGN IN ZOD SCHEMA
export const signInSchema = z.object({
  email: z.string().email({ message: "Email must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  isAdmin: z.boolean().optional(),
  adminKey: z
    .string()
    .min(6, { message: "Admin key must be exactly 6 characters" })
    .max(6, { message: "Admin key must be exactly 6 characters" })
    .optional(),
});

// PERSONAL-INFO ZOD SCHEMA
export const personalInfoSchema = z.object({
  // user_id: z
  //   .string()
  //   .uuid({ message: "user_id must be a valid UUID" })
  //   .optional(),

  middle_name: z.string().optional(),
  username: z.string().optional(),
  date_of_birth: z
    .string()
    .nonempty({ message: "date_of_birth cannot be empty" }), // Assuming validation for DATE format is not required here
  gender: z
    .string()
    .max(10, { message: "gender must be at most 10 characters" })
    .nonempty({ message: "gender cannot be empty" })
    .optional(),
  nationality: z
    .string()
    .max(50, { message: "nationality must be at most 50 characters" })
    .nonempty({ message: "nationality cannot be empty" }),

  phone_number: z
    .string()
    .max(20, { message: "phone_number must be at most 20 characters" })
    .nonempty({ message: "phone_number cannot be empty" }),

  
  home_address: z
    .string()
    .max(255, { message: "home_address must be at most 255 characters" })
    .nonempty({ message: "home_address cannot be empty" }),

    Emergency_contact_information: z
    .string()
    .nonempty({ message: "emerg... info cannot be empty" }), 

  student_support: z
    .string()
    .max(255, { message: "student_support must be at most 255 characters" })
    .nonempty({ message: "student_support cannot be empty" }),
 });
