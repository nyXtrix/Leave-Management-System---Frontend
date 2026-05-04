import React, { useState, useEffect, useCallback } from "react";
import { Search, User, Check, ChevronDown, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import InputWithIcon from "@/components/common/inputs/InputWithIcon";
import { employeeService } from "@/services/employee.service";
import type { EmployeeSearchResult } from "@/types/employee.types";
import { useDebounce } from "@/hooks/useDebounce";
import IconButton from "@/components/ui/IconButton";

export interface UserSelectProps {
  value?: string;
  onChange?: (value: string, label: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const UserSelect = ({
  value,
  onChange,
  placeholder = "Type to search employee...",
  error,
  className,
  size = "md",
  disabled,
}: UserSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<EmployeeSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const fetchUsers = useCallback(async (query: string) => {
    const processedQuery = query.trim().toLowerCase();
    if (processedQuery.length < 3) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await employeeService.getAll({ search: processedQuery });
      setResults(response.data || []);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isTyping) {
      void fetchUsers(debouncedSearch);
    }
  }, [debouncedSearch, isTyping, fetchUsers]);

  const handleSelect = (user: EmployeeSearchResult) => {
    setSearch(user.label);
    setIsTyping(false);
    setOpen(false);
    onChange?.(user.value, user.label);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearch("");
    setResults([]);
    setIsTyping(false);
    setOpen(false);
    onChange?.("", "");
  };

  return (
    <Popover
      open={open}
      onOpenChange={(val) => {
        if (disabled) return;
        setOpen(val);
        if (!val) setIsTyping(false);
      }}
    >
      <PopoverTrigger asChild>
        <div className={cn("relative group/user-select", className)}>
          <InputWithIcon
            icon={User}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            className={cn(
              "bg-white border-slate-200 focus:border-primary-400 rounded-xl transition-all pr-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-50",
            )}
            value={search}
            onChange={(e) => {
              const val = e.target.value;
              setSearch(val);
              setIsTyping(true);
              if (!open) setOpen(true);
              if (!val) {
                onChange?.("", "");
              }
            }}
            onFocus={() => {
              if (search.length >= 3) setOpen(true);
            }}
            rightSection={
              <div className="flex items-center gap-1 mr-2">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 text-primary-500 animate-spin" />
                ) : value ? (
                  <IconButton
                    type="button"
                    variant="ghost"
                    size="xs"
                    icon={X}
                    onClick={handleClear}
                    disabled={disabled}
                    className="h-7 w-7 p-0 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                  />
                ) : (
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-slate-400 transition-transform duration-300",
                      open && "rotate-180",
                    )}
                  />
                )}
              </div>
            }
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-[calc(var(--radix-popover-trigger-width))] p-1.5 rounded-2xl shadow-premium border-slate-200 animate-reveal overflow-hidden"
        align="start"
        sideOffset={8}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="max-h-[280px] overflow-y-auto no-scrollbar">
          {results.length === 0 && !isLoading ? (
            <div className="py-8 text-center text-slate-500 px-4">
              <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-3">
                <Search className="h-6 w-6 text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-600">
                {search.length < 3
                  ? "Start typing to search..."
                  : "No matching employees found"}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {search.length < 3
                  ? "Please enter at least 3 characters"
                  : "Try a different search term"}
              </p>
            </div>
          ) : (
            results.map((user) => (
              <button
                key={user.value}
                type="button"
                onClick={() => handleSelect(user)}
                className={cn(
                  "group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all",
                  "hover:bg-primary-50 focus:bg-primary-50 outline-none",
                  value === user.value ? "bg-primary-50/80" : "bg-transparent",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                      value === user.value
                        ? "bg-primary-100 text-primary-600"
                        : "bg-slate-100 text-slate-500 group-hover:bg-primary-100 group-hover:text-primary-600",
                    )}
                  >
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "text-sm font-bold",
                        value === user.value
                          ? "text-primary-700"
                          : "text-slate-700",
                      )}
                    >
                      {user.label}
                    </span>
                    {user.role && (
                      <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                        {user.role}
                      </span>
                    )}
                  </div>
                </div>
                {value === user.value && (
                  <div className="h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserSelect;
