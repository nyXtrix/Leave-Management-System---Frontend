import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ProductInfoManagement from "@/features/product-info/ProductInfoManagement";

export function LandingPage() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate(`/${user.subdomain}/dashboard`, { replace: true });
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="animate-reveal">
      <ProductInfoManagement />
    </div>
  );
}
