import { leavePolicyService } from "@/services/leavePolicy.service";
import { Button } from "@/components/ui/Button";
import PolicyScopeSelector from "./components/PolicyScopeSelector";
import PolicyTabsPanel from "./components/PolicyTabsPanel";
import { Form } from "@/components/common/forms/Form";
import {
  MasterPolicySchema,
  type MasterPolicyType,
} from "@/validations/leaves/policy/MasterPolicySchema";
import { useQuery } from "@/hooks/useQuery";
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import {
  mapBackendToFrontend,
  mapFrontendToBackend,
} from "./utils/policyMapper";
import type { PolicyRequest } from "@/types/policy.types";
import { useLoader } from "@/contexts/LoaderContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


const DEFAULT_POLICY_VALUES: MasterPolicyType = {
  scope: "org",
  scopeId: "org_global",
  name: "",
  isActive: true,
  priority: 0,
  calendar: {
    weekOffs: [],
    compOffEligibility: {
      enabled: false,
      minHoursForHalfDay: 0,
      minHoursForFullDay: 0,
    },
    holidays: [],
  },
  definitions: [],
  usage: {
    sandwichEnabled: false,
    includeWeekendsInSandwich: false,
    includeHolidaysInSandwich: false,
    clubbingRules: [],
    timing: {
      advanceNoticeDays: 0,
      allowBackdated: false,
      maxFutureDays: 0,
    },
    restrictions: {
      minServiceDays: 0,
      minDaysPerRequest: 0,
      maxDaysPerRequest: 0,
      maxLeavesPerMonth: 0,
      maxLeavesPerYear: 0,
    },
    blackoutPeriods: [],
  },
  approvalRules: [],
  balancePolicies: [],
};

const LeavePolicyManagement = () => {
  const { showLoader, hideLoader } = useLoader();

  const methods = useForm<MasterPolicyType>({
    resolver: zodResolver(MasterPolicySchema) as any,
    defaultValues: DEFAULT_POLICY_VALUES,
    mode: "onChange",
  });

  const {
    watch,
    reset,
    formState: { isDirty },
  } = methods;

  const scope = watch("scope");
  const scopeId = watch("scopeId");
  const [committedParams, setCommittedParams] = useState<
    [string, string] | null
  >(null);

  const fetchPolicy = useCallback((params: [string, string] | null) => {
    if (!params) return Promise.resolve(null);
    return leavePolicyService.getPolicyByScope(params[0], params[1]);
  }, []);

  const {
    data: policyData,
    isLoading,
    refetch,
    error,
  } = useQuery<PolicyRequest | null, [[string, string] | null]>(
    fetchPolicy,
    [committedParams],
    { showGlobalLoader: true },
  );


  const lastResetRef = useRef<{ 
    paramsKey: string | null; 
    hadData: boolean;
    errorStatus: number | null;
  }>({
    paramsKey: null,
    hadData: false,
    errorStatus: null,
  });

  useEffect(() => {
    const paramsKey = committedParams ? JSON.stringify(committedParams) : null;
    const hadData = !!policyData;
    const errorStatus = (error as any)?.status || null;

    if (isLoading) return;

    if (!committedParams) {
      lastResetRef.current = { paramsKey: null, hadData: false, errorStatus: null };
      return;
    }

    const prev = lastResetRef.current;

    if (
      prev.paramsKey === paramsKey &&
      prev.hadData === hadData &&
      prev.errorStatus === errorStatus
    )
      return;

    lastResetRef.current = { paramsKey, hadData, errorStatus };

    if (policyData) {
      const mappedData = mapBackendToFrontend(policyData);
      reset(mappedData as MasterPolicyType);
    } else if (!error || errorStatus === 404) {
      reset({
        ...DEFAULT_POLICY_VALUES,
        scope: committedParams[0] as any,
        scopeId: committedParams[1],
      });
    }
  }, [policyData, isLoading, committedParams, reset, error]);


  useEffect(() => {
    const isConsistent =
      (scope === "org" && scopeId === "org_global") ||
      (scope !== "org" && scopeId !== "" && scopeId !== "org_global");

    if (isConsistent) {
      setCommittedParams((prev) => {
        if (prev && prev[0] === scope && prev[1] === scopeId) return prev;
        return [scope, scopeId];
      });
    } else {
      setCommittedParams(null);
    }
  }, [scope, scopeId]);

  const onSubmit = (data: MasterPolicyType) => {
    showLoader();
    const mappedData = mapFrontendToBackend(data);
    return leavePolicyService.saveUnifiedPolicy(mappedData)
      .then(() => refetch())
      .finally(() => hideLoader());
  };

  return (
    <Form<MasterPolicyType>
      schema={MasterPolicySchema}
      onSubmit={onSubmit}
      methods={methods}
      className="h-full"
    >
      <div className="relative flex flex-col h-full">
        <div className="flex-1 space-y-6 pb-20">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <PolicyScopeSelector />
          </div>

            <PolicyTabsPanel />
        </div>

        <div className="sticky bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 py-4 flex items-center justify-end gap-3 z-20">
          <Button type="button" variant="outline" onClick={() => reset()} size="sm">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isDirty}
            isLoading={methods.formState.isSubmitting}
            size="sm"
            className={`${
              !isDirty
                ? "disabled:opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {policyData ? "Save Changes" : "Create Policy"}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default LeavePolicyManagement;
