import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";
import LoginForm from "./LoginForm";
import { toast } from "sonner";
import { UserLoginStatus } from "@/types/auth.types";
import LoginImage from "@/assets/undraw/undraw_cabin_7fei.svg";
import AuthFormLayout from "../layout/AuthFormLayout";
import Modal from "@/components/ui/Modal";
import { KeyRound, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const LoginManagement = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [tenantInfo, setTenantInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const { login, isLoading } = useAuth();
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);

  const handleEmailSubmit = async (data: { email: string }) => {
    try {
      const response = await authService.identify({ email: data.email });

      if (!response.exists) {
        toast.error("We couldn't find an account associated with this email address.");
        return;
      }

      if (response.status === UserLoginStatus.SetPasswordRequired) {
        toast.error("Please set your password first by checking your invite email.");
        return;
      }

      if (response.status === UserLoginStatus.Inactive) {
        toast.error("Your account is inactive. Please contact your administrator.");
        return;
      }

      if (response.subdomain) {
        setTenantInfo({ id: response.subdomain, name: response.companyName || "Workspace" });
      }

      setEmail(data.email);
      setStep(1);
    } catch (error) {
      // toast.error("An error occurred while verifying the email.");
    }
  };

  const handlePasswordSubmit = async (data: { password: string }) => {
    try {
      await login(email, data.password, tenantInfo?.id);
    } catch (error) {
      toast.error("Incorrect password. Please try again.");
    }
  };

  const handleBack = () => {
    setStep(0);
  };

  const handleForgotPassword = () => {
    setIsForgotModalOpen(true);
  };

  const handleConfirmForgotPassword = () => {
    setIsForgotLoading(true);
    authService
      .forgotPassword({ email }, tenantInfo?.id)
      .then(() => {
        setIsForgotModalOpen(false);
      })
      .finally(() => {
        setIsForgotLoading(false);
      });
  };

  return (
    <AuthFormLayout 
      image={LoginImage}
      actions={
        <div className="w-full space-y-6">
          {step === 0 ? (
            <Button
              type="submit"
              form="login-email-form"
              disabled={isLoading}
              className="w-full group h-12 shadow-glow-primary gradient-primary"
            >
              Authenticate
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="w-1/2 h-12 border-slate-200 text-slate-500 font-bold hover:bg-slate-50 hover:text-slate-700"
              >
                Back
              </Button>
              <Button
                type="submit"
                form="login-password-form"
                disabled={isLoading}
                className="w-1/2 group h-12 shadow-glow-primary gradient-primary"
              >
                Login
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}
        </div>
      }
    >
      <LoginForm
        step={step}
        email={email}
        tenantInfo={tenantInfo}
        onEmailSubmit={handleEmailSubmit}
        onPasswordSubmit={handlePasswordSubmit}
        onBack={handleBack}
        onForgotPassword={handleForgotPassword}
        isLoading={isLoading}
      />

      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => !isForgotLoading && setIsForgotModalOpen(false)}
        title="Reset Password"
        description="A password reset link will be sent to your work email address."
        primaryBtnText="Send Reset Link"
        primaryBtnLoading={isForgotLoading}
        onConfirm={handleConfirmForgotPassword}
      >
        <div className="flex flex-col items-center justify-center py-4 space-y-4">
          <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-500">
            <KeyRound className="h-8 w-8" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-bold text-primary-500">{email}</p>
            <p className="text-xs font-bold text-slate-400">Organization: {tenantInfo?.name || "LMS Network"}</p>
          </div>
        </div>
      </Modal>
    </AuthFormLayout>
  );
};

export default LoginManagement;
