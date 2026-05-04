import React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

interface SectionCardProps {
  title: string;
  description?: string;
  info?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  tooltipAlign?: "start" | "end";
  tooltipSide?: "top" | "bottom" | "left" | "right";
  tooltipOffset?: number;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  description,
  info,
  children,
  className,
  contentClassName,
  tooltipAlign,
  tooltipSide,
  tooltipOffset,
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-xl border border-slate-100 bg-white shadow-sm overflow-visible",
        className,
      )}
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-extrabold text-secondary-800 tracking-tight">{title}</h3>
          {description && (
            <p className="text-sm text-slate-500 mt-1">{description}</p>
          )}
        </div>

        {info && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="h-7 w-7 flex items-center justify-center rounded-full hover:bg-secondary-100">
                  <Info className="text-secondary-400 w-5 h-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side={tooltipSide || "top"}
                align={tooltipAlign}
                sideOffset={tooltipOffset}
                className="max-w-md text-center font-medium"
              >
                {info}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className={cn("px-5 py-5", contentClassName)}>{children}</div>
    </div>
  );
};

export default SectionCard;
