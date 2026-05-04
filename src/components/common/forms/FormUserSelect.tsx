import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import UserSelect from "@/components/common/inputs/UserSelect";

interface FormUserSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export const FormUserSelect = ({
  name,
  label,
  placeholder,
  required,
  size = "md",
  className,
  disabled,
}: FormUserSelectProps) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-bold text-slate-700 ml-1">
          {label}
          {required && <span className="ml-1 text-red-500 font-bold">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <UserSelect
            value={field.value}
            onChange={(val) => field.onChange(val)}
            placeholder={placeholder}
            error={error?.message}
            size={size}
            className={className}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
};
