import z from "zod";

import { PermissionScope } from "@/types/permission.types";

export const RoleValidation = z.object({
  name: z
    .string()
    .min(1, "Role name is required")
    .min(3, "Role name must be at least 3 characters long")
    .max(50, "Role name must be at most 50 characters long"),
  description: z
    .string()
    .min(1, "Role description is required")
    .min(3, "Role description must be at least 3 characters long")
    .max(100, "Role description must be at most 100 characters long"),
  permissions: z.array(z.string()),
  scopes: z.record(z.string(), z.nativeEnum(PermissionScope)).optional(),
});

export type RoleFormData = z.infer<typeof RoleValidation>;