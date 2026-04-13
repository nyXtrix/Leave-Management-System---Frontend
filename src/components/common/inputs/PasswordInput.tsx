import React, { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Lock, Eye, EyeOff } from "lucide-react";
import InputWithIcon from "./InputWithIcon";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends Omit<React.ComponentProps<typeof InputWithIcon>, "icon" | "type" | "iconPosition" | "rightSection"> {
  icon?: LucideIcon;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ icon = Lock, className, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    return (
      <InputWithIcon
        ref={ref}
        type={isVisible ? "text" : "password"}
        icon={icon}
        className={cn(
          "[&::-ms-reveal]:hidden [&::-ms-clear]:hidden",
          className
        )}
        {...props}
        iconPosition="left"
        rightSection={
          <button
            type="button"
            onClick={toggleVisibility}
            tabIndex={-1}
            className="flex items-center justify-center text-slate-400 hover:text-primary-500 transition-colors focus:outline-none pointer-events-auto"
          >
            {isVisible ? (
              <EyeOff className="h-5 w-5 group-focus-within/input:text-primary-500" />
            ) : (
              <Eye className="h-5 w-5 group-focus-within/input:text-primary-500" />
            )}
          </button>
        }
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
