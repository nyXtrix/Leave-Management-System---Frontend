import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowRight } from "lucide-react";
import { Button, cn } from "@/components/ui/Button";
import MultiStepFlow from "@/components/common/multistep-flow/MultiStepFlow";
import { Form, FormInput, FormPasswordInput } from "@/components/common/forms";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid work email"),
});

const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type EmailFormData = z.infer<typeof emailSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

interface LoginFormProps {
  step: number;
  email: string;
  tenantInfo: { id: string; name: string } | null;
  onEmailSubmit: (data: EmailFormData) => Promise<void>;
  onPasswordSubmit: (data: PasswordFormData) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  className?: string;
}

const EmailStep = ({ 
  onSubmit, 
  defaultEmail, 
  isLoading 
}: { 
  onSubmit: (data: EmailFormData) => Promise<void>, 
  defaultEmail: string,
  isLoading: boolean
}) => {
  const methods = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: defaultEmail },
  });

  const { formState: { isSubmitting } } = methods;

  return (
    <Form
      schema={emailSchema}
      methods={methods}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <div className="space-y-6">
        <FormInput
          name="email"
          label="Email"
          placeholder="name@company.com"
          icon={Mail}
          required
          size="md"
        />

        <Button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="w-full group"
        >
          Continue
          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Form>
  );
};

const PasswordStep = ({
  onSubmit,
  email,
  tenantInfo,
  isLoading
}: {
  onSubmit: (data: PasswordFormData) => Promise<void>,
  email: string,
  tenantInfo: { name: string } | null,
  isLoading: boolean
}) => {
  const methods = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const { formState: { isSubmitting } } = methods;

  return (
    <Form
      schema={passwordSchema}
      methods={methods}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-2">
          <div className="h-10 w-10 rounded-xl bg-primary-50 flex items-center justify-center">
            <Mail className="h-5 w-5 text-primary-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {tenantInfo?.name || "LMS Network"}
            </h3>
            <p className="text-xs text-slate-400 truncate">{email}</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute right-1 top-0 z-10">
            <button
              type="button"
              className="text-[0.625rem] font-black text-primary-500 hover:text-primary-600 uppercase tracking-widest"
            >
              Forgot?
            </button>
          </div>
          <FormPasswordInput
            name="password"
            label="Security Credentials"
            placeholder="••••••••••••"
            required
            size="md"
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading || isSubmitting}
          className="w-full group"
        >
          Authenticate
          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Form>
  );
};

const LoginForm = ({
  step,
  email,
  tenantInfo,
  onEmailSubmit,
  onPasswordSubmit,
  onBack,
  isLoading,
  className,
}: LoginFormProps) => {
  const steps = [
    {
      title: "Welcome Back",
      content: (
        <EmailStep 
          onSubmit={onEmailSubmit} 
          defaultEmail={email} 
          isLoading={isLoading} 
        />
      ),
    },
    {
      title: "Verify Identity",
      content: (
        <PasswordStep 
          onSubmit={onPasswordSubmit} 
          email={email} 
          tenantInfo={tenantInfo} 
          isLoading={isLoading} 
        />
      ),
    },
  ];

  return (
    <div className={cn("w-full", className)}>
      <MultiStepFlow currentStep={step} onBack={onBack} steps={steps} />
    </div>
  );
};

export default LoginForm;
