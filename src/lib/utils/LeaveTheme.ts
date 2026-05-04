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
  Heart,
  Sun,
  Moon,
  Cloud,
  Umbrella,
  Coffee,
  Backpack,
  Zap,
  Award
} from 'lucide-react';

export const THEME_MAP: Record<string, { icon: LucideIcon | string, color: string }> = {
  'sick': { icon: HeartPulse, color: 'text-rose-600' },
  'vacation': { icon: Plane, color: 'text-emerald-600' },
  'casual': { icon: Home, color: 'text-indigo-600' },
  'maternity': { icon: Baby, color: 'text-purple-600' },
  'paternity': { icon: Baby, color: 'text-blue-600' },
  'emergency': { icon: AlertCircle, color: 'text-amber-600' },
  'compensatory': { icon: Clock, color: 'text-cyan-600' },
};

export const FALLBACK_COLORS = [
  'text-rose-600', 'text-indigo-600', 'text-emerald-600', 
  'text-amber-600', 'text-sky-600', 'text-violet-600', 'text-fuchsia-600',
  'text-pink-600', 'text-orange-600', 'text-lime-600', 'text-teal-600'
];

export const FALLBACK_ICONS = [
  Sparkles, Clock, CalendarDays, Leaf, Rocket, Star, Heart,
  Sun, Moon, Cloud, Umbrella, Coffee, Backpack, Zap, Award
];

export const getIconFromTitle = (title: string): LucideIcon => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_ICONS[Math.abs(hash) % FALLBACK_ICONS.length];
};

export const getColorFromTitle = (title: string): string => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return FALLBACK_COLORS[Math.abs(hash) % FALLBACK_COLORS.length];
};

export const getLeaveTheme = (title: string): { icon: LucideIcon | string, color: string } => {
  const key = title.toLowerCase();
  const match = Object.keys(THEME_MAP).find(k => key.includes(k));
  
  if (match) return THEME_MAP[match];
  
  return { 
    icon: getIconFromTitle(title), 
    color: getColorFromTitle(title) 
  };
};
