import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/utils";

interface FormCheckboxProps {
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const FormCheckbox = ({
  name,
  label,
  description,
  disabled = false,
  className,
}: FormCheckboxProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div
          className={cn(
            "flex items-start space-x-3 p-4 bg-white border border-slate-200 rounded-2xl transition-all hover:border-slate-300 shadow-sm",
            className
          )}
        >
          <div className="pt-0.5">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </div>
          <div className="flex flex-col gap-0.5 pr-4 select-none cursor-pointer" onClick={() => !disabled && field.onChange(!field.value)}>
            <label
              htmlFor={name}
              className="text-sm font-black text-slate-800 tracking-tight leading-normal cursor-pointer"
            >
              {label}
            </label>
            {description && (
              <p className="text-[11px] font-medium text-slate-500 leading-normal">
                {description}
              </p>
            )}
          </div>
        </div>
      )}
    />
  );
};
