import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import Loader from "@/components/common/Loader";
import AuthFormLayout from "../layout/AuthFormLayout";
import ResetPasswordImage from "@/assets/undraw/setPassword.svg";
import type { SetPasswordValidationType } from "@/validations/auth/SetPasswordValidation";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordManagement = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = () => {
      if (!token) {
        toast.error("Invalid or missing reset token.");
        navigate("/login");
        return;
      }

      authService
        .verifyResetToken(token)
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          toast.error(error.message || "Invalid or expired reset token.");
          navigate("/login");
        })
        .finally(() => {
          setIsValidating(false);
        });
    };

    verifyToken();
  }, [token, navigate]);

  const handleResetPassword = (data: SetPasswordValidationType) => {
    if (!token) return Promise.resolve();

    setIsSubmitting(true);
    return authService
      .resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })
      .then(() => {
        navigate("/login", { replace: true });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isValidating) {
    return <Loader fullPage />;
  }

  return (
    <AuthFormLayout image={ResetPasswordImage}>
      <ResetPasswordForm
        onSubmit={handleResetPassword} 
        isLoading={isSubmitting} 
        user={user}
      />
    </AuthFormLayout>
  );
};

export default ResetPasswordManagement;
