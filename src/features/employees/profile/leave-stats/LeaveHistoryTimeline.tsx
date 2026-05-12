import React, { useMemo } from 'react';
import { ChartBarDefault, type ChartData } from '@/components/charts/BarChart'
import { History } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

interface LeaveHistoryTimelineProps {
  leaveHistory: ChartData[];
}

const LeaveHistoryTimeline = ({ leaveHistory }: LeaveHistoryTimelineProps) => {
  const hasData = useMemo(() => {
    return leaveHistory.some(item => 
      Object.entries(item).some(([key, value]) => key !== 'month' && typeof value === 'number' && value > 0)
    );
  }, [leaveHistory]);

  if (!hasData) {
    return (
      <Card className="py-4 hover:shadow-none shadow-none bg-transparent rounded-xl animate-reveal">
        <CardHeader className="px-6">
          <CardTitle className="text-xl">Leave Summary</CardTitle>
          <CardDescription>
            Timeline of leaves taken in the current year
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-2">
          <div className="w-full h-58 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col items-center justify-center text-center p-8 space-y-3">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
              <History className=" text-primary-600" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-secondary-800">No Leave History</p>
              <p className="text-[11px] text-slate-500 max-w-[250px]">
                Historical trends will appear here once leave requests are processed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='animate-reveal'>
        <ChartBarDefault data={leaveHistory} />
    </div>
  );
}

export default LeaveHistoryTimeline