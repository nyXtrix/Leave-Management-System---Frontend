import React, { useState } from "react";
import { EllipsisVertical, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import IconButton from "@/components/ui/IconButton";

export interface DropdownAction {
  label: string;
  icon?: LucideIcon;
  onClick: () => void;
  variant?: "default" | "danger";
  disabled?: boolean;
}

interface DropdownActionsProps {
  actions: DropdownAction[];
  align?: "start" | "center" | "end";
  className?: string;
  triggerClassName?: string;
}

const DropdownActions: React.FC<DropdownActionsProps> = ({
  actions,
  align = "end",
  className,
  triggerClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <IconButton
            icon={EllipsisVertical}
            variant="ghost"
            className={cn(
              "h-8 w-8 p-0 flex items-center justify-center rounded-lg text-secondary-400 hover:text-secondary-700 hover:bg-secondary-100 transition-all",
              isOpen && "bg-secondary-100 text-secondary-700",
              triggerClassName
            )}
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align={align}
          sideOffset={8}
          className="w-48 p-1.5 rounded-2xl shadow-premium border-slate-200 animate-reveal z-50 overflow-hidden"
        >
          <div className="space-y-1">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <DropdownMenuItem
                  key={index}
                  disabled={action.disabled}
                  onSelect={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer transition-all outline-none",
                    action.variant === "danger"
                      ? "text-red-500 hover:bg-red-100 focus:bg-red-100 hover:text-red-600"
                      : "text-secondary-600 hover:bg-primary-50 hover:text-primary-600 focus:bg-primary-50 focus:text-primary-600",
                    action.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" strokeWidth={2.5} />}
                  <span className="text-sm font-bold">{action.label}</span>
                </DropdownMenuItem>
              );
            })}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownActions;
