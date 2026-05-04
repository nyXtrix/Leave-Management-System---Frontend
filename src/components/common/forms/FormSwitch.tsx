import { useFormContext, Controller } from "react-hook-form";
import { Switch } from "@/components/ui/Switch";
import { cn } from "@/lib/utils";

interface FormSwitchProps {
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const FormSwitch = ({
  name,
  label,
  description,
  disabled = false,
  className,
}: FormSwitchProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div
          className={cn(
            "flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl transition-all hover:border-slate-300 shadow-sm",
            className
          )}
        >
          <div className="flex flex-col gap-0.5 pr-4">
            <span className="text-sm font-black text-slate-800 tracking-tight leading-normal">
              {label}
            </span>
            {description && (
              <p className="text-[11px] font-medium text-slate-500 leading-normal">
                {description}
              </p>
            )}
          </div>
          <Switch
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
        </div>
      )}
    />
  );
};
