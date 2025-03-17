"use client";

import { Calendar } from "@/components/ui/calendar-rac";
import { DateInput } from "@/components/ui/datefield-rac";
import { CalendarIcon } from "lucide-react";
import {
  Button,
  DatePicker as DatePickerRac,
  Dialog,
  Group,
  Label,
  Popover,
} from "react-aria-components";

export default function DatePicker() {
  return (
    <DatePickerRac className="*:not-first:mt-2">
      {/* <Label className="text-sm font-medium text-foreground">Date picker</Label> */}
      <div className="flex">
        <Group className="w-full">
          <DateInput className="pe-9" />
        </Group>
        <Button className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground data-[focus-visible]:border-ring data-[focus-visible]:ring-[3px] data-[focus-visible]:ring-ring/50">
          <CalendarIcon size={16} />
        </Button>
      </div>
      <Popover
        className="outline-hidden z-50 rounded-lg border border-border bg-background text-popover-foreground shadow-lg data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2"
        offset={4}
      >
        <Dialog className="max-h-[inherit] overflow-auto p-2">
          <Calendar />
        </Dialog>
      </Popover>
    </DatePickerRac>
  );
}
