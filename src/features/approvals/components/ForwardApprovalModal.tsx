import React from "react";
import { MessageSquare, User, AlertCircle } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Form } from "@/components/common/forms/Form";
import { FormTextarea } from "@/components/common/forms/FormTextarea";
import { FormUserSelect } from "@/components/common/forms/FormUserSelect";
import { 
  ForwardApprovalValidation, 
  type ForwardApprovalValidationType 
} from "@/validations/leaves/ApprovalValidations";

interface ForwardApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (approverId: string, remarks: string) => Promise<void>;
  isLoading?: boolean;
}

const ForwardApprovalModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading 
}: ForwardApprovalModalProps) => {

  const handleSubmit = async (data: ForwardApprovalValidationType) => {
    await onConfirm(data.newApproverId, data.remarks || "");
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Forward Approval"
      description="Delegate this leave request to another decision-maker in the organization."
      primaryBtnText="Forward Request"
      primaryBtnLoading={isLoading}
      primaryBtnType="submit"
      primaryBtnForm="forward-approval-form"
      size="md"
    >
      <Form<ForwardApprovalValidationType>
        id="forward-approval-form"
        schema={ForwardApprovalValidation}
        onSubmit={handleSubmit}
        defaultValues={{ newApproverId: "", remarks: "" }}
        className="space-y-6 pt-2"
      >
        <FormUserSelect
          name="newApproverId"
          label="Select New Approver"
          placeholder="Search by name or role..."
          icon={User}
          className="w-full"
        />

        <FormTextarea
          name="remarks"
          label="Remarks (Optional)"
          icon={MessageSquare}
          placeholder="Why are you forwarding this request?"
          labelClassName="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1"
        />

        <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-2xl">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs font-medium text-amber-700 leading-relaxed ">
            Note: The original applicant will be notified that the request has been forwarded to a new approver.
          </p>
        </div>
      </Form>
    </Modal>
  );
};

export default ForwardApprovalModal;
