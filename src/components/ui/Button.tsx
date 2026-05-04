import * as React from 'react';
import * as RadixSlot from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-primary-500 text-white hover:bg-primary-600 shadow-premium hover:shadow-glow-primary border border-primary-500/20',
        secondary:
          'bg-secondary-500 text-white hover:bg-secondary-600 shadow-premium hover:shadow-glow-secondary border border-secondary-400/20',
        destructive:
          'bg-red-50 text-red-500 hover:bg-red-100 shadow-premium hover:shadow-red-100 border border-red-400/20',
        outline:
          'border border-slate-200 bg-white text-primary-500 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm',
        ghost:
          'text-slate-600 hover:bg-primary-50 hover:text-primary-500 font-medium',
        link:
          'text-primary-500 underline-offset-4 hover:underline font-medium',
        success:
          'bg-emerald-600 text-white hover:bg-emerald-700 shadow-premium hover:shadow-glow-success border border-emerald-500/20',
        glass:
          'glass border-white/20 text-slate-700 hover:bg-white/80 hover:shadow-premium',
      },
      size: {
        default: 'h-11 px-6 py-2.5',
        sm: 'h-9 rounded-lg px-4 text-xs',
        xs: 'h-7 rounded-md px-3 text-xs',
        lg: 'h-13 rounded-2xl px-10 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  noScale?: boolean;
  tooltip?: React.ReactNode;
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, children, disabled, noScale, tooltip, tooltipSide = 'top', ...props }, ref) => {
    const Comp = asChild ? RadixSlot.Slot : 'button';
    
    const buttonElement = (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          !noScale && "active:scale-95"
        )}
        ref={ref}
        disabled={disabled ?? isLoading}
        {...props}
      >
        {isLoading ? (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : null}
        {children}
      </Comp>
    );

    if (tooltip) {
      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
            <TooltipContent side={tooltipSide}>{tooltip}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return buttonElement;
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
export { cn };
