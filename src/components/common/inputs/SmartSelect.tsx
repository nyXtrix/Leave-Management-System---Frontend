import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import { 
  ChevronDown, 
  Check, 
  Search, 
  X, 
  Loader2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/Popover";
import { useDebounce } from "@/hooks/useDebounce";
import InputWithIcon from "@/components/common/inputs/InputWithIcon";

export interface SelectOption<V = string | number, M = Record<string, string | number | boolean | null>> {
  label: string;
  value: V;
  meta?: M;
}

export type SmartSelectProviderType = "static" | "async" | "hybrid";

export interface SmartSelectProvider<V = string | number, M = Record<string, string | number | boolean | null>> {
  type: SmartSelectProviderType;
  getAll?: () => Promise<SelectOption<V, M>[]>;
  fetch?: (query?: string, signal?: AbortSignal) => Promise<SelectOption<V, M>[]>;
  cacheKey?: string;
}

export interface SmartSelectProps<V = string | number, M = Record<string, string | number | boolean | null>> {
  value?: V | V[];
  onChange?: (value: V | V[]) => void;
  provider?: SmartSelectProvider<V, M>;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  required?: boolean;
  icon?: LucideIcon;
  error?: string;
  className?: string;
  renderOption?: (option: SelectOption<V, M>) => React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export const SmartSelect = React.forwardRef(
  <V extends string | number = string | number, M = Record<string, string | number | boolean | null>>(
    {
      value,
      onChange,
      provider,
      placeholder = "Select option...",
      disabled = false,
      multiple = false,
      required = false,
      icon: Icon,
      error,
      className,
      renderOption,
      size = "md",
    }: SmartSelectProps<V, M>,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [staticData, setStaticData] = useState<SelectOption<V, M>[]>([]);
    const [asyncData, setAsyncData] = useState<SelectOption<V, M>[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    
    const debouncedQuery = useDebounce(searchQuery, 350);
    const listRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const chipsRef = useRef<HTMLDivElement>(null);
    const [leftOffset, setLeftOffset] = useState(0);
    const staticCache = useRef<Record<string, SelectOption<V, M>[]>>({});
    const labelCache = useRef<Record<string | number, string>>({});

    // Measure chips to set dynamic padding
    useEffect(() => {
      if (!chipsRef.current) {
        setLeftOffset(0);
        return;
      }
      const obs = new ResizeObserver((entries) => {
        for (const entry of entries) {
           // Base padding depends on size and if there's an icon
           const iconPadding = Icon ? (size === "sm" ? 34 : 42) : (size === "sm" ? 12 : 16);
           setLeftOffset(entry.contentRect.width + iconPadding);
        }
      });
      obs.observe(chipsRef.current);
      return () => obs.disconnect();
    }, [value, size, Icon]);

    // Data Orchestration
    useEffect(() => {
      if (!provider || provider.type === "async") return;
      const load = async () => {
        const cacheKey = provider.cacheKey || "default";
        if (staticCache.current[cacheKey]) {
          setStaticData(staticCache.current[cacheKey]);
          return;
        }
        setIsLoading(true);
        try {
          const res = await provider.getAll?.() || [];
          staticCache.current[cacheKey] = res;
          setStaticData(res);
        } catch (err) {
          console.error("SmartSelect: Static load failed", err);
        } finally {
          setIsLoading(false);
        }
      };
      load();
    }, [provider?.type, provider?.cacheKey]);

    useEffect(() => {
      if (!provider || provider.type === "static") {
        setAsyncData([]);
        return;
      }
      if (!debouncedQuery && provider.type === "async") {
        setAsyncData([]);
        return;
      }
      const controller = new AbortController();
      const fetch = async () => {
        setIsLoading(true);
        try {
          const res = await provider.fetch?.(debouncedQuery, controller.signal) || [];
          setAsyncData(res);
        } catch (err: any) {
          if (err.name !== "AbortError") console.error("SmartSelect: Fetch failed", err);
        } finally {
          if (!controller.signal.aborted) setIsLoading(false);
        }
      };
      fetch();
      return () => controller.abort();
    }, [debouncedQuery, provider?.type, provider?.fetch]);

    const mergedOptions = useMemo(() => {
      const q = searchQuery.toLowerCase();
      const filteredStatic = staticData.filter(o => o.label.toLowerCase().includes(q));
      if (provider?.type === "static") return filteredStatic;
      if (provider?.type === "async") return asyncData;
      const seen = new Set(filteredStatic.map(o => o.value));
      return [...filteredStatic, ...asyncData.filter(o => !seen.has(o.value))];
    }, [staticData, asyncData, searchQuery, provider?.type]);

    const selectedOptions = useMemo(() => {
      const vals = Array.isArray(value) ? value : ([value].filter(v => v !== undefined && v !== null) as V[]);
      return vals.map(v => {
        const found = [...staticData, ...asyncData].find(o => o.value === v);
        if (found) {
          labelCache.current[String(v)] = found.label;
          return found;
        }
        return { label: labelCache.current[String(v)] || String(v), value: v };
      });
    }, [value, staticData, asyncData]);

    const isOptionSelected = useCallback((optValue: V) => {
      if (Array.isArray(value)) return value.includes(optValue);
      return value === optValue;
    }, [value]);

    const handleSelect = useCallback((option: SelectOption<V, M>) => {
      labelCache.current[String(option.value)] = option.label;
      if (multiple) {
        const current = Array.isArray(value) ? value : [];
        const next = current.includes(option.value) 
          ? current.filter(v => v !== option.value) 
          : [...current, option.value];
        onChange?.(next as V | V[]);
        setSearchQuery("");
      } else {
        onChange?.(option.value);
        setIsOpen(false);
        setSearchQuery("");
      }
    }, [multiple, value, onChange]);

    const handleRemove = useCallback((val: V) => {
      if (Array.isArray(value)) {
        onChange?.(value.filter(v => v !== val) as V[]);
      } else {
        onChange?.(undefined as any);
      }
      setTimeout(() => inputRef.current?.focus(), 0);
    }, [value, onChange]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !searchQuery && selectedOptions.length > 0) {
        handleRemove(selectedOptions[selectedOptions.length - 1].value);
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
        setActiveIndex(p => Math.min(p + 1, mergedOptions.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(p => Math.max(p - 1, 0));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        handleSelect(mergedOptions[activeIndex]);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    return (
      <div className="w-full">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <InputWithIcon
              ref={(node) => {
                  inputRef.current = node!;
                  if (typeof ref === "function") ref(node!);
                  else if (ref && "current" in ref) (ref as any).current = node;
              }}
              placeholder={selectedOptions.length === 0 ? placeholder : ""}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              size={size}
              error={error}
              disabled={disabled}
              required={required}
              className={className}
              autoComplete="off"
              style={{ paddingLeft: leftOffset > 0 ? `${leftOffset}px` : undefined }}
              leftSection={
                <div onClick={() => inputRef.current?.focus()} className="flex items-center pointer-events-none pr-2">
                  {Icon && <Icon className={cn("h-4 w-4 mr-2 shrink-0 transition-colors", isOpen ? "text-primary-500" : "text-slate-400")} />}
                  {selectedOptions.length > 0 && (
                    <div ref={chipsRef} className="flex flex-wrap gap-1.5 items-center">
                      {selectedOptions.map(opt => (
                        <div 
                          key={String(opt.value)} 
                          className="inline-flex items-center gap-1.5 bg-slate-900 text-white h-7 px-2.5 rounded-full text-[10px] font-bold animate-reveal pointer-events-auto"
                        >
                          <span className="truncate max-w-[120px]">{opt.label}</span>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); handleRemove(opt.value); }}
                            className="hover:text-red-400 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              }
              rightSection={
                <div className="flex items-center gap-2 pr-1">
                  {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin text-primary-500" />}
                  <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform duration-300", isOpen && "rotate-180")} />
                </div>
              }
            />
          </PopoverTrigger>

          <PopoverContent 
            className="w-(--radix-popover-trigger-width) p-1.5 rounded-2xl shadow-xl z-50 border-slate-200 animate-reveal" 
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div ref={listRef} className="max-h-[300px] overflow-y-auto no-scrollbar py-0.5">
              {isLoading && (
                <div className="flex items-center justify-center py-8 gap-2 text-slate-400">
                  <Loader2 className="h-4 w-4 animate-spin text-primary-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Searching...</span>
                </div>
              )}

              {!isLoading && mergedOptions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-8 gap-1.5 text-slate-400 opacity-60">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-[10px] font-bold italic tracking-tight">No results found</span>
                </div>
              )}

              {!isLoading && mergedOptions.map((opt, idx) => (
                <div
                  key={String(opt.value)}
                  onClick={() => handleSelect(opt)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all",
                    "hover:bg-primary-50 hover:text-primary-700 outline-none mb-0.5 last:mb-0",
                    isOptionSelected(opt.value) ? "bg-primary-50 text-primary-700 font-bold" : "text-slate-600 font-medium",
                    activeIndex === idx && "bg-slate-50 text-slate-900 shadow-sm"
                  )}
                >
                  <div className="flex-1 truncate">
                    {renderOption ? renderOption(opt) : <span className="text-sm truncate">{opt.label}</span>}
                  </div>
                  {isOptionSelected(opt.value) && (
                    <Check className="h-3.5 w-3.5 shrink-0 ml-2" />
                  )}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
) as (<V extends string | number = string | number, M = Record<string, string | number | boolean | null>>(
  props: SmartSelectProps<V, M> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement) & { displayName?: string };

SmartSelect.displayName = "SmartSelect";

export default SmartSelect;
