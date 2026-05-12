import React from "react";
import { MessageSquare, AlertCircle } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Form } from "@/components/common/forms/Form";
import { FormTextarea } from "@/components/common/forms/FormTextarea";
import { 
  ApprovalValidation, 
  RejectLeaveValidation, 
  type ApprovalValidationType, 
  type RejectLeaveValidationType 
} from "@/validations/leaves/ApprovalValidations";

interface ProcessApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (remarks: string) => Promise<void>;
  isLoading?: boolean;
  type: "approve" | "reject";
}

const ProcessApprovalModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading,
  type 
}: ProcessApprovalModalProps) => {
  const isApprove = type === "approve";
  const schema = isApprove ? ApprovalValidation : RejectLeaveValidation;
  type FormType = ApprovalValidationType | RejectLeaveValidationType;

  const handleSubmit = async (data: FormType) => {
    await onConfirm(data.remarks || "");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isApprove ? "Approve Request" : "Reject Request"}
      description={
        isApprove 
          ? "Confirming this leave application will notify the employee and update their balance." 
          : "Please provide a reason for rejecting this leave application."
      }
      primaryBtnText={isApprove ? "Confirm Approval" : "Confirm Rejection"}
      primaryBtnLoading={isLoading}
      primaryBtnType="submit"
      primaryBtnForm="process-approval-form"
      size="md"
    >
      <Form
        id="process-approval-form"
        schema={schema}
        onSubmit={handleSubmit}
        defaultValues={{ remarks: "" }}
        className="space-y-6 pt-2"
      >
        <FormTextarea
          name="remarks"
          label="Add Remarks"
          icon={MessageSquare}
          placeholder={isApprove ? "e.g., Approved, have a great time off!" : "e.g., Sorry, we have a critical deadline..."}
          className={`min-h-[140px] text-sm font-medium border-transparent bg-slate-50 ${
            isApprove 
              ? 'focus:border-emerald-400 focus:ring-emerald-50' 
              : 'focus:border-rose-400 focus:ring-rose-50'
          }`}
          iconClassName={isApprove ? 'group-focus-within/input:text-emerald-500' : 'group-focus-within/input:text-rose-500'}
        />

        <div className={`flex items-start gap-3 p-4 rounded-2xl border ${isApprove ? 'bg-emerald-50/50 border-emerald-100' : 'bg-rose-50/50 border-rose-100'}`}>
          <AlertCircle className={`h-5 w-5 mt-0.5 shrink-0`} />
          <p className="text-xs font-medium leading-relaxed">
            {isApprove 
              ? "Important: This action cannot be undone once confirmed." 
              : "Required: Rejection remarks help employees understand the decision."}
          </p>
        </div>
      </Form>
    </Modal>
  );

};

export default ProcessApprovalModal;
