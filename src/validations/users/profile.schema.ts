import * as z from "zod";

export const EditProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.string().min(1, "Gender is required"),
  roleCode: z.string(),
  departmentId: z.string().optional(),
  roleId: z.string().optional(),
  managerId: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.roleCode !== "SUPER_ADMIN") {
    if (!data.roleId || data.roleId.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Designation/Role is required",
        path: ["roleId"],
      });
    }
    if (!data.departmentId || data.departmentId.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Department is required",
        path: ["departmentId"],
      });
    }
    if (!data.managerId || data.managerId.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Reporting Manager is required",
        path: ["managerId"],
      });
    }
  }
});

export type EditProfileFormValues = z.infer<typeof EditProfileSchema>;
