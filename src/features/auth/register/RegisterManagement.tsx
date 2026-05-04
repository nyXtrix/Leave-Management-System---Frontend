import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.service";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/contexts/AuthContext";
import BaseRequestProvider from "@/lib/api/BaseRequestProvider";
import RegisterForm from "./RegisterForm";
import type { RegisterValidationData as RegisterFormData } from "@/validations/auth/RegisterValidation";
import InvalidToken from "./InvalidToken";

const RegisterManagement = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, register, setupUser, isLoading: isAuthLoading } = useAuth();
  const token = searchParams.get("token");

  const [isVerifying, setIsVerifying] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [inviteMeta, setInviteMeta] = useState<{
    companyName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  }>({});

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setIsVerifying(false);
        setIsTokenValid(false);
        return;
      }
      try {
        const details = await authService.verifyRegistrationToken(token);
        if (details) {
          setIsTokenValid(true);
          setInviteMeta(details);
        } else {
          setIsTokenValid(false);
        }
      } catch {
        setIsTokenValid(false);
      } finally {
        setIsVerifying(false);
      }
    };
    void verify();
  }, [token]);

  const handleSubmit = async (data: RegisterFormData) => {
    if (!token) return;
    try {
      if (!inviteMeta.companyName) {
        await register({
          registrationToken: token,
          companyName: data.CompanyName || "",
          subdomain: data.Subdomain || "",
          firstName: data.FirstName,
          lastName: data.LastName,
          adminEmail: data.email || inviteMeta.email || "",
          adminPassword: data.AdminPassword,
        });
      } else {
        await setupUser({
          token,
          password: data.AdminPassword,
        });
      }
    } catch {
    }
  };

  useEffect(() => {
    if (user && !isAuthLoading) {
      navigate(`/${user.subdomain}/dashboard`, { replace: true });
    }
  }, [user, isAuthLoading, navigate]);

  if (isVerifying) {
    return <Loader fullPage />;
  }

  if (!isTokenValid) {
    return <InvalidToken />;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white flex flex-col font-sans overflow-hidden">
      <main className="flex-1 flex items-center justify-center p-6 relative">
        <RegisterForm inviteMeta={inviteMeta} onSubmit={handleSubmit} />
      </main>
    </div>
  );
};

export default RegisterManagement;
