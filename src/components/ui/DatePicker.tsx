import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Calendar } from "@/components/ui/Calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"

interface DatePickerProps {
  date?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({ 
  date, 
  onChange, 
  placeholder = "Pick a date",
  className 
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          noScale
          className={cn(
            "h-11 w-full justify-between text-left font-medium rounded-xl border-slate-200 bg-white px-4 transition-all focus:border-primary-400 focus:ring-0",
            !date && "text-slate-400",
            open && "border-primary-400 ring-0",
            className
          )}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <CalendarIcon className={cn(
              "h-4 w-4 shrink-0 transition-colors",
              open ? "text-primary-500" : "text-slate-400"
            )} />
            <span className="truncate">
              {date ? format(date, "PPP") : placeholder}
            </span>
          </div>
          <ChevronDown className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            open ? "text-primary-500 rotate-180" : "text-slate-400"
          )} />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0 rounded-2xl border border-slate-200 bg-white shadow-xl animate-in fade-in-0 zoom-in-95 data-[side=bottom]:translate-y-1" 
        align="start"
        sideOffset={4}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            onChange?.(d);
            setOpen(false);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
