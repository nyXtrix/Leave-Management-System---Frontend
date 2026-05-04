import React from "react";
import {
  useForm,
  FormProvider,
  type UseFormReturn,
  type FieldValues,
  type UseFormProps,
  type SubmitHandler,
  type Resolver,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodSchema } from "zod";

interface FormProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  onSubmit: (data: T, methods: UseFormReturn<T>) => void | Promise<void>;
  children: React.ReactNode;
  defaultValues?: UseFormProps<T>["defaultValues"];
  className?: string;
  methods?: UseFormReturn<T>;
  id?: string;
}

export const Form = <T extends FieldValues>({
  schema,
  onSubmit,
  children,
  defaultValues,
  className,
  methods: externalMethods,
  id,
}: FormProps<T>) => {
  const internalMethods = useForm<T>({
    resolver: zodResolver(schema as Parameters<typeof zodResolver>[0]) as Resolver<T>,
    defaultValues,
  });

  const methods = (externalMethods || internalMethods) as UseFormReturn<T, object, T>;

  const handleSubmit: SubmitHandler<T> = (data) => onSubmit(data, methods as UseFormReturn<T>);

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        onSubmit={methods.handleSubmit(handleSubmit as Parameters<typeof methods.handleSubmit>[0])}
        className={className}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
};
