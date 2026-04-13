import { useTheme } from "next-themes"
import { Toaster as Sonner, toast as sonnerToast } from "sonner"
import { CircleCheckBig, CircleAlert, CircleX } from "lucide-react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          toast:
            "group toast font-sans !rounded-xl !shadow-lg group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border",
          description: "group-[.toast]:opacity-80",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:!bg-emerald-600 group-[.toaster]:!text-white group-[.toaster]:!border-emerald-700",
          error: "group-[.toaster]:!bg-red-600 group-[.toaster]:!text-white group-[.toaster]:!border-red-700",
          warning: "group-[.toaster]:!bg-amber-500 group-[.toaster]:!text-white group-[.toaster]:!border-amber-600",
          info: "group-[.toaster]:!bg-blue-600 group-[.toaster]:!text-white group-[.toaster]:!border-blue-700",
        },
      }}
      icons={{
        success: <CircleCheckBig className="size-5 text-white" />,
        warning: <CircleAlert className="size-5 text-white" />,
        error: <CircleX className="size-5 text-white" />,
      }}
      {...props}
    />
  )
}

export interface ToastProps {
  message: string;
  description?: string;
  type: "success" | "warning" | "error" | "info" | "default";
}

const Toast = ({ message, description, type }: ToastProps) => {
  if (type === "default") {
    sonnerToast(message, { description });
    return;
  }
  sonnerToast[type](message, { description });
};

export { Toaster, Toast }
