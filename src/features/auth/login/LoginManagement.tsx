import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";
import LoginForm from "./LoginForm";
import { toast } from "sonner";
import LoginImage from "@/assets/undraw/undraw_cabin_7fei.svg";
import AuthFormLayout from "../layout/AuthFormLayout";

const LoginManagement = () => {
  const [step, setStep] = useState(0); // 0: Email, 1: Password
  const [email, setEmail] = useState("");
  const [tenantInfo, setTenantInfo] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const { login, isLoading } = useAuth();

  const handleEmailSubmit = async (data: { email: string }) => {
    try {
      const response = await authService.identify({ email: data.email });
      
      if (!response.exists || response.status === 4) {
        toast.error("We couldn't find an account with that email.");
        return;
      }

      if (response.status === 3) {
        toast.error("Please set your password first by checking your invite email.");
        return;
      }

      if (response.status === 2) {
        toast.error("Your account is inactive. Please contact your administrator.");
        return;
      }

      if (response.subdomain) {
        setTenantInfo({ id: response.subdomain, name: "Workspace" });
      }

      setEmail(data.email);
      setStep(1);
    } catch (error) {
      toast.error("An error occurred while verifying the email.");
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

  return (
    <AuthFormLayout 
      image={LoginImage}
      actions={
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] text-center">
          LMS CLOUD OPERATING SYSTEM · v5.0.2
        </p>
      }
    >
      <LoginForm
        step={step}
        email={email}
        tenantInfo={tenantInfo}
        onEmailSubmit={handleEmailSubmit}
        onPasswordSubmit={handlePasswordSubmit}
        onBack={handleBack}
        isLoading={isLoading}
      />
    </AuthFormLayout>
  );
};

export default LoginManagement;
