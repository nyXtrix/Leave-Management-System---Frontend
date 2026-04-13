import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-slate-100 text-slate-700',
        primary: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
        success: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
        warning: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
        danger: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
        ghost: 'bg-white/15 text-white ring-1 ring-white/25',
        outline: 'border border-slate-200 text-slate-600 bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  pulse?: boolean;
}

function Badge({ className, variant, pulse, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      )}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
