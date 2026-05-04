import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import IconButton from "@/components/ui/IconButton";

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectInputProps {
  options: SelectOption[];
  icon?: LucideIcon;
  label?: string;
  error?: string;
  required?: boolean;
  iconClassName?: string;
  labelClassName?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
  className?: string;
  id?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const SelectInput = React.forwardRef<HTMLButtonElement, SelectInputProps>(
  (
    {
      options,
      icon: Icon,
      label,
      error,
      required,
      className,
      iconClassName,
      labelClassName,
      placeholder = "Select option",
      value: controlledValue,
      defaultValue,
      onChange,
      id,
      size = "md",
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);
    
    const actualValue = controlledValue !== undefined ? controlledValue : internalValue;
    const selectedOption = options.find((opt) => opt.value === actualValue);

    const handleSelect = (val: string | number) => {
      setInternalValue(val);
      onChange?.(val);
      setIsOpen(false);
    };

    const sizeVariants = {
      xs: "h-8 px-2 py-1 text-[11px]",
      sm: "h-10 px-3 py-1.5 text-[12px]",
      md: "h-12 px-4 py-2 text-[13px]",
      lg: "h-14 px-5 py-2.5 text-[14px]",
      xl: "h-16 px-6 py-3 text-[15px]",
    }

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "block text-sm font-bold text-slate-700 ml-1",
              labelClassName
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-500 font-bold">*</span>}
          </label>
        )}

        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <IconButton
              id={id}
              ref={ref}
              type="button"
              noScale
              variant="ghost"
              icon={Icon}
              iconPosition="left"
              iconClassName={cn(
                "transition-colors duration-300",
                isOpen ? "text-primary-500" : "text-slate-400",
                iconClassName
              )}
              className={cn(
                "flex hover:text-gray-700 select-none w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium transition-all outline-none",
                "focus:bg-white focus:border-primary-300 focus:ring-0 hover:bg-white hover:border-slate-300",
                !selectedOption && "text-slate-400 text-xs",
                selectedOption && "text-slate-700",
                error && "border-red-500 focus:border-red-500 focus:ring-red-100",
                sizeVariants[size],
                className
              )}
            >
              <span className="truncate flex-1 text-left ml-1">
                {selectedOption ? selectedOption.label : placeholder}
              </span>
              
              <ChevronDown 
                className={cn(
                  "h-4 w-4 text-slate-400 shrink-0 transition-transform duration-300",
                  isOpen && "rotate-180 text-primary-500"
                )} 
              />
            </IconButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent 
            align="start" 
            className="w-[calc(var(--radix-dropdown-menu-trigger-width))] p-2 mt-2 rounded-2xl animate-reveal z-50 overflow-hidden"
          >
            <div className="max-h-[250px] overflow-y-auto no-scrollbar py-1">
              {options.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all",
                    "hover:bg-primary-50 hover:text-primary-600 focus:bg-primary-50 focus:text-primary-600 outline-none mb-1 last:mb-0",
                    actualValue === option.value ? "bg-primary-50 text-primary-600 font-bold" : "text-slate-600 font-medium"
                  )}
                >
                  <span className="text-sm">{option.label}</span>
                  {actualValue === option.value && <Check className="h-4 w-4 shrink-0" />}
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {error && (
          <p className="text-[10px] font-bold text-red-500 ml-1 tracking-tight leading-none pt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";

export default SelectInput;