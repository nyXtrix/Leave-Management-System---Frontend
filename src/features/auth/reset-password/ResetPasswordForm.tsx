import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, ArrowRight, Mail, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Form, FormPasswordInput } from "@/components/common/forms";
import { 
  SetPasswordValidation, 
  type SetPasswordValidationType 
} from "@/validations/auth/SetPasswordValidation";

interface ResetPasswordFormProps {
  onSubmit: (data: SetPasswordValidationType) => Promise<void>;
  isLoading: boolean;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
  } | null;
}

const ResetPasswordForm = ({ 
  onSubmit, 
  isLoading,
  user
}: ResetPasswordFormProps) => {
  const methods = useForm<SetPasswordValidationType>({
    resolver: zodResolver(SetPasswordValidation),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { formState: { isSubmitting } } = methods;

  return (
    <div className="w-full space-y-8 animate-reveal">
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Create a new password
        </h2>
      </div>

      {user && (
        <div className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-100 shrink-0">
              <Building2 className="h-4 w-4 text-primary-500" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-semibold text-secondary-400 leading-none mb-1">Organization</span>
              <span className="text-xs font-bold text-secondary-900 truncate">{user.companyName}</span>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200" />

          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center shadow-sm border border-slate-100 shrink-0">
              <Mail className="h-4 w-4 text-primary-500" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-semibold text-secondary-400 leading-none mb-1">Account</span>
              <span className="text-xs font-bold text-secondary-900 truncate">{user.firstName} {user.lastName}</span>
            </div>
          </div>
        </div>
      )}

      <Form
        schema={SetPasswordValidation}
        methods={methods}
        onSubmit={onSubmit}
        className="space-y-6"
      >
        <div className="space-y-5">
          <FormPasswordInput
            name="password"
            label="New Password"
            placeholder="••••••••••••"
            required
            size="md"
          />

          <FormPasswordInput
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="••••••••••••"
            required
            size="md"
          />

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full group h-12 shadow-glow-primary gradient-primary"
            >
              {isLoading ? "Updating..." : "Reset Password"}
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
            <KeyRound className="h-3 w-3" />
            Security Requirements
          </h4>
          <ul className="space-y-1.5">
            {[
              "Minimum 8 characters long",
              "Uppercase & Lowercase letters",
              "At least one number (0-9)",
              "Special character (!@#$%^&*)"
            ].map((req, i) => (
              <li key={i} className="text-[11px] font-medium text-slate-500 flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-slate-300" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
