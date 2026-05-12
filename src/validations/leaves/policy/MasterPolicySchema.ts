import { z } from "zod";
import { CalendarPolicySchema } from "@/validations/leaves/policy/CalendarSchema";
import { LeaveDefinitionSchema, ApprovalRuleSchema } from "@/validations/leaves/policy/PolicySchema";
import { UsagePolicySchema } from "@/validations/leaves/policy/UsageSchema";
import { BalancePolicySchema } from "@/validations/leaves/policy/BalanceSchema";

export const MasterPolicySchema = z.object({
  scope: z.enum(["ORG", "LOCATION", "DEPARTMENT", "ROLE", "EMPLOYEE", "org", "location", "department", "role", "employee"]),
  scopeId: z.string().min(1, "Scope identity is required"),
  name: z.string().min(2, "Policy name is required"),
  description: z.string().optional(),
  priority: z.number().int().min(0).max(100).default(1),
  isActive: z.boolean().default(true),

  calendar: CalendarPolicySchema.optional(),
  definitions: z.array(LeaveDefinitionSchema).default([]),
  usage: UsagePolicySchema.optional(),
  approvalRules: z.array(ApprovalRuleSchema).default([]),
  balancePolicies: z.array(BalancePolicySchema).default([]),
});

export type MasterPolicyType = z.infer<typeof MasterPolicySchema>;
