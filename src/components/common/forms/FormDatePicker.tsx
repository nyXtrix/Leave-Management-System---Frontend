import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { DatePicker } from "@/components/ui/DatePicker";
import { Label } from "@/components/ui/Label";
import { cn } from "@/lib/utils";

interface FormDatePickerProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export const FormDatePicker = ({ 
  name, 
  label, 
  placeholder, 
  className,
  required
}: FormDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      {label && (
        <Label 
          htmlFor={name}
          className={cn("block text-sm font-bold text-slate-700 ml-1")}
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="space-y-1">
            <DatePicker
              date={field.value ? new Date(field.value) : undefined}
              onChange={(date) => field.onChange(date?.toISOString())}
              placeholder={placeholder}
              className={cn(className, error && "border-rose-400 focus:ring-rose-500/10")}
            />
            {error && (
              <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider ml-1">
                {error.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};
