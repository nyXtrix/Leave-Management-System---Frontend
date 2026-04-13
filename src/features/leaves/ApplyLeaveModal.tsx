import React from 'react';
import * as z from 'zod';
import { 
  Calendar, 
  Clock, 
  SendHorizontal,
  Info,
  GanttChart
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { Form, FormSelect, FormInput, FormTextarea, FormDatePicker } from '@/components/common/forms';

const leaveSchema = z.object({
  type: z.string().min(1, 'Please select a leave type'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  reason: z.string().min(10, 'Please provide at least 10 characters for the reason'),
}).refine((data) => {
  if (!data.startDate || !data.endDate) return true;
  return new Date(data.endDate) >= new Date(data.startDate);
}, {
  message: "End date cannot be before start date",
  path: ["endDate"],
});

type LeaveFormValues = z.infer<typeof leaveSchema>;

interface ApplyLeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LEAVE_TYPES = [
  { value: 'sick', label: 'Sick Leave' },
  { value: 'vacation', label: 'Vacation' },
  { value: 'casual', label: 'Casual Leave' },
  { value: 'maternity', label: 'Maternity' },
];

const ApplyLeaveModal = ({ isOpen, onClose }: ApplyLeaveModalProps) => {
  const onSubmit = async (data: LeaveFormValues) => {
    console.log('Applying for leave:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Request Time Off"
      description="Submit your leave request for approval."
      size="lg"
    >
      <Form
        schema={leaveSchema}
        onSubmit={onSubmit}
        className="space-y-6"
      >
        {({ watch, formState: { isValid, isSubmitting } }) => {
          const startDate = watch('startDate');
          const endDate = watch('endDate');

          const duration = (() => {
            if (!startDate || !endDate) return 0;
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diffTime = end.getTime() - start.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            return diffDays > 0 ? diffDays : 0;
          })();

          return (
            <>
              <div className="space-y-4">
                <FormSelect
                  name="type"
                  label="Leave Category"
                  placeholder="Select type of leave..."
                  required
                  options={LEAVE_TYPES}
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

                {duration > 0 && (
                  <div className="flex items-center gap-3 p-4 bg-secondary-200/30 rounded-2xl border border-secondary-200/50 animate-in fade-in slide-in-from-top-2">
                    <div className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-secondary-500">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-black text-secondary-400 uppercase tracking-widest leading-none mb-1">Calculated Duration</p>
                      <p className="text-sm font-bold text-slate-700">{duration} {duration === 1 ? 'Working Day' : 'Working Days'}</p>
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
                  Notice: This request will be routed to your supervisor. Ensure policies are reviewed before submission.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button 
                  type="submit" 
                  className="flex-1 h-12 rounded-xl shadow-glow-primary font-black uppercase tracking-widest text-xs"
                  disabled={!isValid}
                  isLoading={isSubmitting}
                >
                  <SendHorizontal className="h-4 w-4 mr-2" />
                  Send Request
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest text-xs"
                >
                  Discard
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </Modal>
  );
};

export default ApplyLeaveModal;
