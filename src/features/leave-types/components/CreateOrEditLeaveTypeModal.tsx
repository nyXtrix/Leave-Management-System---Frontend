import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Modal from "@/components/ui/Modal";
import { Form, FormInput, FormTextarea } from "@/components/common/forms";
import {
  Type,
  AlignLeft,
  Hash,
  ShieldCheck,
} from "lucide-react";
import { LeaveTypeValidationSchema, type LeaveTypeFormValues } from "@/validations/leaves/LeaveTypeValidation";
import type { LeaveType } from "@/services/leavePolicy.service";



interface CreateOrEditLeaveTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeaveTypeFormValues) => Promise<void>;
  type?: LeaveType | null;
}

const CreateOrEditLeaveTypeModal = ({
  isOpen,
  onClose,
  onSubmit,
  type,
}: CreateOrEditLeaveTypeModalProps) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const methods = useForm<LeaveTypeFormValues>({
    resolver: zodResolver(LeaveTypeValidationSchema),
    defaultValues: {
      maxCancelableStep: 2,
      defaultAnnualAllowence: 15,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (type) {
        methods.reset({
          name: type.name,
          description: type.description,
          maxCancelableStep: type.maxCancelableStep ?? undefined,
          defaultAnnualAllowence: type.defaultAnnualAllowence,
        });
      } else {
        methods.reset({
          name: "",
          description: "",
          maxCancelableStep: 2,
          defaultAnnualAllowence: 15,
        });
      }
    }
  }, [isOpen, type, methods]);

  const handleFormSubmit = async (data: LeaveTypeFormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      methods.reset();
      onClose();
    } catch (error) {
      console.error("Failed to save leave type:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type ? "Edit Leave Type" : "Create Leave Type"}
      description="Define a new leave category and its default allowance rules."
      primaryBtnText={type ? "Save Changes" : "Create Leave Type"}
      primaryBtnType="submit"
      primaryBtnForm="leave-type-form"
      primaryBtnLoading={isSubmitting}
      size="md"
    >
      <Form
        id="leave-type-form"
        schema={LeaveTypeValidationSchema}
        onSubmit={handleFormSubmit}
        methods={methods}
        className="space-y-6 pt-2"
      >
        <div className="space-y-4">
          <FormInput
            name="name"
            label="Leave Name"
            icon={Type}
            placeholder="e.g. Annual Leave, Sick Leave"
            className="rounded-2xl h-12 bg-slate-50/50 border-slate-200 focus:bg-white"
            required
          />

          <FormTextarea
            name="description"
            label="Description"
            icon={AlignLeft}
            placeholder="Briefly describe the purpose of this leave"
            className="rounded-2xl bg-slate-50/50 border-slate-200 focus:bg-white"
            rows={3}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              name="defaultAnnualAllowence"
              label="Annual Allowance"
              icon={Hash}
              type="number"
              rules={{ valueAsNumber: true }}
              placeholder="e.g. 15"
              className="rounded-2xl h-12 bg-slate-50/50 border-slate-200 focus:bg-white"
              required
            />

            <FormInput
              name="maxCancelableStep"
              label="Cancelable Steps"
              icon={ShieldCheck}
              type="number"
              rules={{ valueAsNumber: true }}
              placeholder="e.g. 2"
              className="rounded-2xl h-12 bg-slate-50/50 border-slate-200 focus:bg-white"
            />
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateOrEditLeaveTypeModal;
