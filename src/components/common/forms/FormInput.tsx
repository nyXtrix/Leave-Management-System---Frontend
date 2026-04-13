import React from "react";
import { useFormContext } from "react-hook-form";
import InputWithIcon from "@/components/common/inputs/InputWithIcon";

interface FormInputProps extends React.ComponentProps<typeof InputWithIcon> {
  name: string;
}

export const FormInput = ({ name, ...props }: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return <InputWithIcon {...register(name)} {...props} error={error} />;
};
