import React from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { AlertTriangle, CheckCircle, HelpCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "success" | "default";
  isLoading?: boolean;
  showCancelButton?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  isLoading = false,
  showCancelButton = true,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: AlertCircle,
          iconBg: "bg-red-50",
          iconColor: "text-red-500",
          confirmVariant: "destructive" as const,
        };
      case "warning":
        return {
          icon: AlertTriangle,
          iconBg: "bg-amber-50",
          iconColor: "text-amber-500",
          confirmVariant: "default" as const,
        };
      case "success":
        return {
          icon: CheckCircle,
          iconBg: "bg-emerald-50",
          iconColor: "text-emerald-500",
          confirmVariant: "success" as const,
        };
      default:
        return {
          icon: HelpCircle,
          iconBg: "bg-primary-50",
          iconColor: "text-primary-500",
          confirmVariant: "default" as const,
        };
    }
  };

  const config = getVariantStyles();
  const Icon = config.icon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="" 
      size="sm"
      showCloseButton={false}
      hideFooter
    >
      <div className="flex flex-col items-center text-center p-2">
        <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center mb-6", config.iconBg)}>
          <Icon className={cn("h-8 w-8", config.iconColor)} />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-8 px-4">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {showCancelButton && (
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 order-2 sm:order-1 w-1/2"
              disabled={isLoading}
            >
              {cancelText}
            </Button>
          )}
          <Button
            variant={config.confirmVariant}
            onClick={onConfirm}
            className={cn(
              "flex-1 order-1 sm:order-2 shadow-premium",
              showCancelButton ? "w-1/2" : "w-full"
            )}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
