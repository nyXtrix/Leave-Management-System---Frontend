import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, useNavigation } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      disabled={{before : new Date()}}
      className={cn("p-4", className)}
      classNames={  {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center items-center h-10 mb-4 relative",
        caption_label: "text-sm font-black text-slate-900 tracking-tight mx-auto",
        nav: "flex items-center justify-between absolute inset-x-0 top-0 h-full pointer-events-none",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-white p-0 opacity-100 hover:opacity-100 rounded-xl transition-all border-slate-200 pointer-events-auto",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-white p-0 opacity-100 hover:opacity-100 rounded-xl transition-all border-slate-200 pointer-events-auto",
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-secondary-500 rounded-md w-9 font-bold text-[10px] uppercase tracking-widest text-center",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal rounded-lg",
          "hover:bg-primary-50 hover:text-primary-600",
          "aria-selected:bg-primary-500 aria-selected:!text-white aria-selected:font-bold aria-selected:shadow-glow-primary"
        ),
        selected: "bg-primary-500 [&>button]:text-white hover:[&>button]:text-white rounded-lg",
        today: "bg-secondary-200 rounded-lg text-secondary-900 font-extrabold",
        outside: "text-slate-300 opacity-50",
        disabled: "text-slate-300 opacity-50 cursor-not-allowed",
        range_middle:
          "aria-selected:bg-primary-50 aria-selected:text-primary-900",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight;
          return <Icon className="h-4 w-4" />;
        },
        CaptionLabel: ({ children }) => (
          <div className="flex items-center justify-center gap-4 w-full">
            <CustomNav orientation="left" />
            <span className="text-sm font-black text-slate-900 tracking-tight whitespace-nowrap">
              {children}
            </span>
            <CustomNav orientation="right" />
          </div>
        ),
        Nav: () => <></>, 
      }}
      {...props}
    />
  );
}

const CustomNav = ({ orientation }: { orientation: 'left' | 'right' }) => {
  const { previousMonth, nextMonth, goToMonth } = useNavigation();
  const Icon = orientation === 'left' ? ChevronLeft : ChevronRight;
  const targetMonth = orientation === 'left' ? previousMonth : nextMonth;

  return (
    <button
      onClick={() => targetMonth && goToMonth(targetMonth)}
      disabled={!targetMonth}
      className={cn(
        buttonVariants({ variant: "outline" }),
        "h-8 w-8 bg-white p-0 opacity-100 hover:opacity-100 rounded-lg transition-all border-slate-200 disabled:opacity-20 disabled:cursor-not-allowed"
      )}
      type="button"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
};

Calendar.displayName = "Calendar";

export { Calendar };
