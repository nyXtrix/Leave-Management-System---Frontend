import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Plus, 
  Trash2,
  AlertCircle,
  Zap
} from "lucide-react";
import { 
  FormInput, 
  FormSelect,
  FormCheckbox
} from "@/components/common/forms";
import { Button } from "@/components/ui/Button";

export const CalendarPolicyForm = () => {
  const { control } = useFormContext();
  const { fields: weekOffs, append: appendOff, remove: removeOff } = useFieldArray({
    control,
    name: "calendar.weekOffs",
  });

  return (
    <div className="space-y-6 animate-reveal">
      {/* Section Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <Calendar className="h-4 w-4 text-slate-400" />
          <h3 className="text-sm font-bold text-slate-900">Week-offs</h3>
        </div>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Configure standard working days and automatic compensatory credit rules.
        </p>
      </div>

      {/* Week-offs Section */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Recurring Week-offs</span>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            className="h-8 px-3 rounded-lg text-[11px] font-bold border-slate-200"
            onClick={() => appendOff({ day: "SAT", weekOfMonth: "ALL", isHalfDay: false })}
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Week-off
          </Button>
        </div>

        <div className="space-y-3">
          {weekOffs.map((field, index) => (
            <div key={field.id} className="relative p-4 rounded-xl border border-slate-100 bg-slate-50/50 transition-colors hover:bg-slate-50 group">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1.5fr_1fr] gap-4 items-end pr-10">
              <FormSelect
                name={`calendar.weekOffs.${index}.day`}
                label="Select Day"
                options={[
                  { label: "Monday", value: "MON" },
                  { label: "Tuesday", value: "TUE" },
                  { label: "Wednesday", value: "WED" },
                  { label: "Thursday", value: "THU" },
                  { label: "Friday", value: "FRI" },
                  { label: "Saturday", value: "SAT" },
                  { label: "Sunday", value: "SUN" },
                ]}
              />
              <FormSelect
                name={`calendar.weekOffs.${index}.weekOfMonth`}
                label="Frequency"
                options={[
                  { label: "Every Week", value: "ALL" },
                  { label: "1st Week", value: "FIRST" },
                  { label: "2nd Week", value: "SECOND" },
                  { label: "3rd Week", value: "THIRD" },
                  { label: "4th Week", value: "FOURTH" },
                  { label: "Last Week", value: "LAST" },
                ]}
              />
              <FormCheckbox
                 name={`calendar.weekOffs.${index}.isHalfDay`}
                 topLabel="Half Day"
                 label="Set as Half-day"
                 icon={Clock}
              />
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="text-slate-400 hover:text-rose-500 rounded-lg h-8 w-8"
                  onClick={() => removeOff(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {weekOffs.length === 0 && (
             <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs font-medium">
               No weekly off-days configured.
             </div>
          )}
        </div>
      </div>

      {/* Comp-off Eligibility */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Comp-off Credit Policies</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <FormCheckbox 
            name="calendar.compOffEligibility.enabled" 
            topLabel="Comp-off Policy"
            label="Automatic Credits" 
            description="Grant leave credits for extra work."
            icon={Zap}
          />
          
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              name="calendar.compOffEligibility.minHoursForHalfDay"
              label="Min Hours (Half)"
              type="number"
              icon={Clock}
            />
            <FormInput
              name="calendar.compOffEligibility.minHoursForFullDay"
              label="Min Hours (Full)"
              type="number"
              icon={Clock}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPolicyForm;
