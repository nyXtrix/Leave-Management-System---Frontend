import { z } from "zod";


export const LeaveTypeValidationSchema = z.object({
  name: z.string().trim().min(1, "Leave type name is required"),
  description: z.string().trim().min(1, "Description is required"),
  defaultAnnualAllowence: z.number().min(1, "Annual allowance is required"),
  maxCancelableStep: z.number().min(1, "Max cancelable step must be atleast 1").optional(),
});

export type LeaveTypeFormValues = z.infer<typeof LeaveTypeValidationSchema>;