import React from "react";

export type SortDirection = "asc" | "desc" | null;

export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  /** Custom sort comparator. Receives two rows, return -1 / 0 / 1 */
  sortFn?: (a: T, b: T) => number;
}

export interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  pageSize?: number;
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  actions?: (row: T) => React.ReactNode;
  hidePagination?: boolean;
  hideHeader?: boolean;
  maxHeight?: string;
  hideScrollbar?: boolean;
  className?: string;
  getRowId?: (row: T) => string;
  totalResults?: number;
  onPageChange?: (page: number) => void;
  onSearchChange?: (searchTerm: string) => void;
  currentPage?: number;
}
