import React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps {
  className?: string;
  fullPage?: boolean;
}

const Loader = ({ className, fullPage = false }: LoaderProps) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-center",
        fullPage ? "fixed inset-0 z-100 bg-white/40 backdrop-blur-sm" : "w-full h-48 bg-white/40",
        className
      )}
    >
      <div className="app-loader"></div>
    </div>
  );
};

export default Loader;
