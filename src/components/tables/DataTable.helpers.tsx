import React from "react";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/Skeleton";

export function EmptyState({ message }: { message?: string }) {
  return (
    <tr>
      <td colSpan={99}>
        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
          <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <Search className="h-7 w-7 text-slate-300" />
          </div>
          <p className="text-sm font-semibold text-slate-500">
            {message ?? "No records found"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search or filters
          </p>
        </div>
      </td>
    </tr>
  );
}

export function SkeletonRows({ cols }: { cols: number }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-slate-50">
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className="px-6 py-4">
              <Skeleton className={`h-4 ${j === 0 ? "w-36" : "w-20"}`} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
