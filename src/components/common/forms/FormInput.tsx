import React from "react";
import { useFormContext, type RegisterOptions } from "react-hook-form";
import InputWithIcon from "@/components/common/inputs/InputWithIcon";

interface FormInputProps extends React.ComponentProps<typeof InputWithIcon> {
  name: string;
  rules?: RegisterOptions;
}

export const FormInput = ({ name, rules, ...props }: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return <InputWithIcon {...register(name, rules)} {...props} error={error} />;
};
