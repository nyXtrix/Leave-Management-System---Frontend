import React from "react";
import { useFormContext } from "react-hook-form";
import TextareaInput from "@/components/common/inputs/TextareaInput";

interface FormTextareaProps extends React.ComponentProps<typeof TextareaInput> {
  name: string;
}

export const FormTextarea = ({ name, ...props }: FormTextareaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name]?.message as string | undefined;

  return <TextareaInput {...register(name)} {...props} error={error} />;
};
