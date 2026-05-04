import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import SetPasswordForm from "./SetPasswordForm";
import AuthFormLayout from "../layout/AuthFormLayout";
import SetPasswordImage from "@/assets/undraw/setPassword.svg";
import Loader from "@/components/common/Loader";
import type { SetPasswordValidationType } from "@/validations/auth/SetPasswordValidation";
import type { UserProfile } from "@/types/auth.types";

const SetPasswordManagement = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { setupUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userDetails, setUserDetails] = useState<UserProfile | null>(null);
  
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        toast.error("Invalid or missing invitation token.");
        navigate("/login");
        return;
      }

      try {
        const details = await authService.verifyOnboardingToken(token);
        setUserDetails(details);
      } catch (error: any) {
        toast.error(error.message || "Invitation link has expired or is invalid.");
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [token, navigate]);

  const handleSetPassword = async (data: SetPasswordValidationType) => {
    if (!token || !userDetails) return;

    setIsSubmitting(true);
    try {
      await setupUser({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      
      toast.success("Welcome aboard! Your account is now ready.");
      
      navigate(`/${userDetails.subdomain}/dashboard`, { replace: true });
    } catch (error: any) {
      toast.error(error.message || "Failed to set password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loader fullPage />;
  }

  return (
    <AuthFormLayout 
      image={SetPasswordImage}
    >
      <SetPasswordForm 
        onSubmit={handleSetPassword} 
        isLoading={isSubmitting}
        userEmail={userDetails?.email}
        userName={userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : undefined}
      />
    </AuthFormLayout>
  );
};

export default SetPasswordManagement;
