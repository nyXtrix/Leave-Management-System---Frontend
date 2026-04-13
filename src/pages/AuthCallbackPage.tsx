import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { authService } from "@/services/auth.service";
import Loader from "@/components/common/Loader";

export const AuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isLoading, refreshUser } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const hasExchanged = useRef(false);

  useEffect(() => {
    const performExchange = async () => {
      if (hasExchanged.current) return;
      hasExchanged.current = true;

      const code = searchParams.get("code");

      if (!code) {
        setError("Missing authorization code.");
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      try {
        await authService.exchangeCode(code);
        
        // Cleanup history before state change
        window.history.replaceState({}, '', '/');

        // Refresh user and wait for state update
        await refreshUser();
      } catch (err) {
        console.error('Handshake failure:', err);
        setError('Verification failed. Returning to login...');
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    performExchange();
  }, [searchParams, navigate, refreshUser]);

  // Handle navigation in a separate effect once user is loaded
  useEffect(() => {
    if (user && !isLoading) {
      navigate(`/${user.subdomain}/dashboard`, { replace: true });
    }
  }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 space-y-6">
      <div className="bg-white p-12 rounded-[2.5rem] shadow-premium flex flex-col items-center space-y-6">
        {error ? (
          <div className="text-primary-600 font-black uppercase tracking-widest text-sm animate-reveal">
            {error}
          </div>
        ) : (
          <>
            <Loader />
            <div className="flex flex-col items-center space-y-2">
              <p className="text-slate-900 font-black uppercase text-xs tracking-[0.2em] animate-pulse">
                Synchronizing Protocol
              </p>
              <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase">
                Establishing Secure Shared Session
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
