"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  children?: React.ReactNode;
  value?: string;
  onChange?: (date: Date) => void;
};

export default function DatePicker({
  value,
  onChange,
  children,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(value ? new Date(Number(value)) : undefined);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children || (
          <Button
            variant={"outline"}
            className={cn(
              "w-72 justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "MMM do, yyyy") : <span>Pick a date</span>}
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            if (date) {
              onChange?.(date);
              setOpen(false);
              setDate(date);
            }
          }}
          defaultMonth={date}
          showOutsideDays={false}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
