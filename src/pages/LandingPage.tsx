import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

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
       <div className="flex items-center justify-center min-h-[60vh] text-slate-400 font-bold uppercase tracking-widest">
          Landing Page
       </div>
    </div>
  );
}
