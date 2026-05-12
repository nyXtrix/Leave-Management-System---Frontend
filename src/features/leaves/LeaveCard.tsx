import React from 'react';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';
import { getLeaveTheme } from '@/lib/utils/LeaveTheme';

interface LeaveCardProps {
  title: string;
  available: number;
  total: number;
  icon?: LucideIcon | string;
  color?: string;
  className?: string;
}

const LeaveCard = ({ 
  title, 
  available, 
  total, 
  icon, 
  color,
  className 
}: LeaveCardProps) => {
  const theme = getLeaveTheme(title);
  const Icon = icon || theme.icon;
  const percentage = Math.round((available / total) * 100);

  return (
    <div className={cn(
      "relative overflow-hidden border rounded-xl p-4 bg-linear-to-br from-white to-secondary-200 group hover:border-slate-300/80 transition-all duration-300 hover:shadow-premium",
      className
    )}>

      <div className="relative z-10 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-secondary-600">Leave Balance</p>
            <h3 className="text-xl font-bold text-secondary-800 capitalize">{title}</h3>
          </div>
          <div className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center bg-primary-200 transition-all duration-500 group-hover:scale-110",
          )}>
            {typeof Icon === 'string' ? (
              <span className="text-xl">{Icon}</span>
            ) : (
              <Icon className={cn("h-5 w-5 text-primary-600", color)} />
            )}
          </div>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-secondary-900 leading-none">{available}</span>
          <span className="text-sm font-semibold text-secondary-400">/ {total} Days</span>
        </div>

        <div className="space-y-2">
          <div className="h-1.5 w-full bg-secondary-300/30 rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-1000 ease-out rounded-full shadow-sm bg-primary-500/80")} 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs font-semibold text-secondary-500">
             <span>{percentage}% Available</span>
             <span>{total - available} Used</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveCard;
