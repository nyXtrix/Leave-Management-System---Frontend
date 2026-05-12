import { z } from "zod";

export const ApprovalValidation = z.object({
    remarks: z.string().min(3, "Remarks must be at least 3 characters").max(100, "Remarks must be less than 100 characters").optional(),
});

export const ForwardApprovalValidation = z.object({
    newApproverId: z.string().min(1, "New approver is required"),
    remarks: z.string().min(3, "Remarks must be at least 3 characters").max(100, "Remarks must be less than 100 characters").optional(),
});

export const RejectLeaveValidation = z.object({
    remarks: z.string().min(3, "Remarks must be at least 3 characters").max(100, "Remarks must be less than 100 characters"),
});

export type ApprovalValidationType = z.infer<typeof ApprovalValidation>;
export type ForwardApprovalValidationType = z.infer<typeof ForwardApprovalValidation>;
export type RejectLeaveValidationType = z.infer<typeof RejectLeaveValidation>;