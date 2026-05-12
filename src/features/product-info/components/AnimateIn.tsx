import React from "react";
import { useInView } from "../hooks/useInView";
import { cn } from "@/lib/utils";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "zoom-in"
  | "zoom-out";

interface AnimateInProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number; 
  duration?: number; 
  className?: string;
  threshold?: number;
  rootMargin?: string;
  as?: React.ElementType;
}

const animationStyles: Record<AnimationType, { from: string; to: string }> = {
  "fade-up": {
    from: "opacity-0 translate-y-8",
    to: "opacity-100 translate-y-0",
  },
  "fade-down": {
    from: "opacity-0 -translate-y-8",
    to: "opacity-100 translate-y-0",
  },
  "fade-left": {
    from: "opacity-0 translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  "fade-right": {
    from: "opacity-0 -translate-x-8",
    to: "opacity-100 translate-x-0",
  },
  fade: {
    from: "opacity-0",
    to: "opacity-100",
  },
  "zoom-in": {
    from: "opacity-0 scale-95",
    to: "opacity-100 scale-100",
  },
  "zoom-out": {
    from: "opacity-0 scale-105",
    to: "opacity-100 scale-100",
  },
};

export const AnimateIn = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className,
  threshold,
  rootMargin,
  as: Tag = "div",
}: AnimateInProps) => {
  const { ref, inView } = useInView({ threshold, rootMargin });
  const styles = animationStyles[animation];

  return (
    <Tag
 L
    >
      {children}
    </Tag>
  );
};

interface StaggerProps {
  children: React.ReactNode[];
  animation?: AnimationType;
  baseDelay?: number;
  stagger?: number; 
  duration?: number;
  className?: string;
  childClassName?: string;
  threshold?: number;
}

export const Stagger = ({
  children,
  animation = "fade-up",
  baseDelay = 0,
  stagger = 80,
  duration = 500,
  className,
  childClassName,
  threshold,
}: StaggerProps) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, i) => (
        <AnimateIn
          key={i}
          animation={animation}
          delay={baseDelay + i * stagger}
          duration={duration}
          className={childClassName}
          threshold={threshold}
        >
          {child}
        </AnimateIn>
      ))}
    </div>
  );
};
