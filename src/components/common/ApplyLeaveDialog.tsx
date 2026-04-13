import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarDays, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import InputWithIcon from "@/components/common/inputs/InputWithIcon";
import { Textarea } from "@/components/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

const leaveSchema = z
  .object({
    type: z.enum(["SICK", "CASUAL", "WFH", "BEREAVEMENT", "CUSTOM"], {
      message: "Please select a leave type",
    }),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    notes: z.string().max(500, "Max 500 characters").optional(),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End date must be on or after start date",
    path: ["endDate"],
  });

type LeaveFormData = z.infer<typeof leaveSchema>;

interface ApplyLeaveDialogProps {
  open: boolean;
  onClose: () => void;
}

const LEAVE_TYPES = [
  { value: "CASUAL", label: "Casual Leave" },
  { value: "SICK", label: "Sick Leave" },
  { value: "WFH", label: "Work From Home" },
  { value: "BEREAVEMENT", label: "Bereavement Leave" },
  { value: "CUSTOM", label: "Custom Leave" },
];

export function ApplyLeaveDialog({ open, onClose }: ApplyLeaveDialogProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeaveFormData>({
    resolver: zodResolver(leaveSchema),
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const getDuration = () => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : null;
  };

  const duration = getDuration();

  const onSubmit = async (data: LeaveFormData) => {
    // In production: await leaveService.applyLeave(data)
    await new Promise((r) => setTimeout(r, 1000)); // simulate API
    console.log("Leave submitted:", data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="h-10 w-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
              <CalendarDays className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle>Apply for Leave</DialogTitle>
              <DialogDescription>
                Fill in the details for your leave request
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-2">
          {/* Leave Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Leave Type</Label>
            <Select
              onValueChange={(val) =>
                setValue("type", val as LeaveFormData["type"])
              }
            >
              <SelectTrigger
                id="type"
                className={errors.type ? "border-rose-400" : ""}
              >
                <SelectValue placeholder="Select leave type…" />
              </SelectTrigger>
              <SelectContent>
                {LEAVE_TYPES.map((lt) => (
                  <SelectItem key={lt.value} value={lt.value}>
                    {lt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.type && (
              <p className="text-xs font-medium text-rose-500">
                {errors.type.message}
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">From</Label>
              <InputWithIcon
                id="startDate"
                type="date"
                icon={CalendarDays}
                error={errors.startDate?.message}
                min={new Date().toISOString().split("T")[0]}
                {...register("startDate")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">To</Label>
              <InputWithIcon
                id="endDate"
                type="date"
                icon={CalendarDays}
                error={errors.endDate?.message}
                min={startDate ?? new Date().toISOString().split("T")[0]}
                {...register("endDate")}
              />
            </div>
          </div>

          {/* Duration pill */}
          {duration !== null && (
            <div className="flex items-center gap-2 px-4 py-2.5 bg-indigo-50 rounded-xl border border-indigo-100">
              <CalendarDays className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-semibold text-indigo-700">
                {duration} {duration === 1 ? "day" : "days"} requested
              </span>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">
              Notes{" "}
              <span className="text-slate-400 font-normal">(optional)</span>
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any context or reason for your request…"
              error={errors.notes?.message}
              {...register("notes")}
            />
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting} icon={FileText}>
              Submit Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
