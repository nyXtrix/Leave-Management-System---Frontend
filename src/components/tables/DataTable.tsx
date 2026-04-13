import { useState, useMemo } from "react";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
} from "lucide-react";
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
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
      if (sortDir === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const filtered = useMemo(() => {
    if (!search || searchKeys.length === 0) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((k) =>
        String(row[k] ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [data, search, searchKeys]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = String((a as Record<string, unknown>)[sortKey] ?? "");
      const bv = String((b as Record<string, unknown>)[sortKey] ?? "");
      return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [filtered, sortKey, sortDir]);

  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

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
    <div className="rounded-xl border border-secondary-200 shadow-soft overflow-hidden">
      {/* Header */}
      {(title || searchable) && (
        <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-slate-100 bg-slate-50/40">
          {title && (
            <div>
              <h3 className="text-xl font-black tracking-tight text-slate-800">
                {title || "Table"}
              </h3>
              {subtitle && (
                <p className="text-[11px] font-bold tracking-widest text-slate-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          )}
          {searchable && (
            <div className="ml-auto w-64">
              <InputWithIcon
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search…"
                icon={Search}
                className="h-9 text-xs"
              />
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary-200/60 border-b border-secondary-200">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn(
                    "px-6 py-4 text-base font-medium text-secondary-600 whitespace-nowrap",
                    col.sortable &&
                      "cursor-pointer hover:text-slate-600 select-none transition-colors",
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
              {actions && <th className="px-6 py-4 w-12" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {isLoading ? (
              <SkeletonRows cols={columns.length + (actions ? 1 : 0)} />
            ) : paginated.length === 0 ? (
              <EmptyState message={emptyMessage} />
            ) : (
              paginated.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    "group transition-colors hover:bg-secondary-200/30 border-b border-secondary-200",
                    onRowClick && "cursor-pointer",
                  )}
                >
                  {columns.map((col) => {
                    const rawVal = (row as Record<string, unknown>)[
                      String(col.key)
                    ];
                    return (
                      <td key={String(col.key)} className="px-6 py-4">
                        {col.render ? (
                          col.render(rawVal, row)
                        ) : (
                          <span className="text-sm font-medium text-slate-700">
                            {String(rawVal ?? "—")}
                          </span>
                        )}
                      </td>
                    );
                  })}
                  {actions && (
                    <td className="px-6 py-4 text-right">{actions(row)}</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && (
        <Pagination 
          page={page} 
          totalResults={sorted.length} 
          pageSize={pageSize} 
          onPageChange={setPage} 
        />
      )}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback, Badge };
export type { Column } from "@/types/dataTable.types";
