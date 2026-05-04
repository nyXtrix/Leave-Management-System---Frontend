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

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
}

export interface QueryParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
}
