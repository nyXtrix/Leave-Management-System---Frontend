import React from 'react';
import { cn } from '@/lib/utils';
import { 
  type LucideIcon, 
  Sparkles, 
  HeartPulse, 
  Plane, 
  Home, 
  Baby, 
  Clock, 
  AlertCircle, 
  CalendarDays, 
  Leaf, 
  Rocket, 
  Star, 
  Heart 
} from 'lucide-react';

const THEME_MAP: Record<string, { icon: LucideIcon | string, color: string }> = {
  'sick': { icon: HeartPulse, color: 'text-rose-600' },
  'vacation': { icon: Plane, color: 'text-emerald-600' },
  'casual': { icon: Home, color: 'text-indigo-600' },
  'maternity': { icon: Baby, color: 'text-purple-600' },
  'paternity': { icon: Baby, color: 'text-blue-600' },
  'emergency': { icon: AlertCircle, color: 'text-amber-600' },
  'compensatory': { icon: Clock, color: 'text-cyan-600' },
};

const FALLBACK_COLORS = [
  'text-rose-600', 'text-indigo-600', 'text-emerald-600 bg-emerald-50', 
  'text-amber-600', 'text-sky-600', 'text-violet-600', 'text-fuchsia-600 bg-fuchsia-100'
];

const FALLBACK_ICONS = [
  Sparkles, Clock, CalendarDays, Leaf, Rocket, Star, Heart
];

const getIconFromTitle = (title: string) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_ICONS[Math.abs(hash) % FALLBACK_ICONS.length];
};

const getColorFromTitle = (title: string) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
};

const getLeaveTheme = (title: string) => {
  const key = title.toLowerCase();
  const match = Object.keys(THEME_MAP).find(k => key.includes(k));
  
  if (match) return THEME_MAP[match];
  
  return { 
    icon: getIconFromTitle(title), 
    color: getColorFromTitle(title) 
  };
};

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
  const themeColor = color || theme.color;
  const percentage = Math.round((available / total) * 100);

  return (
    <div className={cn(
      "relative overflow-hidden border rounded-xl p-4 bg-linear-to-br from-white to-primary-100 group hover:border-slate-300/80 transition-all duration-300 hover:shadow-premium",
      className
    )}>

      <div className="relative z-10 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm font-medium text-secondary-600">Leave Balance</p>
            <h3 className="text-xl font-bold text-secondary-800 capitalize">{title}</h3>
          </div>
          <div className={cn(
            "h-10 w-10 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110",
            themeColor.replace('text-', 'bg-').replace('600', '50')
          )}>
            {typeof Icon === 'string' ? (
              <span className="text-xl">{Icon}</span>
            ) : (
              <Icon className={cn("h-5 w-5", themeColor)} />
            )}
          </div>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-secondary-900 leading-none">{available}</span>
          <span className="text-sm font-semibold text-secondary-400">/ {total} Days</span>
        </div>

        <div className="space-y-2">
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={cn("h-full transition-all duration-1000 ease-out rounded-full shadow-sm", themeColor.replace('text-', 'bg-'))} 
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
