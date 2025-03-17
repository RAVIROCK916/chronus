"use client";

import {
  DateInput,
  TimeField as TimeFieldRac,
} from "@/components/ui/datefield-rac";
import { ClockIcon } from "lucide-react";
import { Label } from "react-aria-components";

export default function TimeField() {
  return (
    <TimeFieldRac className="*:not-first:mt-2">
      <div className="relative">
        <DateInput />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 flex items-center justify-center pe-3 text-muted-foreground/80">
          <ClockIcon size={16} aria-hidden="true" />
        </div>
      </div>
    </TimeFieldRac>
  );
}
