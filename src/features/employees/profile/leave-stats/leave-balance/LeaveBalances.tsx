import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Grid2x2X } from "lucide-react";

export interface LeaveBalanceRecord {
  id: string;
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
        {leaveBalances.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center border rounded-xl bg-primary-100/10 text-center p-6 space-y-3">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
              <Grid2x2X className="text-primary-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-secondary-800">No balances available</p>
              <p className="text-[11px] text-secondary-500 max-w-[200px]">
                Leave entitlements will be visible once the account is fully active.
              </p>
            </div>
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

export default LeaveBalances;
