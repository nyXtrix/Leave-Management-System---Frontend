import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export interface LeaveBalanceRecord {
  id: string;
  type: string;
  label: string;
  total: number;
  used: number;
  available: number;
  pending: number;
}

interface LeaveBalancesProps {
  leaveBalances: LeaveBalanceRecord[];
}


const LeaveBalances = ({ leaveBalances }: LeaveBalancesProps) => {
  return (
    <Card className="rounded-xl border shadow-sm bg-white h-[32dvh] flex flex-col overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-extrabold text-secondary-800">
          Leave Balances
        </CardTitle>
        <CardDescription>Your remaining leave entitlement</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          {leaveBalances.map((leave) => {
            const isLow = leave.available <= 3;

            return (
              <div
                key={leave.id}
                className="
                  group flex items-center justify-between
                  rounded-md border border-slate-100 bg-secondary-100/60
                  px-4 py-4
                  hover:shadow-sm hover:border-slate-200 transition-all duration-200
                "
              >
                <div className="flex flex-col">
                  <span className="text-base font-bold text-secondary-800">
                    {leave.label}
                  </span>

                  <span className="text-xs font-medium text-secondary-500 mt-0.5">
                    Used {leave.used} of {leave.total}
                  </span>
                </div>

                <div className="text-right">
                  <div
                    className={`
                      inline-flex items-center px-2 py-0.5 rounded-full text-base font-bold
                      ${
                        isLow
                          ? "bg-secondary-200 text-secondary-800"
                          : "bg-secondary-100 text-secondary-700"
                      }
                    `}
                  >
                    {leave.available} left
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1">Available</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveBalances;
