import { useState, useCallback, type ReactNode } from "react";

export interface ConfirmationConfig {
  title: string;
  message: string | ReactNode;
  variant?: "danger" | "warning" | "success" | "default";
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
}

export const useConfirmation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ConfirmationConfig>({
    title: "",
    message: "",
    onConfirm: () => {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const confirm = useCallback((newConfig: ConfirmationConfig) => {
    setConfig(newConfig);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setIsLoading(false);
  }, []);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await config.onConfirm();
      close();
    } catch (error) {
      console.error("Confirmation error:", error);
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    config,
    isLoading,
    confirm,
    close,
    handleConfirm,
  };
};
