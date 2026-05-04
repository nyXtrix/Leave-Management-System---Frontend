import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { CheckCircle, Clock, XCircle, BarChart3 } from 'lucide-react';

interface LeaveRequestStatusCountsProps {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

const LeaveRequestStatusCounts = ({
  total,
  pending,
  approved,
  rejected
}: LeaveRequestStatusCountsProps) => {

  const items = [
    {
      label: 'Total',
      value: total,
      icon: BarChart3,
      color: 'text-slate-700',
      bg: 'bg-slate-100'
    },
    {
      label: 'Pending',
      value: pending,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      label: 'Approved',
      value: approved,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      label: 'Rejected',
      value: rejected,
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50'
    }
  ];

  return (
    <Card className="shadow-sm border rounded-xl h-full">
      <CardHeader>
        <CardTitle className="text-lg font-extrabold text-secondary-800">
          Leave Request Status
        </CardTitle>
        <CardDescription>
            Your leave request status
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col justify-center h-[20dvh]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group flex flex-col items-center justify-center p-4 rounded-xl border bg-white"
              >
                <div className={`p-3 rounded-full ${item.bg} mb-2`}>
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>

                <span className="text-2xl font-bold text-slate-900">
                  {item.value}
                </span>

                <span className="text-sm text-slate-500">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  )
}

export default LeaveRequestStatusCounts