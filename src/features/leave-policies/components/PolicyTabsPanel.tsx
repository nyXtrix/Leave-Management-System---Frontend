import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

import CalendarPolicyForm from "./forms/CalendarPolicyForm";
import UsagePolicyForm from "./forms/UsagePolicyForm";
import ApprovalPolicyForm from "./forms/ApprovalPolicyForm";
import BalancePolicyForm from "./forms/BalancePolicyForm";
import { Calendar, Zap, ShieldCheck, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

const triggerClass =
  " px-5 rounded-xl data-[state=active]:bg-white data-[state=active]:text-primary-500 data-[state=active]:shadow-sm text-xs font-bold transition-all relative";

const ErrorDot = () => (
  <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
);

const PolicyTabsPanel = () => {
  const { formState: { errors } } = useFormContext();

  return (
    <div className="space-y-2 border p-2 bg-white rounded-xl">
      <Tabs defaultValue="calendar" className="space-y-2">
        <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
          <TabsList className="gap-1 h-auto flex-nowrap shrink-0">
            <TabsTrigger
              value="calendar"
              className={cn(triggerClass, "cursor-pointer")}
            >
              <Calendar className="h-3.5 w-3.5" />
              Week-offs
              {errors.calendar && <ErrorDot />}
            </TabsTrigger>
            <TabsTrigger
              value="usage"
              className={cn(triggerClass, "cursor-pointer")}
            >
              <Zap className="h-3.5 w-3.5" />
              Usage
              {errors.usage && <ErrorDot />}
            </TabsTrigger>
            <TabsTrigger
              value="approval"
              className={cn(triggerClass, "cursor-pointer")}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Approval
              {errors.approvalRules && <ErrorDot />}
            </TabsTrigger>
            <TabsTrigger
              value="balance"
              className={cn(triggerClass, "cursor-pointer")}
            >
              <Wallet className="h-3.5 w-3.5" />
              Balance
              {errors.balancePolicies && <ErrorDot />}
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="min-h-[25dvh]">
          <TabsContent value="calendar" className="mt-0 outline-none">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <CalendarPolicyForm />
            </div>
          </TabsContent>

          <TabsContent value="usage" className="mt-0 outline-none">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <UsagePolicyForm />
            </div>
          </TabsContent>
          <TabsContent value="approval" className="mt-0 outline-none">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <ApprovalPolicyForm />
            </div>
          </TabsContent>
          <TabsContent value="balance" className="mt-0 outline-none">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <BalancePolicyForm />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PolicyTabsPanel;
