import { z } from "zod";

export const ForgotPasswordValidation = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type ForgotPasswordValidationType = z.infer<typeof ForgotPasswordValidation>;
