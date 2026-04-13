import type { LucideIcon } from "lucide-react";

export type HomeNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type HomeNavSection = {
  label: string;
  items: HomeNavItem[];
};