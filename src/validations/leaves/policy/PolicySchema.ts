import { z } from "zod";

// Recursive schemas for the condition rule builder
const RuleConditionSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    metric: z.enum([
      "DURATION",
      "LEAVE_TYPE",
      "ROLE",
      "BALANCE",
      "TEAM_AVAILABILITY",
      "IS_BACKDATED",
      "IS_BLACKOUT",
      "NOTICE_PERIOD",
    ]),
    operator: z.enum(["EQ", "NEQ", "GT", "LT", "GTE", "LTE", "IN", "NOT_IN"]),
    value: z.any(),
  }),
);

export const RuleGroupSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    operator: z.enum(["AND", "OR"]),
    conditions: z.array(z.union([RuleConditionSchema, RuleGroupSchema])),
  }),
);

export const LeaveAllocationSchema = z.object({
  type: z.enum(["FIXED", "ACCRUAL"]),
  amount: z.number().min(0),
  accrualFrequency: z.enum(["MONTHLY", "QUARTERLY"]).optional(),
  accrualRate: z.number().min(0).optional(),
  isProRated: z.boolean(),
  minTenureDays: z.number().min(0),
});

export const ApprovalStepSchema = z.object({
  id: z.string(),
  rank: z.number(),
  approverType: z.string().min(1, "Approver type is required"),
  roleId: z.string().optional(),
  approverId: z.string().optional(),
});

export const ApprovalRuleSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Rule name is required"),
  priority: z.number(),
  conditions: RuleGroupSchema,
  approvalMode: z.enum(["SEQUENTIAL", "PARALLEL_ALL", "PARALLEL_ANY"]),
  levels: z
    .array(ApprovalStepSchema)
    .min(0),
  minDays: z.number().min(0).default(0),
  maxDays: z.number().min(1).default(365),
});

export const LeaveDefinitionSchema = z.object({
  leaveTypeId: z.string().min(1, "Leave type is required"),
  isPaid: z.boolean(),
  requiresDocumentation: z.boolean(),
  minDaysForDocumentation: z.number().min(0),
  genderApplicability: z.enum(["ALL", "MALE", "FEMALE", "OTHER"]),
  allocation: LeaveAllocationSchema,
  roleIds: z.array(z.string()).optional(),
});

export const ApprovalWorkflowValidation = z.object({
  ruleName: z.string().min(1, "Rule name is required"),
  metric: z.string().min(1, "Metric is required"),
  operator: z.string().min(1, "Operator is required"),
  value: z.number().min(0, "Value must be positive"),
  action: z.string().min(1, "Action is required"),
  roleId: z.string().min(1, "Approver role is required"),
});

export type LeaveDefinitionType = z.infer<typeof LeaveDefinitionSchema>;
export type ApprovalRuleType = z.infer<typeof ApprovalRuleSchema>;
export type RuleGroupType = z.infer<typeof RuleGroupSchema>;
export type ApprovalWorkflowValidationType = z.infer<
  typeof ApprovalWorkflowValidation
>;
