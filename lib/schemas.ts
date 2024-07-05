import { z } from "zod";

// SIGN UP ZOD SCHEMA
export  const signUpSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Email must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  title: z.string().min(1, { message: "Title is required" }),
  terms: z.boolean().refine((v) => v === true, { message: "Agree to terms" }),
  isStudent: z.boolean().optional(),
});


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
  user_id: z
    .string()
    .uuid({ message: "user_id must be a valid UUID" })
    .optional(),

  middle_name: z.string().nonempty({ message: "middle_name cannot be empty" }),
  username: z.string().nonempty({ message: "username cannot be empty" }),
  date_of_birth: z
    .string()
    .nonempty({ message: "date_of_birth cannot be empty" }), // Assuming validation for DATE format is not required here
  gender: z
    .string()
    .max(10, { message: "gender must be at most 10 characters" })
    .nonempty({ message: "Kindly select your gender" })
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

    marriage_status: z
    .string()
    .max(255, { message: "marriage_status must be at most 255 characters" })
    .nonempty({ message: "marriage_status cannot be empty" }),

  emergency_contact_information: z
    .string()
    .nonempty({ message: "emerg... info cannot be empty" }),

  add_description: z
    .string()
    .nonempty({ message: "description info cannot be empty" }),

    other_information: z
    .string()
    .max(255, { message: "other_information must be at most 255 characters" })
    .nonempty({ message: "other_information cannot be empty" }),
});
