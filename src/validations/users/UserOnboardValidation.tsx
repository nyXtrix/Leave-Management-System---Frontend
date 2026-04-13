import * as z from "zod";

export const UserOnboardValidation = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Gender is required"),
  departmentId: z.string().min(1, "Department is required"),
  roleId: z.string().min(1, "Role is required"),
  managerId: z.string().min(1, "Manager is required"),
});

export type UserOnboardValidationType = z.infer<typeof UserOnboardValidation>;
