import React from "react";
import { useFormContext } from "react-hook-form";
import PasswordInput from "@/components/common/inputs/PasswordInput";

interface FormPasswordInputProps extends React.ComponentProps<typeof PasswordInput> {
  name: string;
}

export const FormPasswordInput = ({ name, ...props }: FormPasswordInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return <PasswordInput {...register(name)} {...props} error={error} />;
};
