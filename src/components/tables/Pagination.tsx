import React from 'react';
import { ChevronLeft, ChevronRight, ChevronFirst, ChevronLast } from 'lucide-react';
import { cn } from '@/lib/utils';
import IconButton from '@/components/ui/IconButton';
import { Input } from '@/components/common/inputs/Input';

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
  const [inputPage, setInputPage] = React.useState<string>(String(page));

  React.useEffect(() => {
    setInputPage(String(page));
  }, [page]);

  const clampPage = (value: number) => {
    return Math.min(Math.max(1, value), totalPages);
  };

  const handlePageSubmit = () => {
    if (inputPage.trim() === "") {
      setInputPage(String(page));
      return;
    }

    const parsed = Number(inputPage);

    if (!Number.isInteger(parsed)) {
      setInputPage(String(page));
      return;
    }

    const newPage = clampPage(parsed);

    if (newPage !== page) {
      onPageChange(newPage);
    } else {
      setInputPage(String(page)); 
    }
  };

  const inputDisable = totalPages > 1 ? false : true;

  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-3 border-t border-secondary-200 bg-secondary-200/30 select-none",
        className
      )}
    >
      <p className="text-xs font-semibold text-slate-400">
        Showing{" "}
        <span className="text-slate-700">{(page - 1) * pageSize + 1}</span>–
        <span className="text-slate-700">
          {Math.min(page * pageSize, totalResults)}
        </span>{" "}
        of <span className="text-slate-700">{totalResults}</span>
      </p>

      <div className="flex items-center gap-0">
        <IconButton
          icon={ChevronFirst}
          variant="ghost"
          disabled={page === 1}
          iconClassName='h-4 w-4 text-secondary-900'
          onClick={() => onPageChange(1)}
          className='disabled:cursor-not-allowed p-2'
        />

        <IconButton
          icon={ChevronLeft}
          variant="ghost"
          disabled={page === 1}
          iconClassName='h-4 w-4 text-secondary-900'
          onClick={() => onPageChange(clampPage(page - 1))}
          className='disabled:cursor-not-allowed p-2'
        />

        <div className="flex items-center gap-2 mx-2 text-xs font-semibold text-slate-600">
          <span>Page</span>

          <Input
            value={inputPage}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) {
                setInputPage(e.target.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handlePageSubmit();
                e.currentTarget.blur();
              }
            }}
            onBlur={handlePageSubmit}
            disabled={inputDisable}
            wrapperClassName="!w-12 !space-y-0"
            className="h-8 w-12 p-0 text-center text-md font-semibold border-slate-200 bg-white focus:border-primary-400 rounded-lg shadow-sm"
          />

          <span className="flex items-center gap-2 text-slate-400">
            of <span className="text-secondary-900 font-semibold">{totalPages}</span>
          </span>
        </div>

        <IconButton
          icon={ChevronRight}
          variant="ghost"
          disabled={page === totalPages}
          onClick={() => onPageChange(clampPage(page + 1))}
          iconClassName='h-4 w-4 text-secondary-900'
          className='disabled:cursor-not-allowed p-2'
        />

        <IconButton
          icon={ChevronLast}
          variant="ghost"
          disabled={page === totalPages}
          onClick={() => onPageChange(totalPages)}
          iconClassName='h-4 w-4 text-secondary-900'
          className='disabled:cursor-not-allowed p-2'
        />
      </div>
    </div>
  );
};

export default Pagination;