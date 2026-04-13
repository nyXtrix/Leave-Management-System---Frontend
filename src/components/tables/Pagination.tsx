import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface PaginationProps {
  page: number;
  totalResults: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination = ({ 
  page, 
  totalResults, 
  pageSize, 
  onPageChange, 
  className 
}: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));
  
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, page - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  if (totalResults <= pageSize) return null;

  return (
    <div className={cn(
      "flex items-center justify-between px-6 py-3 border-t border-secondary-200 bg-secondary-200/30",
      className
    )}>
      <p className="text-xs font-semibold text-slate-400">
        Showing <span className="text-slate-700">{(page - 1) * pageSize + 1}</span>–
        <span className="text-slate-700">{Math.min(page * pageSize, totalResults)}</span> of {" "}
        <span className="text-slate-700">{totalResults}</span>
      </p>
      
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg border-slate-200"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {getPageNumbers().map((p) => (
          <Button
            key={p}
            variant={page === p ? "default" : "ghost"}
            size="icon"
            className={cn(
              "h-8 w-8 text-xs rounded-lg transition-all duration-300",
              page === p ? " text-white shadow-glow-primary" : "text-slate-500 hover:bg-slate-100"
            )}
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-lg border-slate-200"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
