import { z } from "zod";

export const PolicyScopeSchema = z.object({
  scope: z.enum(["ORG", "LOCATION", "DEPARTMENT", "ROLE", "EMPLOYEE"]),
  scopeId: z.string().min(1, "Scope identity is required"),
  name: z.string().min(2, "Name should be descriptive"),
  description: z.string().optional(),
  priority: z.number().int().min(0).max(100),
  isActive: z.boolean().default(true),
  effectiveFrom: z.string().optional(),
  effectiveTo: z.string().optional(),
});

export type PolicyScopeType = z.infer<typeof PolicyScopeSchema>;
