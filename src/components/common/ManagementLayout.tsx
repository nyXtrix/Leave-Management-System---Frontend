import React from "react";
import { cn } from "@/lib/utils";
import PageHeader, { type PageHeaderProps } from "./PageHeader";
import Pagination, { type PaginationProps } from "../tables/Pagination";
import Loader from "./Loader";

interface ManagementLayoutProps {
  header?: React.ReactNode;
  headerProps?: PageHeaderProps;
  paginationProps?: PaginationProps;
  children: React.ReactNode;
  metrics?: React.ReactNode;
  toolbar?: React.ReactNode;
  sidebar?: React.ReactNode;
  emptyState?: React.ReactNode;
  isLoading?: boolean;
  isEmpty?: boolean;
  className?: string;
  containerClassName?: string;
  contentClassName?: string;
  mainClassName?: string;
  sidebarClassName?: string;
  contentContainerClassName?: string;
  stickyHeader?: boolean;
  isFullHeight?: boolean;
  inputSize?: "sm" | "md" | "lg";
}

const ManagementLayout = ({
  header,
  headerProps,
  paginationProps,
  children,
  metrics,
  toolbar,
  sidebar,
  emptyState,
  isLoading,
  isEmpty,
  className,
  containerClassName,
  contentClassName,
  mainClassName,
  sidebarClassName,
  contentContainerClassName,
  stickyHeader = true,
  isFullHeight = true,
  inputSize = "md",
}: ManagementLayoutProps) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden bg-white border border-secondary-200/80 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-secondary-300/60 animate-reveal",
        isFullHeight && "flex-1",
        containerClassName || className,
      )}
    >
      <div
        className={cn(
          "shrink-0 border-b border-secondary-200/60 bg-white/80 backdrop-blur-md transition-all duration-300",
          stickyHeader && "sticky top-0 z-30",
          header || headerProps ? "block" : "hidden",
        )}
        style={{
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
        }}
      >
        {header ||
          (headerProps && (
            <PageHeader
              {...headerProps}
              sticky={false}
              className=" border-none shadow-none bg-secondary-100/50 py-5 px-6 sm:px-8 overflow-hidden"
            />
          ))}
      </div>

      {metrics && (
        <div className="shrink-0 px-6 sm:px-8 py-4 bg-secondary-50/30 border-b border-secondary-100/80">
          {metrics}
        </div>
      )}

      {toolbar && (
        <div className="shrink-0 px-6 sm:px-8 py-3 bg-white border-b border-secondary-100/50">
          {toolbar}
        </div>
      )}

      <div className={cn("flex flex-1 min-h-0", contentContainerClassName)}>
        {sidebar && (
          <aside
            className={cn(
              "hidden lg:flex w-64 shrink-0 border-r border-secondary-100/80 bg-secondary-50/20 flex-col overflow-y-auto",
              sidebarClassName,
            )}
          >
            {sidebar}
          </aside>
        )}

        <main
          className={cn(
            "flex-1 flex flex-col min-w-0 relative bg-secondary-100/50",
            mainClassName,
          )}
        >
          <div
            className={cn(
              "flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-8",
              contentClassName,
            )}
          >
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-4">
                <Loader />
                <p className="text-sm font-medium text-secondary-400 animate-pulse">
                  Syncing registry...
                </p>
              </div>
            ) : isEmpty ? (
              <div className="flex-1 flex items-center justify-center min-h-100">
                {emptyState}
              </div>
            ) : (
              <div className="animate-reveal duration-500">{children}</div>
            )}
          </div>
        </main>
      </div>

      {paginationProps && (
        <footer className="shrink-0 border-t border-secondary-200 bg-secondary-100/80 px-6 py-4 sm:px-8 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
          <Pagination
            {...paginationProps}
            className="border-t-0 bg-transparent p-0 shadow-none"
          />
        </footer>
      )}
    </div>
  );
};

export default ManagementLayout;
