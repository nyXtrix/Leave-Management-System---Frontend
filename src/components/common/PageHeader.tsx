import React from "react";
import { type LucideIcon, Search, RefreshCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import InputWithIcon from "@/components/common/inputs/InputWithIcon";
import IconButton from "@/components/ui/IconButton";

export interface PageHeaderProps {
  title?: string;
  subtitle?: React.ReactNode;
  icon?: LucideIcon;
  badge?: React.ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearch?: (value: string) => void;
  filters?: React.ReactNode;
  actions?: React.ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  children?: React.ReactNode;
  className?: string;
  sticky?: boolean;
}

const PageHeader = ({
  title,
  subtitle,
  icon: Icon,
  badge,
  searchPlaceholder = "Search...",
  searchValue,
  onSearch,
  filters,
  actions,
  onRefresh,
  isRefreshing,
  children,
  className,
  sticky = true,
}: PageHeaderProps) => {
  const hasLeft = !!(title || subtitle || Icon || badge);
  const hasRight = !!(onSearch || filters || actions || onRefresh || children);

  return (
    <div
      className={cn(
        "bg-white/80 backdrop-blur-sm px-6 py-4 flex flex-col md:flex-row gap-4 items-center transition-all duration-300",
        sticky && "sticky top-0 z-10",
        className,
      )}
    >
      {/* Left Section */}
{hasLeft && (
  <div className="flex items-center gap-4 min-w-0">
    {Icon && (
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-secondary-200 bg-secondary-50 shrink-0">
        <Icon className="h-5 w-5 text-secondary-700" />
      </div>
    )}

    <div className="min-w-0">
      <div className="flex items-center gap-2 min-w-0">
        {title && (
          <h1 className="truncate text-2xl font-bold tracking-tight text-secondary-900">
            {title}
          </h1>
        )}

        {badge && (
          <div className="shrink-0">
            {badge}
          </div>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 truncate text-sm text-secondary-500">
          {subtitle}
        </p>
      )}
    </div>
  </div>
)}

      {/* Right Section: Controls */}
      {hasRight && (
        <div
          className={cn(
            "flex items-center gap-3 w-full",
            hasLeft ? "md:w-auto md:ml-auto" : "flex-1",
          )}
        >
          {onSearch && (
            <div
              className={cn(
                "relative transition-all duration-300",
                hasLeft ? "w-full md:w-64 lg:w-72" : "flex-1",
              )}
            >
              <InputWithIcon
                icon={Search}
                type="text"
                placeholder={searchPlaceholder}
                value={searchValue}
                size="sm"
                onChange={(e) => onSearch(e.target.value)}
                wrapperClassName="!mb-0"
              />
            </div>
          )}

          {filters && (
            <div className="flex items-center gap-2 shrink-0">{filters}</div>
          )}

          {(onRefresh || actions || children) && (
            <div className="flex items-center gap-2 shrink-0">
              {onRefresh && (
                <IconButton
                  icon={RefreshCcw}
                  onClick={onRefresh}
                  disabled={isRefreshing}
                  tooltip="Refresh"
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0 rounded-xl bg-secondary-50/50 border-secondary-200/60 text-secondary-500 hover:text-primary-600 hover:bg-primary-50/30 hover:border-primary-200 transition-all shadow-none"
                  iconClassName={`h-4.5 w-4.5 ${isRefreshing ? "animate-spin" : ""}`}
                />
              )}
              {actions}
              {children}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
