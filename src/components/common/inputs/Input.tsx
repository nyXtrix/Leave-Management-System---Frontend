import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  error?: string;
  label?: string;
  required?: boolean;
  labelClassName?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  wrapperClassName?: string;
  size?: "sm" | "md" | "lg";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, label, required, labelClassName, leftSection, rightSection, wrapperClassName, size = "md", ...props }, ref) => {

    const sizeClasses = {
      sm: "h-10 text-xs rounded-lg",
      md: "h-12 text-sm rounded-xl",
      lg: "h-14 text-base rounded-2xl"
    };

    const sectionOffsets = {
      sm: "px-10",
      md: "px-11",
      lg: "px-12"
    };

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              "block text-sm font-bold text-slate-700 ml-1",
              size === "sm" && "text-xs",
              labelClassName
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500 font-bold">*</span>}
          </label>
        )}

        <div className={cn("relative group/input", wrapperClassName)}>
          {leftSection && (
            <div className={cn(
              "absolute top-1/2 -translate-y-1/2 z-10 transition-colors pointer-events-none",
              size === "sm" ? "left-3" : "left-4"
            )}>
              {React.isValidElement(leftSection) && 
               typeof (leftSection.type as any) !== 'string' ? 
               React.cloneElement(leftSection as React.ReactElement<any>, { 
                 className: cn(
                   size === "sm" ? "h-4 w-4" : "h-5 w-5", 
                   (leftSection.props as any).className
                 ) 
               }) 
               : leftSection}
            </div>
          )}

          <input
            type={type}
            ref={ref}
            className={cn(
              "flex w-full border border-slate-200 bg-slate-50/50 px-4 font-medium transition-all",
              "placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary-300 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
              sizeClasses[size],
              leftSection && (size === "sm" ? "pl-9" : sectionOffsets[size]),
              rightSection && (size === "sm" ? "pr-9" : sectionOffsets[size]),
              error && "border-red-500 focus:border-red-500 focus:ring-red-100",
              className
            )}
            {...props}
          />

          {rightSection && (
            <div className={cn(
              "absolute top-1/2 -translate-y-1/2 z-10 transition-colors pointer-events-none",
              size === "sm" ? "right-3" : "right-4"
            )}>
              {rightSection}
            </div>
          )}
        </div>

        {error && (
          <p className="text-[10px] font-bold text-red-500 ml-1 tracking-tight">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
