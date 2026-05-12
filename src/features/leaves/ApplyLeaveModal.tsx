import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Clock,
  SendHorizontal,
  Info,
  GanttChart,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import {
  Form,
  FormSelect,
  FormInput,
  FormTextarea,
  FormDatePicker,
} from "@/components/common/forms";
import IconButton from "@/components/ui/IconButton";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { leaveService } from "@/services/leave.service";

const leaveSchema = z
  .object({
    type: z.string().min(1, "Please select a leave type"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    reason: z
      .string()
      .min(10, "Please provide at least 10 characters for the reason"),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: "End date cannot be before start date",
      path: ["endDate"],
    },
  );

type LeaveFormValues = z.infer<typeof leaveSchema>;

interface ApplyLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeaveFormValues) => Promise<void>;
}

const ApplyLeaveModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ApplyLeaveModalProps) => {
  const { data: leaveTypes } = useSelector(
    (state: RootState) => state.lookups.leaveTypes,
  );

  const [calculatedDays, setCalculatedDays] = React.useState<number | null>(
    null,
  );
  const [isCalculating, setIsCalculating] = React.useState(false);

  const methods = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveSchema),
    mode: "onChange",
    defaultValues: {
      type: "",
      startDate: "",
      endDate: "",
      reason: "",
    },
  });

  const {
    watch,
    formState: { isValid, isSubmitting },
  } = methods;

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  React.useEffect(() => {
    const getDuration = async () => {
      if (startDate && endDate && new Date(endDate) >= new Date(startDate)) {
        setIsCalculating(true);
        try {
          const response = await leaveService.calculateDays(startDate, endDate);
          setCalculatedDays(response.days);
        } catch (error) {
          console.error("Failed to calculate days", error);
          setCalculatedDays(null);
        } finally {
          setIsCalculating(false);
        }
      } else {
        setCalculatedDays(null);
      }
    };

    getDuration();
  }, [startDate, endDate]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Time Off"
      description="Submit your leave request for approval."
      size="lg"
      primaryBtnText="Send Request"
      primaryBtnIcon={SendHorizontal}
      primaryBtnType="submit"
      primaryBtnForm="apply-leave-form"
      primaryBtnDisabled={
        !isValid ||
        isCalculating ||
        calculatedDays === null ||
        calculatedDays === 0
      }
      primaryBtnLoading={isSubmitting}
      secondaryBtnText="Discard"
    >
      <Form
        id="apply-leave-form"
        schema={leaveSchema}
        methods={methods}
        onSubmit={onSubmit}
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormSelect
            name="type"
            label="Leave Category"
            placeholder="Select type of leave..."
            required
            options={leaveTypes}
            icon={GanttChart}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormDatePicker
              name="startDate"
              label="Start Date"
              placeholder="Pick date"
              required
            />
            <FormDatePicker
              name="endDate"
              label="End Date"
              placeholder="Pick date"
              required
            />
          </div>

          {(calculatedDays !== null || isCalculating) && (
            <div className="flex items-center gap-3 p-4 bg-secondary-200/30 rounded-2xl border border-secondary-200/50 animate-in fade-in slide-in-from-top-2">
              <div className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-secondary-500">
                <Clock className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-secondary-400 uppercase tracking-widest leading-none mb-1">
                  Calculated Duration
                </p>
                <div className="flex items-baseline gap-1">
                  {isCalculating ? (
                    <div className="h-6 w-12 bg-secondary-300/20 animate-pulse rounded" />
                  ) : (
                    <>
                      <span className="text-xl font-bold text-secondary-900">
                        {calculatedDays}
                      </span>
                      <span className="text-xs font-bold text-secondary-500">
                        {calculatedDays === 1 ? "Day" : "Days"}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          <FormTextarea
            name="reason"
            label="Reason for Request"
            placeholder="Briefly explain your reason for time off..."
            className="min-h-[100px]"
          />
        </div>

        <div className="flex items-start gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100 italic">
          <Info className="h-4 w-4 text-slate-300 mt-0.5" />
          <p className="text-xs font-medium text-slate-400 leading-relaxed">
            Notice: This request will be routed to your supervisor. Ensure
            policies are reviewed before submission.
          </p>
        </div>
      </Form>
    </Modal>
  );
};

export default ApplyLeaveModal;
