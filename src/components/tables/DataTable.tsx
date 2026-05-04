import { useState, useMemo, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import InputWithIcon from "../common/inputs/InputWithIcon";
import Pagination from "./Pagination";
import { EmptyState, SkeletonRows } from "./DataTable.helpers";
import type { DataTableProps, SortDirection } from "@/types/dataTable.types";

export function DataTable<T extends { id: string }>({
  data,
  columns,
  title,
  subtitle,
  isLoading = false,
  pageSize = 10,
  searchable = true,
  searchKeys = [],
  onRowClick,
  emptyMessage,
  actions,
  hidePagination = false,
  hideHeader = false,
  maxHeight,
  hideScrollbar = false,
  className,
  getRowId,
  totalResults,
  onPageChange,
  onSearchChange,
  currentPage,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [internalPage, setInternalPage] = useState(1);
  const page = currentPage ?? internalPage;

  const [searchInput, setSearchInput] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (onSearchChange) {
        onSearchChange(searchInput);
      } else {
        // Fallback for client-side search (handled in useMemo below)
        setInternalPage(1);
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput, onSearchChange]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
      if (sortDir === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    handlePageChange(1);
  };

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    } else {
      setInternalPage(newPage);
    }
  };

  // Client-side filtering logic
  const filtered = useMemo(() => {
    if (totalResults !== undefined || !searchInput || searchKeys.length === 0)
      return data;
    const q = searchInput.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((k) =>
        String(row[k] ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [data, searchInput, searchKeys, totalResults]);

  // Client-side sorting logic
  const sorted = useMemo(() => {
    if (totalResults !== undefined || !sortKey || !sortDir) return filtered;

    const col = columns.find((c) => String(c.key) === sortKey);

    return [...filtered].sort((a, b) => {
      if (col?.sortFn) {
        return sortDir === "asc" ? col.sortFn(a, b) : col.sortFn(b, a);
      }
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      const as = String(av ?? "");
      const bs = String(bv ?? "");
      return sortDir === "asc" ? as.localeCompare(bs) : bs.localeCompare(as);
    });
  }, [filtered, sortKey, sortDir, columns, totalResults]);

  // If totalResults is provided, we assume data is already paginated by the server
  const paginated =
    totalResults !== undefined || hidePagination
      ? sorted
      : sorted.slice((page - 1) * pageSize, page * pageSize);

  const rowKey = (row: T) => getRowId?.(row) ?? row.id;

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey)
      return <ChevronsUpDown className="h-3.5 w-3.5 text-secondary-400" />;
    return sortDir === "asc" ? (
      <ChevronUp className="h-3.5 w-3.5 text-secondary-500" />
    ) : (
      <ChevronDown className="h-3.5 w-3.5 text-secondary-500" />
    );
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-secondary-200 shadow-soft overflow-hidden",
        className,
      )}
    >
      {/* Table Header / Search Bar */}
      {!hideHeader && (title || searchable) && (
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/40">
          {title && (
            <div>
              <h3 className="text-base font-semibold text-slate-800">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
              )}
            </div>
          )}
          {searchable && (
            <div className="ml-auto w-56">
              <InputWithIcon
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search…"
                icon={Search}
                className="h-8 text-xs"
              />
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div
        className={cn(
          "overflow-x-auto",
          maxHeight && "overflow-y-auto",
          hideScrollbar &&
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        )}
        style={maxHeight ? { maxHeight } : undefined}
      >
        <table className="w-full text-left border-collapse">
          <thead className="bg-secondary-200/60 border-b border-secondary-200 sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  scope="col"
                  className={cn(
                    "px-6 py-3 text-sm font-medium text-secondary-600 whitespace-nowrap",
                    col.sortable &&
                      "cursor-pointer hover:text-slate-700 select-none transition-colors",
                  )}
                  style={col.width ? { width: col.width } : undefined}
                  onClick={
                    col.sortable ? () => handleSort(String(col.key)) : undefined
                  }
                >
                  <div className="flex items-center gap-1.5">
                    {col.header}
                    {col.sortable && <SortIcon colKey={String(col.key)} />}
                  </div>
                </th>
              ))}
              {actions && (
                <th scope="col" className="px-6 py-3 w-[80px] text-right" />
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              <SkeletonRows cols={columns.length + (actions ? 1 : 0)} />
            ) : paginated.length === 0 ? (
              <EmptyState message={emptyMessage} />
            ) : (
              paginated.map((row) => (
                <tr
                  key={rowKey(row)}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "group transition-colors hover:bg-secondary-200/30 border-b border-secondary-100",
                    onRowClick && "cursor-pointer",
                  )}
                >
                  {columns.map((col) => {
                    const rawVal = (row as Record<string, unknown>)[
                      String(col.key)
                    ];
                    return (
                      <td key={String(col.key)} className="px-6 py-3">
                        {col.render ? (
                          col.render(rawVal, row)
                        ) : (
                          <span className="text-sm text-slate-700">
                            {String(rawVal ?? "—")}
                          </span>
                        )}
                      </td>
                    );
                  })}
                  {actions && (
                    <td className="px-6 py-3 w-[80px] text-right">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && !hidePagination && (
        <Pagination
          page={page}
          totalResults={totalResults ?? sorted.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback, Badge };
export type { Column } from "@/types/dataTable.types";
