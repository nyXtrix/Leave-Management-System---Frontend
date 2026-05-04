import { AlertCircle, RefreshCw, LogOut } from "lucide-react";
import { authService } from "@/services/auth.service";
import { Button } from "../ui/Button";

interface InitializationErrorProps {
  title?: string;
  message?: string;
  retryAction: () => void;
}

const InitializationError: React.FC<InitializationErrorProps> = ({
  title = "System Initialization Failed",
  message = "We encountered a critical error while preparing your workspace. This might be due to a temporary network issue.",
  retryAction,
}) => {
  const handleRelogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await authService.logout();
    } finally {
      window.location.href = "/login";
    }
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
      <div className="bg-rose-50 p-4 rounded-full mb-6">
        <AlertCircle className="h-12 w-12 text-rose-500" />
      </div>
      <h1 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
        {title}
      </h1>
      <p className="text-slate-500 font-medium mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button
          type="button"
          onClick={handleRelogin}
          variant="outline"
        >
          <LogOut className="h-5 w-5" />
          Sign Out & Re-login
        </Button>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            retryAction();
          }}
        >
          <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
          Retry Initialization
        </Button>
        
      </div>
    </div>
  );
};

export default InitializationError;
