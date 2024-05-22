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
  

