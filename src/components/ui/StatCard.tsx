import { cn } from '@/lib/utils';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { Button } from './Button';
import IconButton from './IconButton';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  className,
  iconClassName,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-linear-to-br from-white to-secondary-200 rounded-xl p-8 bg-white border border-slate-200 shadow-premium transition-all duration-300 group hover:border-slate-300/80",
        className
      )}
    >
      {/* Subtle Background Decorative Element */}
      <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-slate-50/50 blur-3xl pointer-events-none group-hover:bg-slate-100/50 transition-colors" />

      <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
        {/* Top Row: Title + Icon */}
        <div className="flex justify-between items-start">
          <p className="text-xl font-semibold text-secondary-500 mt-1">
            {title}
          </p>
          <div className={cn("h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-200/50 shrink-0 group-hover:scale-110 transition-transform duration-500")}>
            <Icon className={cn("h-6 w-6", iconClassName)} strokeWidth={1.5} />
          </div>
        </div>

        {/* Bottom Row: Value + Subtitle */}
        <div className='flex justify-between items-end'>
        <div className="space-y-1.5 pt-4">
          <p className="text-3xl  font-bold text-secondary-600 leading-none">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm font-medium text-slate-500/80 tracking-wide">
              {subtitle}
            </p>
          )}
        </div>
        <IconButton icon={ArrowRight} iconPosition='right' iconClassName='h-4 w-4 p-0' variant="ghost" className='bg-transparent hover:bg-transparent p-0! h-max'>View Details</IconButton>
        </div>
      </div>
    </div>
  );
}
