import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  className?: string;
  compact?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
  compact = false,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center animate-reveal",
        compact && "p-4",
        className
      )}
    >
      <div className={cn("relative mb-4", compact && "mb-3")}>
        <div className={cn("absolute inset-0 bg-primary-100/50 rounded-full blur-2xl scale-150", compact && "blur-xl")} />
        <div className={cn(
          "relative bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-primary-500",
          compact ? "h-12 w-12" : "h-16 w-16"
        )}>
          {Icon ? (
            <Icon className={cn(compact ? "h-6 w-6" : "h-8 w-8")} />
          ) : (
            <div className={cn(
              "rounded-full border-2 border-dashed border-primary-200",
              compact ? "h-6 w-6" : "h-8 w-8"
            )} />
          )}
        </div>
      </div>

      <h3 className={cn("font-bold text-slate-800 mb-2", compact ? "text-base" : "text-lg")}>{title}</h3>
      <p className={cn("text-slate-500 max-w-[280px] leading-relaxed", compact ? "text-[12px] mb-4" : "text-sm mb-6")}>
        {description}
      </p>

      {action && (
        <Button
          onClick={action.onClick}
          className="gradient-primary shadow-glow-primary rounded-xl font-bold"
        >
          {action.icon && <action.icon className="mr-2 h-4 w-4" />}
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
