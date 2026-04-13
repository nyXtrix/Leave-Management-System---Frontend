import React from 'react';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const PageLayout = ({ title, children, className }: PageLayoutProps) => {
  return (
    <div className={cn("space-y-4 p-4 m-4 rounded-xl bg-white h-full min-h-[calc(100vh-100px)] overflow-y-auto", className)}>
      {title && (
          <h1 className="text-3xl font-semibold text-secondary-600 tracking-tight border-b pb-2 border-gray-300">
            {title}
          </h1>

      )}
      <div className="animate-reveal">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
