import { z } from "zod";

export const RegisterValidationSchema = z
  .object({
    FirstName: z.string().min(3, "First name must be at least 3 characters"),
    LastName: z.string().min(3, "Last name must be at least 3 characters"),
    AdminPassword: z
      .string()
      .min(6, "Security infrastructure requires at least 6 characters"),
    ConfirmPassword: z.string().min(6, "Please confirm your password"),
    CompanyName: z.string().optional(),
    Subdomain: z.string().optional(),
    email: z
      .string()
      .email("Please enter a valid administrative email")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.AdminPassword !== data.ConfirmPassword) return false;
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["ConfirmPassword"],
    }
  );

export type RegisterValidationData = z.infer<typeof RegisterValidationSchema>;
