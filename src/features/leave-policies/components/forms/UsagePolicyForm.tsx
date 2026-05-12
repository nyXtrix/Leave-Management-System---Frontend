import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { 
  Zap, 
  Layers, 
  History, 
  Plus,
  Trash2,
  Clock,
  Calendar
} from "lucide-react";
import { 
  FormInput, 
  FormSelect,
  FormCheckbox
} from "@/components/common/forms";
import { Button, cn } from "@/components/ui/Button";
import { LEAVE_TYPES } from "../../constants/leaveTypes";

export const UsagePolicyForm = () => {
  const { control, watch, setValue } = useFormContext();
  const sandwichEnabled = watch("usage.sandwichEnabled");

  const { fields: clubbing, append: appendClub, remove: removeClub } = useFieldArray({
    control,
    name: "usage.clubbingRules",
  });

  React.useEffect(() => {
    if (!sandwichEnabled) {
      setValue("usage.includeWeekendsInSandwich", false, { shouldDirty: true, shouldValidate: true });
      setValue("usage.includeHolidaysInSandwich", false, { shouldDirty: true, shouldValidate: true });
    }
  }, [sandwichEnabled, setValue]);

  return (
    <div className="space-y-6 animate-reveal">
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="h-4 w-4 text-slate-400" />
          <h3 className="text-sm font-bold text-slate-900">Usage & Restrictions</h3>
        </div>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Define how leaves can be combined and set timelines for application submission.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sandwich Rules</span>
          <div className="space-y-4">
            <FormCheckbox 
              name="usage.sandwichEnabled" 
              label="Active Sandwich Policy" 
              description="Count holidays between leave days as consumption."
            />
            <div className={cn(
              "pl-6 space-y-2 border-l-2 border-slate-100 ml-2 transition-all duration-300",
              !sandwichEnabled && "opacity-50 grayscale pointer-events-none"
            )}>
              <FormCheckbox 
                name="usage.includeWeekendsInSandwich" 
                label="Include Weekends" 
                disabled={!sandwichEnabled}
              />
              <FormCheckbox 
                name="usage.includeHolidaysInSandwich" 
                label="Include Holidays" 
                disabled={!sandwichEnabled}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Application Timing</span>
          <div className="grid grid-cols-1 gap-4">
             <FormInput
               name="usage.timing.advanceNoticeDays"
               label="Advance Notice (Days)"
               type="number"
               icon={Clock}
             />
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <FormCheckbox 
                  name="usage.timing.allowBackdated" 
                  topLabel="Historical Data"
                  label="Allow Backdated" 
                  icon={History}
                />
               <FormInput name="usage.timing.maxFutureDays" label="Max Future" type="number" icon={Calendar} />
             </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-4">
         <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-slate-400" />
              <h4 className="font-bold text-slate-900 text-xs">Clubbing Restrictions</h4>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="h-8 rounded-lg border-slate-200 text-[11px] font-bold"
              onClick={() => appendClub({ leaveTypeId: "SICK", allowedWith: [] })}
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Rule
            </Button>
         </div>

         <div className="space-y-2">
            {clubbing.map((field, index) => (
              <div key={field.id} className="relative bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300 group">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end pr-10">
                   <FormSelect
                     name={`usage.clubbingRules.${index}.leaveTypeId`}
                     label="Leave Type"
                     options={LEAVE_TYPES.map(t => ({ label: t.label, value: t.id }))}
                   />
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Cannot be combined with</label>
                      <div className="p-2 border border-slate-100 rounded-lg bg-slate-50 text-[11px] text-slate-400 italic h-12 flex items-center">
                        Multi-select configuration panel
                      </div>
                   </div>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="text-slate-400 hover:text-rose-500 h-8 w-8 rounded-lg"
                      onClick={() => removeClub(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
              </div>
            ))}
            {clubbing.length === 0 && (
              <p className="text-center py-6 text-slate-400 text-xs font-medium italic border border-dashed border-slate-200 rounded-lg">
                No leave clubbing restrictions defined.
              </p>
            )}
         </div>
      </div>
    </div>
  );
};

export default UsagePolicyForm;
