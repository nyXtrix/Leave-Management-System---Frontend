import React from "react";
import { Plus, Trash2, Split, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormSelect, FormInput } from "@/components/common/forms";
import { useFormContext, useFieldArray } from "react-hook-form";
import { RULE_METRICS, RULE_OPERATORS } from "../constants/ruleOptions";

export const RuleBuilder = ({ name }: { name: string }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.conditions`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Split className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Logic Group</span>
        </div>
        <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
           <FormSelect
             name={`${name}.operator`}
             options={[
               { label: "AND", value: "AND" },
               { label: "OR", value: "OR" },
             ]}
             className="h-7 text-[10px] min-w-[70px] bg-transparent border-none"
             
           />
        </div>
      </div>

      <div className="space-y-2 pl-3 border-l-2 border-slate-100">
        {fields.map((field, index) => (
          <div 
            key={field.id} 
            className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_auto] gap-3 items-end bg-white p-3 rounded-xl border border-slate-200 shadow-sm transition-all hover:border-slate-300"
          >
            <FormSelect
              name={`${name}.conditions.${index}.metric`}
              label="Metric"
              icon={Zap}
              options={RULE_METRICS}
              className="h-8 text-xs"
              required
            />
            <FormSelect
              name={`${name}.conditions.${index}.operator`}
              label="Operator"
              icon={ShieldCheck}
              options={RULE_OPERATORS}
              className="h-8 text-xs"
              required
            />
            <FormInput
              name={`${name}.conditions.${index}.value`}
              label="Value"
              placeholder="0"
              className="h-8 text-xs"
              required
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="text-slate-400 hover:text-rose-500 rounded-lg h-8 w-8"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="py-6 text-center border border-dashed border-slate-200 rounded-xl text-slate-400 text-[10px] font-medium italic bg-slate-50/50">
            No specific conditions defined for this rule.
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 px-4 rounded-lg border-slate-200 text-slate-500 hover:bg-slate-50 text-[10px] font-bold"
          onClick={() => append({ metric: "DURATION", operator: "GT", value: 3 })}
        >
          <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Condition
        </Button>
      </div>
    </div>
  );
};

export default RuleBuilder;
