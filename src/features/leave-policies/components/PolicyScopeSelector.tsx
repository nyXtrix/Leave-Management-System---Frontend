import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  Building2,
  Users2,
  ShieldCheck,
  Info,
  LensConcave,
} from "lucide-react";
import { FormInput, FormSelect } from "@/components/common/forms";
import type { RootState, AppDispatch } from "@/store";
import { fetchDepartments, fetchRoles } from "@/store/slices/lookupSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

const SCOPE_OPTIONS = [
  { label: "Organization Wide", value: "org", icon: Building2 },
  { label: "Department Level", value: "department", icon: Users2 },
  { label: "Role Specific", value: "role", icon: ShieldCheck },
];

export const PolicyScopeSelector = () => {
  const { watch, setValue } = useFormContext();
  const dispatch = useDispatch<AppDispatch>();
  const scope = watch("scope");

  const { departments, roles } = useSelector(
    (state: RootState) => state.lookups,
  );
  const [targetOptions, setTargetOptions] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    if (scope === "department") {
      setTargetOptions(departments.data);
    } else if (scope === "role") {
      setTargetOptions(roles.data);
    } else {
      setTargetOptions([]);
    }
  }, [scope, departments.data, roles.data]);

  const scopeId = watch("scopeId");
  const name = watch("name");

  useEffect(() => {
    if (scope === "org") {
      if (scopeId !== "org_global") {
        setValue("scopeId", "org_global", { shouldValidate: true });
      }
    } else if (scopeId === "org_global") {
      setValue("scopeId", "", { shouldValidate: true });
    }
  }, [scope, scopeId, setValue]);

  useEffect(() => {
    if (!name || name === "") {
      let suggestedName = "";
      if (scope === "org") {
        suggestedName = "Organization Policy";
      } else if (scopeId && scopeId !== "") {
        const selectedTarget = targetOptions.find((opt) => opt.value === scopeId);
        if (selectedTarget) {
          suggestedName = `${selectedTarget.label} Policy`;
        }
      }

      if (suggestedName) {
        setValue("name", suggestedName, { shouldValidate: true, shouldDirty: true });
      }
    }
  }, [scope, scopeId, targetOptions, name, setValue]);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
        <div className="p-2 rounded-full bg-primary-100">
          <LensConcave className="h-5 w-5 text-primary-500" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-none mb-1">
            Policy Scope & Identity
          </h3>
          <p className="text-[11px] text-slate-500 font-medium">
            Configure the organizational level where this policy applies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormSelect
          name="scope"
          label="Policy Scope"
          placeholder="Select Scope"
          options={[
            { label: "Organization Wide", value: "org" },
            { label: "Department Specific", value: "department" },
            { label: "Role Specific", value: "role" },
          ]}
        />

        <FormSelect
          name="scopeId"
          label="Target Identity"
          placeholder={
            scope === "org" ? "Organization-wide" : "Select Identity"
          }
          icon={ShieldCheck}
          required={scope !== "org"}
          disabled={scope === "org"}
          options={targetOptions}
        />

        <FormInput
          name="name"
          label="Policy Name"
          placeholder="e.g. Engineering Policy"
          required
        />
      </div>

      <div className="p-3 rounded-lg bg-amber-50 border border-amber-100 flex items-start gap-2.5">
        <Info className="h-3.5 w-3.5 mt-0.5 text-amber-600" />
        <p className="text-[11px] text-amber-800 leading-relaxed italic">
          Note: Role-specific policies have the highest priority and
          override both Department and Organization-wide settings.
        </p>
      </div>
    </div>
  );
};

export default PolicyScopeSelector;
