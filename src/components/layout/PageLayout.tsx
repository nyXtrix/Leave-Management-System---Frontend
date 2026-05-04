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
        "relative space-y-4 p-4 m-4 rounded-xl bg-white h-full min-h-[calc(100vh-100px)] overflow-y-auto",
        className,
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-xl animate-in fade-in duration-300">
          <Loader />
        </div>
      )}
      {title && (
        <h1 className="text-3xl font-semibold text-secondary-600 tracking-tight border-b pb-2 border-gray-300">
          {title}
        </h1>
      )}
      <div className="animate-reveal max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-hide">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
