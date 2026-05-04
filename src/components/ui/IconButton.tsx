import React from "react";
import { Button, type ButtonProps } from "./Button";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonProps {
  iconClassName?: string;
  icon?: LucideIcon;
  iconPosition?: "right" | "left";
  className?: string;
  iconStrokeWidth?: number;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon: Icon,
      iconClassName = "",
      iconPosition = "left",
      children,
      className,
      iconStrokeWidth,
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
          <Icon className={cn("h-5 w-5", iconClassName)} strokeWidth={iconStrokeWidth || 2} />
        )}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;