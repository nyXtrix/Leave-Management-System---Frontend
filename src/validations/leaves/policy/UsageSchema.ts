import { z } from "zod";

export const UsagePolicySchema = z.object({
  sandwichEnabled: z.boolean(),
  includeWeekendsInSandwich: z.boolean(),
  includeHolidaysInSandwich: z.boolean(),
  clubbingRules: z.array(
    z.object({
      leaveTypeId: z.string(),
      allowedWith: z.array(z.string()),
    }),
  ),
  restrictions: z.object({
    minServiceDays: z.number().min(0),
    minDaysPerRequest: z.number().min(0),
    maxDaysPerRequest: z.number().min(0),
    maxLeavesPerMonth: z.number().min(0),
    maxLeavesPerYear: z.number().min(0),
  }),
  timing: z.object({
    advanceNoticeDays: z.number().min(0),
    allowBackdated: z.boolean(),
    backdatedLimitDays: z.number().min(0).optional(),
    maxFutureDays: z.number().min(0),
  }),
  blackoutPeriods: z.array(
    z.object({
      startDate: z.string(),
      endDate: z.string(),
      reason: z.string(),
    }),
  ),
});

export type UsagePolicyType = z.infer<typeof UsagePolicySchema>;

export const RestrictionRuleValidation = z.object({
  minNoticeDays: z.number().min(0, "Notice days cannot be negative").default(3),
  maxContinuousDays: z.number().min(1, "Must be at least 1 day").default(14),
  allowPastDated: z.string().default("false"),
  allowHalfDay: z.string().default("true"),
  blackoutDates: z.array(z.string()).optional(),
  emergencyThreshold: z.number().min(0).max(24).optional(),
  typeSpecificLimits: z
    .array(
      z.object({
        leaveType: z.string(),
        maxDays: z.number().min(1),
      }),
    )
    .optional(),
});

export type RestrictionRuleValidationType = z.infer<
  typeof RestrictionRuleValidation
>;
