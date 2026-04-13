import React from "react";
import {
  useForm,
  FormProvider,
  type UseFormReturn,
  type FieldValues,
  type UseFormProps,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";

interface FormProps<T extends FieldValues> {
  schema: ZodType<T>;
  onSubmit: (data: T, methods: UseFormReturn<T>) => void | Promise<void>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
  defaultValues?: UseFormProps<T>["defaultValues"];
  className?: string;
}

export const Form = <T extends FieldValues>({
  schema,
  onSubmit,
  children,
  defaultValues,
  className,
}: FormProps<T>) => {
  // @ts-expect-error - React hook form covariance narrowing
  const methods: UseFormReturn<T> = useForm<T>({
    // @ts-expect-error - Zod generic input inference conflicts with tight form constraints
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = (data: T) => onSubmit(data, methods);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit as SubmitHandler<T>)}
        className={className}
        noValidate
      >
        {children(methods)}
      </form>
    </FormProvider>
  );
};

