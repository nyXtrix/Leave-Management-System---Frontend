import { z } from "zod";

export const CalendarPolicySchema = z.object({
  weekOffs: z.array(
    z.object({
      day: z.enum(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]),
      weekOfMonth: z.enum([
        "FIRST",
        "SECOND",
        "THIRD",
        "FOURTH",
        "LAST",
        "ALL",
      ]),
      isHalfDay: z.boolean(),
    }),
  ),
  holidays: z.array(
    z.object({
      id: z.string().optional(),
      date: z.string(),
      name: z.string(),
      isOptional: z.boolean(),
      locationId: z.string().optional(),
    }),
  ),
  compOffEligibility: z.object({
    enabled: z.boolean(),
    minHoursForHalfDay: z.number().min(0).max(24),
    minHoursForFullDay: z.number().min(0).max(24),
  }),
});

export type CalendarPolicyType = z.infer<typeof CalendarPolicySchema>;
