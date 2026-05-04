import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, type LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import IconButton from "./IconButton";

const modalVariants = cva(
  "relative z-[60] flex flex-col w-full bg-white shadow-lg border border-gray-100 transition-all duration-300 pointer-events-auto rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-xl",
        xl: "max-w-2xl",
        "2xl": "max-w-3xl",
        "3xl": "max-w-4xl",
        "4xl": "max-w-5xl",
        "5xl": "max-w-6xl",
        full: "max-w-[95vw] h-[95vh]",
      }
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
  headerClassName?: string;
  onConfirm?: () => void;
  primaryBtnText?: string;
  secondaryBtnText?: string;
  primaryBtnClassName?: string;
  secondaryBtnClassName?: string;
  primaryBtnIcon?: LucideIcon;
  primaryBtnType?: "button" | "submit" | "reset";
  primaryBtnForm?: string;
  primaryBtnDisabled?: boolean;
  primaryBtnLoading?: boolean;
  hideFooter?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  size,
  showCloseButton = true,
  className,
  overlayClassName,
  headerClassName,
  onConfirm,
  primaryBtnText,
  secondaryBtnText,
  primaryBtnIcon,
  primaryBtnClassName,
  secondaryBtnClassName,
  primaryBtnType = "button",
  primaryBtnForm,
  primaryBtnDisabled,
  primaryBtnLoading,
  hideFooter = false,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-gray-500/30 backdrop-blur-md transition-all duration-500 flex items-center justify-center p-4",
        overlayClassName
      )}
      onClick={handleBackdropClick}
    >
      <div className={cn(modalVariants({ size }), className)}>
        <div className={cn("flex items-start justify-between p-8 pb-4 border-b", headerClassName)}>
          <div className="flex flex-col">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              {title}
            </h2>
            {description && (
              <p className="text-sm font-bold text-slate-500 mt-1">
                {description}
              </p>
            )}
          </div>
          {showCloseButton && (
            <IconButton
              icon={X}
              onClick={onClose}
              iconClassName="h-5 w-5"
              variant="ghost"
              className="transition-all p-2 rounded-xl"
            />
          )}
        </div>

        <div className="p-8 pt-4 flex-1 overflow-y-auto max-h-[calc(90vh-120px)] scrollbar-hide">
          {children}
        </div>
        {!hideFooter && (
        <div className="flex justify-end p-4 border-t gap-4">
            <IconButton
              variant="outline"
              onClick={onClose}
              className={secondaryBtnClassName}
            >
              {secondaryBtnText || "Cancel"}
            </IconButton>
            <IconButton
              variant="default"
              onClick={onConfirm}
              type={primaryBtnType}
              form={primaryBtnForm}
              disabled={primaryBtnDisabled}
              isLoading={primaryBtnLoading}
              className={cn("px-10", primaryBtnClassName)}
              icon={primaryBtnIcon}
            >
              {primaryBtnText || "Save"}
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;

