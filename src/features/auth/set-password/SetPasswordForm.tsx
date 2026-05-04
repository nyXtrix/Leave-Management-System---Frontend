import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, ArrowRight, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Form, FormPasswordInput } from "@/components/common/forms";
import { 
  SetPasswordValidation, 
  type SetPasswordValidationType 
} from "@/validations/auth/SetPasswordValidation";

interface SetPasswordFormProps {
  onSubmit: (data: SetPasswordValidationType) => Promise<void>;
  isLoading: boolean;
  userEmail?: string;
  userName?: string;
}

const SetPasswordForm = ({ 
  onSubmit, 
  isLoading, 
  userEmail, 
  userName 
}: SetPasswordFormProps) => {
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
        <h2 className="text-xl font-black text-slate-900 tracking-tight">
          Secure Your Account
        </h2>
        <p className="text-sm font-medium text-slate-500 leading-relaxed">
          Welcome to the platform<span className="text-primary-500 font-bold">{` ${userName} `}</span>. Please set a strong password to complete your registration.
        </p>
      </div>

      {(userEmail || userName) && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center">
            <UserRound className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {userName || "New Employee"}
            </h3>
            <p className="text-xs text-slate-400 truncate">{userEmail}</p>
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
            label="Confirm Password"
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
              Finish Setup
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

export default SetPasswordForm;
