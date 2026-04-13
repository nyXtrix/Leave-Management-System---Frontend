import React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextareaInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: LucideIcon;
  label?: string;
  error?: string;
  required?: boolean;
  iconClassName?: string;
  labelClassName?: string;
}

const TextareaInput = React.forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  (
    {
      icon: Icon,
      label,
      error,
      required,
      className,
      iconClassName,
      labelClassName,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "block text-sm font-bold text-slate-700 ml-1",
              labelClassName
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative group/input">
          {Icon && (
            <Icon
              className={cn(
                "absolute left-3.5 top-3.5 h-5 w-5 text-slate-400 pointer-events-none group-focus-within/input:text-primary-500 transition-colors duration-200",
                iconClassName
              )}
            />
          )}

          <textarea
            ref={ref}
            className={cn(
              "flex min-h-[100px] w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm ring-offset-white transition-all",
              "placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary-300 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
              Icon && "pl-11",
              error && "border-red-500 focus:border-red-500 focus:ring-red-100",
              className
            )}
            {...props}
          />
        </div>

        {error && <p className="text-[11px] font-bold text-red-500 ml-1 tracking-tight">{error}</p>}
      </div>
    );
  }
);

TextareaInput.displayName = "TextareaInput";

export default TextareaInput;