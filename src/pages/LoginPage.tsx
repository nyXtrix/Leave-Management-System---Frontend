import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginManagement from "@/features/auth/login/LoginManagement";

export function LoginPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isAuthLoading) {
      navigate(`/${user.subdomain}/dashboard`, { replace: true });
    }
  }, [user, isAuthLoading, navigate]);

  return (
    <LoginManagement/>
  );
}
