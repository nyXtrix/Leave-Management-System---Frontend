import { useNavigate, useParams } from "react-router-dom";
import { Home, CircleOff } from "lucide-react";
import IconButton from "../ui/IconButton";

interface ErrorStateProps {
  code?: string;
  title?: string;
  message?: string;
}

const ErrorState = ({
  code = "403",
  title = "Access Denied",
  message = "You do not have permission to view this page.",
}: ErrorStateProps) => {
  const navigate = useNavigate();
  const { subdomain } = useParams();

  const handleGoHome = () => {
    navigate(subdomain ? `/${subdomain}/dashboard` : "/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
          <CircleOff className="h-7 w-7 text-primary-500" />
        </div>

        <p className="text-sm font-semibold tracking-wider text-red-500 mb-2">
          ERROR {code}
        </p>

        <h1 className="text-3xl font-bold text-secondary-900 mb-3">
          {title}
        </h1>

        <p className="text-sm leading-6 text-secondary-500 mb-8">
          {message}
        </p>

        <IconButton
          onClick={handleGoHome}
          variant="default"
          icon={Home}
          className="inline-flex justify-center"
        >
          Go to Home
        </IconButton>
      </div>
    </div>
  );
};

export default ErrorState;