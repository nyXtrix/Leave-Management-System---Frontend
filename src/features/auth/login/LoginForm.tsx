import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Building, Building2 } from "lucide-react";
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
  onForgotPassword: () => void;
  isLoading: boolean;
  className?: string;
}

const EmailStep = ({
  onSubmit,
  defaultEmail,
  isLoading,
}: {
  onSubmit: (data: EmailFormData) => Promise<void>;
  defaultEmail: string;
  isLoading: boolean;
}) => {
  const methods = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: defaultEmail },
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <Form
      id="login-email-form"
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

        <div className="p-4 rounded-xl bg-primary-50/50 border border-primary-100/20">
          <div className="flex gap-3">
            <div className="h-5 w-5 rounded-md bg-white flex items-center justify-center shadow-sm border border-primary-100 flex-shrink-0">
              <Lock className="h-3 w-3 text-primary-500" />
            </div>
            <p className="text-xs text-primary-900/60 leading-relaxed">
              We use your email to identify your organization and provide a
              personalized login experience.
            </p>
          </div>
        </div>
      </div>
    </Form>
  );
};

const PasswordStep = ({
  onSubmit,
  email,
  companyName,
  isLoading,
  onForgotPassword,
  onBack,
}: {
  onSubmit: (data: PasswordFormData) => Promise<void>;
  email: string;
  companyName: string | null;
  isLoading: boolean;
  onForgotPassword: () => void;
  onBack: () => void;
}) => {
  const methods = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <Form
      id="login-password-form"
      schema={passwordSchema}
      methods={methods}
      onSubmit={onSubmit}
      className="space-y-6"
    >
      <div className="space-y-2">
        <div className="flex items-center gap-3 rounded-xl border border-secondary-200 bg-slate-50 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100">
            <Building2 className="h-4 w-4 text-primary-600" />
          </div>

          <div className="min-w-0">
            <p className="text-xs text-slate-500">Company</p>
            <h3 className="truncate text-sm font-semibold text-slate-900">
              {companyName || "Flow OFF"}
            </h3>
          </div>
        </div>
        <FormInput
          name="email"
          label="Email"
          defaultValue={email}
          required
          disabled
        />

        <FormPasswordInput
          name="password"
          label="Password"
          placeholder="••••••••••••"
          required
          size="md"
        />
        <Button
          type="button"
          variant="link"
          onClick={onForgotPassword}
          className="text-sm ml-2 p-0 h-max font-medium text-primary-500 hover:text-primary-600 cursor-pointer"
        >
          Forgot Password?
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
  onForgotPassword,
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
          email={email}
          companyName={tenantInfo?.name || null}
          onSubmit={onPasswordSubmit}
          isLoading={isLoading}
          onForgotPassword={onForgotPassword}
          onBack={onBack}
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
