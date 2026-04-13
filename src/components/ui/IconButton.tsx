import React from "react";
import { Button, type ButtonProps } from "./Button";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonProps {
  iconClassName?: string;
  icon?: LucideIcon;
  iconPosition?: "right" | "left";
  className?: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      iconClassName = "",
      iconPosition = "left",
      children,
      className,
      ...buttonProps
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        {...buttonProps}
        className={cn("flex gap-2", className)}
      >
        {iconPosition === "left" && Icon && (
          <Icon className={cn("h-5 w-5", iconClassName)} />
        )}

        {children}

        {iconPosition === "right" && Icon && (
          <Icon className={cn("h-5 w-5", iconClassName)} />
        )}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;