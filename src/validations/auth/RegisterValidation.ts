import { z } from "zod";

export const RegisterValidationSchema = z
  .object({
    FirstName: z.string().min(3, "First name must be at least 3 characters"),
    LastName: z.string().min(3, "Last name must be at least 3 characters"),
    AdminPassword: z
      .string()
      .min(6, "Security infrastructure requires at least 6 characters"),
    CompanyName: z.string().optional(),
    Subdomain: z.string().optional(),
    email: z
      .string()
      .email("Please enter a valid administrative email")
      .optional(),
  })
  .refine(
    (data) => {
      return true;
    },
    {
      message: "Configuration details are required for new workspace activation",
    }
  );

export type RegisterValidationData = z.infer<typeof RegisterValidationSchema>;
