import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import UserSelect, { type UserSelectProps } from "@/components/common/inputs/UserSelect";

interface FormUserSelectProps extends UserSelectProps {
  name: string;
  defaultLabel?: string;
}

export const FormUserSelect = ({
  name,
  defaultLabel,
  ...props
}: FormUserSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <UserSelect
          {...props}
          value={field.value ?? ""}
          defaultLabel={defaultLabel}
          onChange={(val) => field.onChange(val)}
          error={error?.message}
        />
      )}
    />
  );
};
