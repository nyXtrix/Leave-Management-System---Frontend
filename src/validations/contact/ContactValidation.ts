import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot exceed 100 characters"),
  
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  
  purpose: z
    .enum(["1", "3", "4"],{
      message: "Purpose is required, Please select a purpose",
    }),
  
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message exceeds the maximum allowed length of 1000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
