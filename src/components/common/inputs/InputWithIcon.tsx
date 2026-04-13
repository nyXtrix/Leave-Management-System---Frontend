import React from "react";
import type { LucideIcon } from "lucide-react";
import { Input, type InputProps } from "./Input";
import { cn } from "@/lib/utils";

interface InputWithIconProps extends InputProps {
  icon: LucideIcon;
  iconPosition?: "left" | "right";
  iconClassName?: string;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon: Icon, iconPosition = "left", iconClassName, ...props }, ref) => {
    const iconNode = (
      <Icon 
        className={cn(
          "h-5 w-5 text-slate-400 group-focus-within/input:text-primary-500 transition-colors", 
          iconClassName
        )} 
      />
    );

    return (
      <Input
        ref={ref}
        leftSection={iconPosition === "left" ? iconNode : undefined}
        rightSection={iconPosition === "right" ? iconNode : undefined}
        {...props}
      />
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export default InputWithIcon;