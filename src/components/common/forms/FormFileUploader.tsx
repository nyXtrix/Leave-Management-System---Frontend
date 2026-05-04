import { useFormContext, Controller } from "react-hook-form";
import FileUploader from "@/components/common/inputs/FileUploader";
import type { LucideIcon } from "lucide-react";

interface FormFileUploaderProps {
  name: string;
  label?: string;
  required?: boolean;
  title: string;
  description?: string;
  icon?: LucideIcon;
  accept?: string;
  className?: string;
}

export const FormFileUploader = ({
  name,
  label,
  required,
  title,
  description,
  icon,
  accept,
  className,
}: FormFileUploaderProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <FileUploader
          label={label}
          required={required}
          error={error}
          title={title}
          description={description}
          icon={icon}
          accept={accept}
          value={value ?? null}
          onChange={onChange}
          className={className}
        />
      )}
    />
  );
};
