import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { 
  Wallet, 
  Plus, 
  Trash2,
  RefreshCcw,
  AlertCircle,
  Coins,
  TrendingUp,
  History,
  Clock
} from "lucide-react";
import { 
  FormInput, 
  FormSelect,
  FormCheckbox
} from "@/components/common/forms";
import { Button } from "@/components/ui/Button";
import { LEAVE_TYPES } from "../../constants/leaveTypes";

export const BalancePolicyForm = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "balancePolicies",
  });

  return (
    <div className="space-y-6 animate-reveal">
      {/* Section Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <Wallet className="h-4 w-4 text-slate-400" />
          <h3 className="text-sm font-bold text-slate-900">Balance & Carry Forward</h3>
        </div>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Set limits for leave accumulation, year-end carry forward, and negative balance permissions.
        </p>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-6 relative group transition-all hover:border-slate-300">
            <div className="absolute top-2 right-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="text-slate-400 hover:text-rose-500 rounded-lg h-8 w-8"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormSelect
                name={`balancePolicies.${index}.leaveTypeId`}
                label="Type"
                icon={History}
                options={LEAVE_TYPES.map(t => ({ label: t.label, value: t.id }))}
                required
              />
              <FormSelect
                name={`balancePolicies.${index}.roundingRule`}
                label="Rounding"
                icon={RefreshCcw}
                options={[
                  { label: "Round Half Day", value: "HALF_DAY" },
                  { label: "Round Full Day", value: "FULL_DAY" },
                  { label: "No Rounding", value: "NONE" },
                ]}
                required
              />
              <FormCheckbox 
                name={`balancePolicies.${index}.allowNegativeBalance`} 
                topLabel="Negative Balance"
                label="Permit Overdraft"
                icon={AlertCircle}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-slate-100">
               <FormInput
                 name={`balancePolicies.${index}.maxNegativeLimit`}
                 label="Max Negative"
                 type="number"
                 icon={AlertCircle}
               />
               <FormCheckbox 
                 name={`balancePolicies.${index}.allowCarryForward`} 
                 topLabel="Carry Forward"
                 label="Enable Carry Over"
                 icon={RefreshCcw}
               />
               <FormInput
                 name={`balancePolicies.${index}.maxCarryForward`}
                 label="Carry Limit"
                 type="number"
                 icon={TrendingUp}
               />
               <FormInput
                 name={`balancePolicies.${index}.expiryDays`}
                 label="Expiry (Days)"
                 type="number"
                 icon={Clock}
               />
            </div>
          </div>
        ))}

        <div className="flex justify-center">
           <Button
             type="button"
             variant="outline"
             className="w-full max-w-sm h-12 rounded-xl border-dashed border-2 text-slate-500 hover:border-slate-400 hover:text-slate-600 transition-all font-bold text-xs"
             onClick={() => append({ 
               leaveTypeId: "EARNED", 
               allowCarryForward: true, 
               maxCarryForward: 10, 
               allowNegativeBalance: false, 
               maxNegativeLimit: 0,
               allowEncashment: false,
               roundingRule: "HALF_DAY" 
             })}
           >
             <Plus className="h-4 w-4 mr-2" /> Add Balance Rule
           </Button>
        </div>
      </div>
    </div>
  );
};

export default BalancePolicyForm;
