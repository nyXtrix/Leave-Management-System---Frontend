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

export const THEME_MAP: Record<string, { icon: LucideIcon | string }> = {
  'sick': { icon: HeartPulse },
  'vacation': { icon: Plane },
  'casual': { icon: Home },
  'maternity': { icon: Baby },
  'paternity': { icon: Baby },
  'emergency': { icon: AlertCircle },
  'compensatory': { icon: Clock },
};

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

export const getLeaveTheme = (title: string = ''): { icon: LucideIcon | string } => {
  const key = (title || '').toLowerCase();
  const match = Object.keys(THEME_MAP).find(k => key.includes(k));
  
  if (match) return THEME_MAP[match];
  
  return { 
    icon: getIconFromTitle(title)
  };
};
