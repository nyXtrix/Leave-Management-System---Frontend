import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface FormCheckboxProps {
  name: string;
  label: string;
  topLabel?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
  icon?: LucideIcon;
  required?: boolean;
}

export const FormCheckbox = ({
  name,
  label,
  topLabel,
  description,
  disabled = false,
  className,
  icon: Icon,
  required,
}: FormCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={cn("w-full space-y-2", className)}>
          {topLabel && (
            <label className="block text-sm font-bold text-slate-700 ml-1">
              {topLabel}
              {required && <span className="ml-1 text-red-500 font-bold">*</span>}
            </label>
          )}
          <label
            className={cn(
              "flex items-center gap-3 h-12 px-4 w-full",
              "border border-slate-200 bg-slate-50/50 rounded-xl",
              "transition-all hover:border-slate-300 hover:bg-white group/checkbox",
              "cursor-pointer select-none",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {Icon && (
              <Icon className="h-4 w-4 text-slate-400 group-hover/checkbox:text-primary-500 transition-colors" />
            )}
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
            <div className="flex flex-col gap-0 min-w-0">
              <span
                className="text-[13px] font-medium text-slate-700 leading-tight"
              >
                {label}
              </span>
              {description && (
                <p className="text-[10px] font-bold text-slate-400 tracking-tight truncate leading-tight">
                  {description}
                </p>
              )}
            </div>
          </label>
        </div>
      )}
    />
  );
};
