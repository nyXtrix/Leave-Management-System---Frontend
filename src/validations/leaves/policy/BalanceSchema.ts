import { z } from "zod";

export const BalancePolicySchema = z.object({
  leaveTypeId: z.string().min(1, "Leave type is required"),
  allowCarryForward: z.boolean(),
  maxCarryForward: z.number().min(0),
  expiryDays: z.number().min(0).optional(),
  allowNegativeBalance: z.boolean(),
  maxNegativeLimit: z.number().min(0),
  allowEncashment: z.boolean(),
  maxEncashmentDays: z.number().min(0).optional(),
  roundingRule: z.enum(["HALF_DAY", "HOUR", "NONE"]),
});

export type BalancePolicyType = z.infer<typeof BalancePolicySchema>;
