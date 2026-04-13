import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import SelectInput from "@/components/common/inputs/SelectInput";

interface FormSelectProps extends React.ComponentProps<typeof SelectInput> {
  name: string;
}

export const FormSelect = ({ name, ...props }: FormSelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <SelectInput
          {...props}
          {...field}
          value={field.value ?? ""}
          error={error?.message}
          onChange={(val) => field.onChange(val)}
        />
      )}
    />
  );
};
