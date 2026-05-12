import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
  ShieldCheck,
  Plus,
  Trash2,
  Settings2,
  TrendingUp,
  Layers,
  UserCheck,
  Info,
} from "lucide-react";
import { FormInput, FormSelect } from "@/components/common/forms";
import { Button } from "@/components/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { fetchRoles } from "@/store/slices/lookupSlice";
import type { RootState, AppDispatch } from "@/store";
import RuleBuilder from "../RuleBuilder";
import { APPROVAL_MODES } from "../../constants/ruleOptions";

export const ApprovalPolicyForm = () => {
  const { control, getValues, setValue, watch } = useFormContext();
  const dispatch = useDispatch<AppDispatch>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "approvalRules",
  });

  const { data: roles } = useSelector(
    (state: RootState) => state.lookups.roles,
  );
  const approverOptions = React.useMemo(
    () => [
      ...(roles || []).map((r: any) => ({ label: r.label, value: r.value })),
    ],
    [roles],
  );

  React.useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  return (
    <div className="space-y-6 animate-reveal">
      {/* Section Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="h-4 w-4 text-slate-400" />
          <h3 className="text-sm font-bold text-slate-900">
            Approval Workflows
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Define routing logic and multi-tier approval chains for leave
          requests.
        </p>

        <div className="mt-4 p-3 bg-blue-50/50 border border-blue-100 rounded-lg flex gap-3">
          <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-700 leading-relaxed">
            <span className="font-semibold text-blue-800">Note:</span> The
            employee's direct manager is always the{" "}
            <span className="font-bold underline decoration-blue-200">
              First Approver
            </span>
            . The steps configured below represent additional approval levels
            (Level 2, Level 3, etc.).
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-6 relative group transition-all hover:border-slate-300"
          >
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.5fr] gap-4">
              <FormInput
                name={`approvalRules.${index}.name`}
                label="Workflow Name"
                placeholder="e.g., Extended Sick Leave"
                icon={Settings2}
                required
              />
              <FormInput
                name={`approvalRules.${index}.priority`}
                label="Priority"
                type="number"
                icon={TrendingUp}
                required
              />
              <FormSelect
                name={`approvalRules.${index}.approvalMode`}
                label="Mode"
                icon={Layers}
                options={APPROVAL_MODES}
                required
              />
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Entrance Conditions
                </h4>
                <RuleBuilder name={`approvalRules.${index}.conditions`} />
              </div>

              <div className="p-4 bg-white rounded-lg border border-slate-200 space-y-3">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Approval Phases
                  </h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 text-primary-600 hover:bg-primary-50 rounded-md font-bold text-[10px] px-2"
                    onClick={() => {
                      const currentLevels =
                        watch(`approvalRules.${index}.levels`) || [];
                      setValue(
                        `approvalRules.${index}.levels`,
                        [
                          ...currentLevels,
                          {
                            id: crypto.randomUUID(),
                            rank: currentLevels.length + 1,
                            approverType: "MANAGER",
                          },
                        ],
                        { shouldDirty: true, shouldValidate: true },
                      );
                    }}
                  >
                    <Plus className="h-3 w-3 mr-1" /> Add Tier
                  </Button>
                </div>

                <div className="space-y-2">
                  {(watch(`approvalRules.${index}.levels`) || []).map(
                    (step: any, sIdx: number) => (
                      <div
                        key={step.id}
                        className="flex flex-col sm:flex-row sm:items-center gap-3 bg-slate-50/50 p-3 rounded-lg border border-slate-100 group/tier relative"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                            {step.rank}
                          </div>
                          <FormSelect
                            name={`approvalRules.${index}.levels.${sIdx}.approverType`}
                            className="h-9 text-xs flex-1"
                            icon={UserCheck}
                            options={roles}
                          />
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-slate-300 hover:text-rose-500 absolute top-2 right-2 sm:static h-8 w-8 rounded-lg"
                          onClick={() => {
                            const levels = [
                              ...getValues(`approvalRules.${index}.levels`),
                            ];
                            levels.splice(sIdx, 1);
                            setValue(
                              `approvalRules.${index}.levels`,
                              levels.map((s: any, i: number) => ({
                                ...s,
                                rank: i + 1,
                              })),
                              { shouldDirty: true, shouldValidate: true },
                            );
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ),
                  )}
                  {(watch(`approvalRules.${index}.levels`)?.length || 0) ===
                    0 && (
                    <div className="text-center py-4 text-slate-300 text-[10px] font-medium italic border border-dashed border-slate-200 rounded-lg">
                      No approval tiers configured.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            className="w-full max-w-sm h-12 rounded-xl border-dashed border-2 text-slate-500 hover:border-slate-400 hover:text-slate-600 transition-all font-bold text-xs"
            onClick={() =>
              append({
                id: crypto.randomUUID(),
                name: "",
                priority: 10,
                conditions: { operator: "AND", conditions: [] },
                approvalMode: "SEQUENTIAL",
                levels: [],
              })
            }
          >
            <Plus className="h-4 w-4 mr-2" /> New Workflow Rule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApprovalPolicyForm;
