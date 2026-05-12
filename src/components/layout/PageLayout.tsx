import React from "react";
import { cn } from "@/lib/utils";
import { useLoader } from "@/contexts/LoaderContext";
import Loader from "@/components/common/Loader";

interface PageLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

const PageLayout = ({ title, children, className }: PageLayoutProps) => {
  const { isLoading } = useLoader();

  return (
    <div
      className={cn(
        "relative flex flex-col m-4 p-4 rounded-xl bg-white h-[calc(100vh-100px)] border overflow-y-scroll",
        className,
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-xl animate-in fade-in duration-300">
          <Loader />
        </div>
      )}
      
      {title && (
        <div className="shrink-0 px-6 py-2 mb-4 border-b border-gray-100">
          <h1 className="text-3xl font-semibold text-secondary-600 tracking-tight">
            {title}
          </h1>
        </div>
      )}

      <div className="flex-1 min-h-0 relative flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
